package responses

import "github.com/gofiber/fiber/v2"

var docs = "https://thomps9012.github.io/script_sweep/docs"

func BadRequestBody(err error) fiber.Map {
	return fiber.Map{
		"status":  "UNPROCESSABLE CONTENT",
		"code":    422,
		"message": "Error Marshalling the Request Body",
		"data":    err.Error(),
	}
}

func BadRequestHeader(err error) fiber.Map {
	return fiber.Map{
		"status":  "BAD REQUEST",
		"code":    400,
		"message": "Error Marshalling the Request Headers",
		"data":    err,
	}
}

func BadRequestFields(err error) fiber.Map {
	return fiber.Map{
		"status":  "SERVICE UNAVAILABLE",
		"code":    503,
		"message": "Error Filtering Response",
		"data":    err,
	}
}

func BadEmail() fiber.Map {
	return fiber.Map{
		"status":  "BAD REQUEST",
		"code":    400,
		"message": "Please Include a Valid Email Address",
		"data":    docs + "/errors",
	}
}

func DuplicateKey() fiber.Map {
	return fiber.Map{
		"status":  "CONFLICT",
		"code":    409,
		"message": "There's Already an API Key Associated with this Email Address",
		"data":    docs + "/endpoints/auth",
	}
}

func ServerError() fiber.Map {
	return fiber.Map{
		"status":  "SERVICE UNAVAILABLE",
		"code":    503,
		"message": "Our servers are currently experiencing an issue, please try again later.",
		"data":    docs + `/errors`,
	}
}

func BadJWT() fiber.Map {
	return fiber.Map{
		"status":  "UNAUTHORIZED",
		"code":    401,
		"message": "Missing or incorrect JSON Web Token",
		"data":    docs + "/endpoints/auth",
	}
}

func KeyNotFound() fiber.Map {
	return fiber.Map{
		"status":  "UNAUTHORIZED",
		"code":    401,
		"message": "You're attempting to access the resource using an incorrect email, expired or invalid API key, please check your credentials, or request a new API key at the redirect.",
		"data":    docs + `/endpoints/auth`,
	}
}

func IDNotFound() fiber.Map {
	return fiber.Map{
		"status":  "NOT FOUND",
		"code":    404,
		"message": "No script with that id was found",
		"data":    docs + "/endpoints/scripts",
	}
}

func ScriptNotFound() fiber.Map {
	return fiber.Map{
		"status":  "NOT FOUND",
		"code":    404,
		"message": "We couldn't match this text to any known scripts in our database, please check the available scripts",
		"data":    docs + "/endpoints/scripts",
	}
}

func ClassifyRedirect() fiber.Map {
	return fiber.Map{
		"status":  "SEE OTHER",
		"code":    303,
		"message": "It appears that you're attempting to organize one word. Please visit the classification endpoint instead to learn more about your text",
		"data":    docs + "/endpoints/classify",
	}
}

func RateLimit() fiber.Map {
	return fiber.Map{
		"status":  "TOO MANY REQUESTS",
		"code":    429,
		"message": "You've hit the daily limit for API calls associated with this API key, please wait until tomorrow to make further requests",
		"data":    docs + "/errors",
	}
}

func TooManyFilters() fiber.Map {
	return fiber.Map{
		"status":  "NOT FOUND",
		"code":    404,
		"message": "We couldn't find any scripts that match the parameters and filters that you've set. Please broaden your search horizons to view results",
		"data":    docs + "/endpoints/scripts",
	}
}
