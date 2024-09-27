package repository

import "github.com/gofiber/fiber/v2"

func (repo *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/users", repo.GetUsers)
}
