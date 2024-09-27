package repository

import (
	"net/http"

	"github.com/arthurbrit0/crud-golang-react/database/migrations"
	"github.com/gofiber/fiber/v2"

	// "github.com/arthurbrit0/crud-golang-react/database/models"
	"github.com/morkid/paginate"
	// "gopkg.in/go-playground/validator.v9"
)

func (r *Repository) GetUsers(context *fiber.Ctx) error {
	db := r.DB
	model := db.Model(&migrations.Users{})

	pg := paginate.New(&paginate.Config{
		DefaultSize:        20,
		CustomParamEnabled: true,
	})

	page := pg.With(model).Request(context.Request()).Response(&[]migrations.Users{})

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"data": page,
	})

	return nil
}
