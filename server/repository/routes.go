package repository

import "github.com/gofiber/fiber/v2"

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/users", r.GetUsers)
	api.Post("/users", r.CreateUser)
	api.Patch("/users/:id", r.UpdateUser)
	api.Delete("/users/:id", r.DeleteUser)
	api.Get("/users/:id", r.GetUserById)
}
