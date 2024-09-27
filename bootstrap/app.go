package bootstrap

import (
	"log"
	"os"

	"github.com/arthurbrit0/crud-golang-react/database/migrations"
	"github.com/arthurbrit0/crud-golang-react/database/storage"
	"github.com/arthurbrit0/crud-golang-react/repository"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func InitializeApp(app *fiber.App) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASSWORD"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DB_Name:  os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)

	if err != nil {
		log.Fatal("Banco de dados não pode ser carregado.")
	}

	err = migrations.MigrateUser(db)

	if err != nil {
		log.Fatal("Banco de dados não pode ser migrado.")
	}

	repo := repository.Repository{
		DB: db,
	}

	app.Use(cors.New(cors.Config{AllowCredentials: true}))
	repo.SetupRoutes(app)
	app.Listen(":8081")
}
