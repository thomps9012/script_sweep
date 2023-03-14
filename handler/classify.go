package handler

import (
	m "script_sweep_go/models"
	r "script_sweep_go/responses"

	"github.com/gofiber/fiber/v2"
)

func ClassifyText(c *fiber.Ctx) error {
	text := new(m.Text_Input)
	classify_header := new(m.ClassifyByHeader)
	err := c.ReqHeaderParser(classify_header)
	if err != nil {
		return c.Status(400).JSON(r.BadRequestHeader(err))
	}
	classify_by := classify_header.Classify_By
	if classify_by != "word" {
		classify_by = "character"
	}
	body_err := c.BodyParser(text)
	if body_err != nil {
		return c.Status(422).JSON(r.BadRequestBody(err))
	}
	ct := make(chan []m.Classified_Text)
	go m.ClassifyText(text.Text, classify_by, ct)
	response := <-ct
	return c.Status(200).JSON(r.ClassifyTextRes(response, classify_by))
}
