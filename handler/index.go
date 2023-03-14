package handler

import (
	r "script_sweep_go/responses"

	"github.com/gofiber/fiber/v2"
)

func Index(c *fiber.Ctx) error {
	return c.Status(200).JSON(r.IndexResponse())
}
