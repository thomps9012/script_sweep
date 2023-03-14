package handler

import (
	"regexp"
	"script_sweep_go/config"
	"script_sweep_go/database"
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func JWT(c *fiber.Ctx) error {
	db := database.DB
	user_info := new(m.KeyExchange)
	key_info := new(m.APIKey)
	err := c.BodyParser(user_info)
	if err != nil {
		return c.Status(422).JSON(r.BadRequestBody(err))
	}
	valid_email, _ := regexp.MatchString(`\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b`, user_info.Email)
	if !valid_email {
		return c.Status(400).JSON(r.BadEmail())
	}
	db.Table("keys").Find(&key_info, "email = ?", user_info.Email)
	if key_info.Email == "" {
		return c.Status(401).JSON(r.KeyNotFound())
	}
	check_err := bcrypt.CompareHashAndPassword([]byte(key_info.API_Key), []byte(user_info.API_Key))
	if check_err != nil {
		return c.Status(401).JSON(r.KeyNotFound())
	}
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user"] = user_info.Email
	claims["exp"] = time.Now().Add(time.Hour * 12).Unix()
	claims["aud"] = user_info.Email
	claims["issuer"] = config.Config("JWT_ISS")
	jwt, err := token.SignedString([]byte(config.Config("JWT_SECRET")))
	if err != nil {
		return c.Status(500).JSON(r.ServerError())
	}
	return c.Status(200).JSON(r.JWTExchange(jwt))
}
