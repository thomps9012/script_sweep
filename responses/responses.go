package responses

import (
	m "script_sweep_go/models"

	"github.com/gofiber/fiber/v2"
)

func IndexResponse() fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "Thank you for visiting the script_sweep API, please read the documentation to learn more",
		"data":    docs,
	}
}

func CreateKey(api_key string) fiber.Map {
	return fiber.Map{
		"status":  "KEY CREATED",
		"code":    201,
		"message": "Please save this API key somewhere secure, as it will NOT be shown again",
		"data":    api_key,
	}
}

func JWTExchange(token string) fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "Here is a secure JSON Web Token to make authorized requests to protected API endpoints",
		"data":    token,
	}
}

func AllScriptsRes(scripts []map[string]interface{}) fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "All of the scripts found based on your filters",
		"data":    scripts,
	}
}

func SingleScriptRes(script []map[string]interface{}, id string) fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "Information on script with id: " + id,
		"data":    script,
	}
}

func OrganizeTextRes(organized_text []m.Organized_Text) fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "Here is your input text organized by script",
		"data":    organized_text,
	}
}
func FilterTextRes(filtered_text m.Filtered_Response) fiber.Map {
	return fiber.Map{
		"status":  "OK",
		"code":    200,
		"message": "Here is your input text filtered by your specified script",
		"data":    filtered_text,
	}
}

func ClassifyTextRes(classified_text []m.Classified_Text, classified_by string) fiber.Map {
	return fiber.Map{
		"status":        "OK",
		"code":          200,
		"message":       "Here is your input text classified by script and " + classified_by,
		"classified_by": classified_by,
		"data":          classified_text,
	}
}
