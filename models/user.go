package models

import (
	crypto "crypto/rand"
	"encoding/base64"
	"script_sweep_go/config"
	"script_sweep_go/database"
	"strconv"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type SignUp struct {
	Email      string `json:"email"`
	First_Name string `json:"first_name"`
	Last_Name  string `json:"last_name"`
}

type APIKey struct {
	Email      string `json:"email"`
	First_Name string `json:"first_name"`
	Last_Name  string `json:"last_name"`
	API_Key    string `json:"api_key"`
	Salt       string `json:"salt"`
	Pepper     string `json:"pepper"`
}

type KeyUser struct {
	Email      string `json:"email"`
	First_Name string `json:"first_name"`
	Last_Name  string `json:"last_name"`
}

type KeyLimit struct {
	Email    string
	Requests int
}

type KeyExchange struct {
	Email   string `json:"email"`
	API_Key string `json:"api_key"`
}

func GenerateAPIKey(user SignUp) (string, error) {
	rand_bytes := make([]byte, 256)
	_, err := crypto.Read(rand_bytes)
	if err != nil {
		panic(err)
	}
	db := database.DB
	base_key := base64.StdEncoding.EncodeToString(rand_bytes)
	api_key := base_key[0:7] + "." + base_key[8:35]
	salt_rounds, _ := strconv.Atoi(config.Config("SALT_ROUNDS"))
	key_hash, err := bcrypt.GenerateFromPassword([]byte(api_key), salt_rounds)
	if err != nil {
		panic(err)
	}
	base_salt := base64.StdEncoding.EncodeToString(rand_bytes)
	salt := base_salt[0:14] + "." + base_salt[15:43]
	db_key := new(APIKey)
	db_key.Email = strings.ToLower(strings.TrimSpace(user.Email))
	db_key.First_Name = user.First_Name
	db_key.Last_Name = user.Last_Name
	db_key.API_Key = string(key_hash)
	db_key.Salt = salt
	db_key.Pepper = salt
	db.Table("keys").Create(&db_key)
	return api_key, nil
}
