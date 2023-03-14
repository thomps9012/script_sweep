package main

import (
	"log"
	"script_sweep_go/config"
	"script_sweep_go/database"
	"script_sweep_go/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
)

func main() {
	app := Setup()
	log.Fatal(app.Listen(":" + config.Config("PORT")))
}

func Setup() *fiber.App {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(limiter.New())
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	database.Connect()
	router.Initialize(app)
	return app
}
