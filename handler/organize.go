package handler

import (
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func OrganizeText(c *fiber.Ctx) error {
	text := new(m.Text_Input)
	err := c.BodyParser(text)
	if err != nil {
		return c.Status(422).JSON(r.BadRequestBody(err))
	}
	word_array := strings.Split(text.Text, " ")
	if len(word_array) == 1 {
		return c.Status(303).JSON(r.ClassifyRedirect())
	}
	tc := make(chan []m.Organized_Text)
	go m.OrganizeText(word_array, tc)
	response := <-tc
	return c.Status(200).JSON(r.OrganizeTextRes(response))
}
