package middleware

import (
	"script_sweep_go/config"
	"script_sweep_go/database"
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func RateCount(c *fiber.Ctx) error {
	user_email := c.Get("email")
	jwt_secret := []byte(config.Config("JWT_SECRET"))
	token_string := strings.TrimSpace(strings.Split(c.Get("Authorization"), "Bearer ")[1])
	token, err := jwt.Parse(token_string, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			c.Status(fiber.StatusBadRequest)
			return nil, c.JSON(r.BadJWT())
		}
		return jwt_secret, nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		token_email := claims["user"].(string)
		if strings.TrimSpace(token_email) != strings.TrimSpace(user_email) {
			return c.Status(401).JSON(r.KeyNotFound())
		}
	} else {
		return c.Status(401).JSON(err)
	}

	db := database.DB
	user_requests := new(m.KeyLimit)
	db.Table("keys").Where("email = ?", user_email).Find(&user_requests)
	if user_requests.Email == "" {
		return c.Status(401).JSON(r.KeyNotFound())
	}
	if user_requests.Requests >= 200 {
		return c.Status(429).JSON(r.RateLimit())
	}
	new_count := user_requests.Requests + 1
	db.Table("keys").Where("email = ?", user_email).Update("requests", new_count)
	return c.Next()
}
