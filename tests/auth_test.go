package tests

import (
	"io"
	"net/http"
	"script_sweep_go/router"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestJWTAuth(t *testing.T) {
	api := "/api"
	auth := api + "/auth"
	scripts := api + "/scripts"
	tests := []struct {
		description   string
		route         string
		method        string
		body          string
		expectedError bool
		expectedCode  int
		expectedBody  string
	}{
		{
			description:   "unprotected route",
			route:         "/",
			method:        "GET",
			body:          `nil`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":"https://thomps9012.github.io/script_sweep/docs","message":"Thank you for visiting the script_sweep API, please read the documentation to learn more","status":"OK"}`,
		},
		{
			description:   "unprotected route",
			route:         api,
			method:        "GET",
			body:          `nil`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":"https://thomps9012.github.io/script_sweep/docs","message":"Thank you for visiting the script_sweep API, please read the documentation to learn more","status":"OK"}`,
		},
		{
			description:   "unprotected route",
			method:        "POST",
			route:         auth + "/api_key",
			body:          `nil`,
			expectedError: false,
			expectedCode:  422,
			expectedBody:  `{"code":422,"data":"Unprocessable Entity","message":"Error Marshalling the Request Body","status":"UNPROCESSABLE CONTENT"}`,
		},
		{
			description:   "unprotected route",
			method:        "POST",
			route:         auth + "/jwt",
			body:          `nil`,
			expectedError: false,
			expectedCode:  422,
			expectedBody:  `{"code":422,"data":"Unprocessable Entity","message":"Error Marshalling the Request Body","status":"UNPROCESSABLE CONTENT"}`,
		},
		{
			description:   "protected route",
			route:         scripts,
			method:        "GET",
			body:          `nil`,
			expectedError: false,
			expectedCode:  401,
			expectedBody:  `{"code":401,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message":"Missing or incorrect JSON Web Token","status":"UNAUTHORIZED"}`,
		},
		{
			description:   "protected route",
			route:         scripts + "/1",
			method:        "GET",
			body:          `nil`,
			expectedError: false,
			expectedCode:  401,
			expectedBody:  `{"code":401,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message":"Missing or incorrect JSON Web Token","status":"UNAUTHORIZED"}`,
		},
		{
			description:   "protected route",
			route:         api + "/classify",
			method:        "POST",
			body:          `nil`,
			expectedError: false,
			expectedCode:  401,
			expectedBody:  `{"code":401,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message":"Missing or incorrect JSON Web Token","status":"UNAUTHORIZED"}`,
		},
		{
			description:   "protected route",
			route:         api + "/organize",
			method:        "POST",
			body:          `nil`,
			expectedError: false,
			expectedCode:  401,
			expectedBody:  `{"code":401,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message":"Missing or incorrect JSON Web Token","status":"UNAUTHORIZED"}`,
		},
		{
			description:   "protected route",
			route:         api + "/filter",
			method:        "POST",
			body:          `nil`,
			expectedError: false,
			expectedCode:  401,
			expectedBody:  `{"code":401,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/auth","message":"Missing or incorrect JSON Web Token","status":"UNAUTHORIZED"}`,
		},
	}

	app := router.SetupForTests()

	for _, test := range tests {
		req, _ := http.NewRequest(
			test.method,
			test.route,
			strings.NewReader(test.body),
		)
		req.Header.Set("Content-Type", "application/json")
		res, err := app.Test(req, -1)
		assert.Equalf(t, test.expectedError, err != nil, test.description)
		if test.expectedError {
			continue
		}
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)
		body, err := io.ReadAll(res.Body)
		assert.Nilf(t, err, test.description)
		assert.Equalf(t, test.expectedBody, string(body), test.description)
	}
}
