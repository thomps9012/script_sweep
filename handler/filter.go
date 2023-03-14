package handler

import (
	m "script_sweep_go/models"
	r "script_sweep_go/responses"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func FilterText(c *fiber.Ctx) error {
	input := new(m.Filter_Input)
	err := c.BodyParser(input)
	if err != nil {
		return c.Status(422).JSON(r.BadRequestBody(err))
	}
	if input.Script_ID <= 0 || input.Script_ID > 140 {
		return c.Status(404).JSON(r.IDNotFound())
	}
	word_array := strings.Split(input.Text, " ")
	if len(word_array) == 1 {
		return c.Status(303).JSON(r.ClassifyRedirect())
	}
	fc := make(chan m.Filtered_Response)
	go m.FilterTextByScript(fc, *input)
	response := <-fc
	return c.Status(200).JSON(r.FilterTextRes(response))
}
