package router

import (
	"script_sweep_go/database"
	"script_sweep_go/handler"
	"script_sweep_go/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func Initialize(app *fiber.App) {
	app.Get("/", handler.Index)

	api := app.Group("/api", logger.New())
	api.Get("/", handler.Index)

	auth := api.Group("/auth")
	auth.Post("/api_key", handler.APIKey)
	auth.Post("/jwt", handler.JWT)

	scripts := api.Group("/scripts")
	scripts.Get("/", middleware.Protected(), middleware.RateCount, handler.AllScripts)
	scripts.Get("/:id", middleware.Protected(), middleware.RateCount, handler.ScriptByID)

	api.Post("/classify", middleware.Protected(), middleware.RateCount, handler.ClassifyText)
	api.Post("/organize", middleware.Protected(), middleware.RateCount, handler.OrganizeText)
	api.Post("/filter", middleware.Protected(), middleware.RateCount, handler.FilterText)
}

func SetupForTests() *fiber.App {
	err := godotenv.Load("../.env")
	if err != nil {
		panic("Error loading .env file")
	}
	app := fiber.New()
	app.Use(cors.New())
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	database.Connect()
	Initialize(app)
	return app
}

func SetupForLimitTests() *fiber.App {
	err := godotenv.Load("../.env")
	if err != nil {
		panic("Error loading .env file")
	}
	app := fiber.New()
	app.Use(limiter.New())
	database.Connect()
	Initialize(app)
	return app
}
