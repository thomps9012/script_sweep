package tests

import (
	"encoding/json"
	"regexp"
	"testing"

	m "script_sweep_go/models"

	"github.com/stretchr/testify/assert"
)

type Mocked_Res struct {
	Body       string
	StatusCode int
}

func mockAPIKey(input string) (Mocked_Res, error) {
	existing_users := make([]string, 1)
	user_input := new(m.SignUp)
	existing_users[0] = "test2@test.com"
	err := json.Unmarshal([]byte(input), &user_input)
	if err != nil {
		return Mocked_Res{
			Body:       `{"code":422,"data":"Unprocessable Entity","message":"Error Marshalling the Request Body","status":"UNPROCESSABLE CONTENT"}`,
			StatusCode: 422,
		}, nil
	}
	valid_email, _ := regexp.MatchString(`\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b`, user_input.Email)
	if !valid_email {
		return Mocked_Res{
			Body:       `{"code":400,"data":"https://thomps9012.github.io/script_sweep/docs/errors","message":"Please Include a Valid Email Address","status":"BAD REQUEST"}`,
			StatusCode: 400,
		}, nil
	}
	for _, email := range existing_users {
		if email == user_input.Email {
			return Mocked_Res{
				Body:       `{"code": 409,"data": "https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message": "There's Already an API Key Associated with this Email Address","status": "CONFLICT"}`,
				StatusCode: 409,
			}, nil
		}
	}

	return Mocked_Res{
		Body:       `{"code": 201,"data": "HB7ZToX.TBEIABTLjflaskdjfj23","message": "Please save this API key somewhere secure, as it will NOT be shown again","status": "KEY CREATED"}`,
		StatusCode: 201,
	}, nil
}

func TestAPIKeyGen(t *testing.T) {
	auth := "/api/auth"
	test_email := "test@test.com"
	test_email_fail := "test2@test.com"
	tests := []struct {
		description   string
		route         string
		method        string
		body          string
		expectedError bool
		mocked        bool
		expectedCode  int
		expectedBody  string
	}{
		{
			description:   "unprotected route",
			method:        "POST",
			route:         auth + "/api_key",
			body:          `nil`,
			expectedError: false,
			mocked:        true,
			expectedCode:  422,
			expectedBody:  `{"code":422,"data":"Unprocessable Entity","message":"Error Marshalling the Request Body","status":"UNPROCESSABLE CONTENT"}`,
		},
		{
			description:   "missing email",
			method:        "POST",
			route:         auth + "/api_key",
			body:          `{"first_name":"Test","last_name":"Test"}`,
			expectedError: false,
			mocked:        true,
			expectedCode:  400,
			expectedBody:  `{"code":400,"data":"https://thomps9012.github.io/script_sweep/docs/errors","message":"Please Include a Valid Email Address","status":"BAD REQUEST"}`,
		},
		{
			description:   "pass",
			method:        "POST",
			route:         auth + "/api_key",
			body:          `{"email":"` + test_email + `","first_name":"Test","last_name":"Test"}`,
			expectedError: false,
			mocked:        true,
			expectedCode:  201,
			expectedBody:  `{"code": 201,"data": "HB7ZToX.TBEIABTLjflaskdjfj23","message": "Please save this API key somewhere secure, as it will NOT be shown again","status": "KEY CREATED"}`,
		},
		{
			description:   "duplicate route",
			method:        "POST",
			route:         auth + "/api_key",
			body:          `{"email":"` + test_email_fail + `","first_name":"Test","last_name":"Test"}`,
			expectedError: false,
			mocked:        true,
			expectedCode:  409,
			expectedBody:  `{"code": 409,"data": "https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message": "There's Already an API Key Associated with this Email Address","status": "CONFLICT"}`,
		},
	}

	for _, test := range tests {
		res, _ := mockAPIKey(test.body)
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)
		body := res.Body
		assert.Equalf(t, test.expectedBody, string(body), test.description)
	}
}
