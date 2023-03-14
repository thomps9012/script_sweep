package tests

import (
	"io"
	"net/http"
	"script_sweep_go/config"
	"script_sweep_go/router"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTextFilterEndpoint(t *testing.T) {
	api := "/api"
	filter := api + "/filter"

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
			description:   "passing test",
			route:         filter,
			method:        "POST",
			body:          `{"text": "hello goodbye в 英国的 اقثقنح this is a test", "script_id": 61}`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":{"script":"Latin","filtered_text":["hello","goodbye","this","is","a","test"],"word_percent":67,"character_percent":70},"message":"Here is your input text filtered by your specified script","status":"OK"}`,
		},
		{
			description:   "failing test",
			route:         filter,
			method:        "POST",
			body:          `{"text": "hello goodbye в 英国的 اقثقنح this is a test", "script_id": 6661}`,
			expectedError: false,
			expectedCode:  404,
			expectedBody:  `{"code":404,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/scripts","message":"No script with that id was found","status":"NOT FOUND"}`,
		},
		{
			description:   "no text found",
			route:         filter,
			method:        "POST",
			body:          `{"text": "в 英国的 اقثقنح", "script_id": 61}`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":{"script":"Latin","filtered_text":null,"word_percent":0,"character_percent":0},"message":"Here is your input text filtered by your specified script","status":"OK"}`,
		},
	}

	app := router.SetupForTests()

	for _, test := range tests {
		req, _ := http.NewRequest(
			test.method,
			test.route,
			strings.NewReader(test.body),
		)
		test_jwt := config.Config("TEST_AUTH_JWT")
		test_email := config.Config("TEST_AUTH_EMAIL")
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+test_jwt)
		req.Header.Set("email", test_email)
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
