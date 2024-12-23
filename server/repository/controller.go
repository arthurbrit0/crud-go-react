package repository

import (
	"net/http"

	"github.com/arthurbrit0/crud-golang-react/database/migrations"
	"github.com/gofiber/fiber/v2"

	"github.com/arthurbrit0/crud-golang-react/database/models"
	"github.com/morkid/paginate"
	"gopkg.in/go-playground/validator.v9"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

func ValidateStruct(user models.User) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(user)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	return errors
}

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

func (r *Repository) CreateUser(context *fiber.Ctx) error {
	user := models.User{}

	err := context.BodyParser(&user)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Requisição falhou"})

		return err
	}

	errors := ValidateStruct(user)
	if errors != nil {
		return context.Status(http.StatusBadRequest).JSON(errors)
	}

	if err := r.DB.Create(&user).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status":  "erro",
			"message": "Não foi possível criar o usuário",
			"data":    err})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Usuário foi adicionado",
		"data":    user})
	return nil

}

func (r *Repository) UpdateUser(context *fiber.Ctx) error {
	user := models.User{}

	err := context.BodyParser(&user)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Requisição falhou"})

		return err
	}

	errors := ValidateStruct(user)
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := r.DB
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "ID não pode estar vazio",
		})
		return nil
	}

	if db.Model(&user).Where("id = ?", id).Updates(&user).RowsAffected == 0 {
		context.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Não foi possível atualizar o perfil do usuário",
		})
		return nil
	}

	context.Status(http.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Usuário atualizado com sucesso",
	})

	return nil
}

func (r *Repository) DeleteUser(context *fiber.Ctx) error {

	id := context.Params("id")

	if id == "" {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Você deve passar o ID para deletar um usuário",
		})
	}

	var userModel migrations.Users
	if err := r.DB.First(&userModel, id).Error; err != nil {
		return context.Status(http.StatusNotFound).JSON(&fiber.Map{
			"message": "Usuário não encontrado",
		})
	}

	if err := r.DB.Delete(&userModel).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Não foi possível deletar o usuário",
		})
	}

	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Usuário deletado com sucesso!",
	})
}

func (r *Repository) GetUserById(context *fiber.Ctx) error {
	userModel := migrations.Users{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Você deve passar o ID para buscar um usuário",
		})
		return nil
	}

	err := r.DB.Where("id = ?", id).First(&userModel).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Não foi possível achar o usuário",
		})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Usuário encontrado com sucesso!",
		"data":    userModel,
	})
	return nil
}
