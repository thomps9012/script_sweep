package middleware

import (
	"script_sweep_go/config"
	r "script_sweep_go/responses"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
)

func Protected() func(*fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		SigningKey:   []byte(config.Config("JWT_SECRET")),
		ErrorHandler: jwtError,
		ContextKey:   "script_sweep",
	})
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(401).JSON(r.BadJWT())

	} else {
		return c.Status(401).JSON(r.KeyNotFound())
	}
}
