package migrations

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	ID     uint      `gorm:"primary key; autoIncrement"`
	Nome   *string   `json:"nome"`
	Email  *string   `json:"email"`
	Data   time.Time `json:"data"`
	Cidade *string   `json:"cidade"`
	Pais   *string   `json:"pais"`
}

func MigrateUser(db *gorm.DB) error {
	err := db.AutoMigrate(&Users{})
	return err
}
