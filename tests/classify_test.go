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

func TestClassifyEndpoint(t *testing.T) {
	api := "/api"
	classify := api + "/classify"
	tests := []struct {
		description      string
		route            string
		method           string
		body             string
		expectedError    bool
		expectedCode     int
		expectedBody     string
		expectedCharBody string
	}{
		{
			description:      "differing results",
			route:            classify,
			method:           "POST",
			body:             `{"text": "英国的狗说'woof', 俄罗斯的狗说'тяв'"}`,
			expectedError:    false,
			expectedCode:     200,
			expectedBody:     `{"classified_by":"word","code":200,"data":[{"script":"Han","percent":100}],"message":"Here is your input text classified by script and word","status":"OK"}`,
			expectedCharBody: `{"classified_by":"character","code":200,"data":[{"script":"Han","percent":46},{"script":"unknown","percent":25},{"script":"Latin","percent":17},{"script":"Cyrillic","percent":13}],"message":"Here is your input text classified by script and character","status":"OK"}`,
		},
		{
			description:      "one language",
			route:            classify,
			method:           "POST",
			body:             `{"text": "this is a test"}`,
			expectedError:    false,
			expectedCode:     200,
			expectedBody:     `{"classified_by":"word","code":200,"data":[{"script":"Latin","percent":75},{"script":"unknown","percent":25}],"message":"Here is your input text classified by script and word","status":"OK"}`,
			expectedCharBody: `{"classified_by":"character","code":200,"data":[{"script":"Latin","percent":71},{"script":"unknown","percent":29}],"message":"Here is your input text classified by script and character","status":"OK"}`,
		},
		{
			description:      "differing results dos",
			route:            classify,
			method:           "POST",
			body:             `{"text": "hello goodbye в 英国的 اقثقنح"}`,
			expectedError:    false,
			expectedCode:     200,
			expectedBody:     `{"classified_by":"word","code":200,"data":[{"script":"Latin","percent":40},{"script":"Cyrillic","percent":20},{"script":"Han","percent":20},{"script":"Arabic","percent":20}],"message":"Here is your input text classified by script and word","status":"OK"}`,
			expectedCharBody: `{"classified_by":"character","code":200,"data":[{"script":"Latin","percent":46},{"script":"unknown","percent":15},{"script":"Cyrillic","percent":4},{"script":"Han","percent":12},{"script":"Arabic","percent":23}],"message":"Here is your input text classified by script and character","status":"OK"}`,
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
		req.Header.Set("classify_by", "word")
		res, err := app.Test(req, -1)
		assert.Equalf(t, test.expectedError, err != nil, test.description)
		if test.expectedError {
			continue
		}
		assert.Equalf(t, test.expectedCode, res.StatusCode, test.description)
		body, err := io.ReadAll(res.Body)
		assert.Nilf(t, err, test.description)
		assert.Equalf(t, test.expectedBody, string(body), test.description)

		char_req, _ := http.NewRequest(
			test.method,
			test.route,
			strings.NewReader(test.body),
		)
		char_req.Header.Set("Content-Type", "application/json")
		char_req.Header.Set("Authorization", "Bearer "+test_jwt)
		char_req.Header.Set("email", test_email)
		char_res, err := app.Test(char_req, -1)
		assert.Equalf(t, test.expectedError, err != nil, test.description)
		if test.expectedError {
			continue
		}
		assert.Equalf(t, test.expectedCode, char_res.StatusCode, test.description)
		char_body, err := io.ReadAll(char_res.Body)
		assert.Nilf(t, err, test.description)
		assert.Equalf(t, test.expectedCharBody, string(char_body), test.description)
	}
}
