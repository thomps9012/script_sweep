package handler

import (
	"regexp"
	"script_sweep_go/database"
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func APIKey(c *fiber.Ctx) error {
	db := database.DB
	user_info := new(m.SignUp)
	user_key := new(m.KeyUser)
	err := c.BodyParser(user_info)
	if err != nil {
		return c.Status(422).JSON(r.BadRequestBody(err))
	}
	valid_email, _ := regexp.MatchString(`\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b`, user_info.Email)
	if !valid_email {
		return c.Status(400).JSON(r.BadEmail())
	}
	standardized_email := strings.ToLower(strings.TrimSpace(user_info.Email))
	db.Table("keys").Find(&user_key, "email = ?", standardized_email)
	if user_key.Email != "" {
		return c.Status(409).JSON(r.DuplicateKey())
	}
	key, err := m.GenerateAPIKey(*user_info)
	if err != nil {
		return c.Status(500).JSON(r.ServerError())
	}
	return c.Status(201).JSON(r.CreateKey(key))
}
