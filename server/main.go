package main

import (
	"github.com/arthurbrit0/crud-golang-react/bootstrap"
	"github.com/arthurbrit0/crud-golang-react/repository"
	"github.com/gofiber/fiber/v2"
)

type Repository repository.Repository

func main() {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}
