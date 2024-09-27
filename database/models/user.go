package models

type User struct {
	Nome   string `json:"nome" validate:"required, min=3, max=40"`
	Email  string `json:"email" validate:"required ,email, min=6, max=40"`
	Data   string `json:"data" validate:"required"`
	Cidade string `json:"cidade" validate:"required, min=3, max=40"`
	Pais   string `json:"pais" validate:"required, min=3, max=40"`
}
