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

func TestOrganizeEndpoint(t *testing.T) {
	api := "/api"
	organize := api + "/organize"

	tests := []struct {
		description   string
		body          string
		route         string
		method        string
		expectedError bool
		expectedCode  int
		expectedBody  string
	}{
		{
			description:   "all one script",
			route:         organize,
			method:        "POST",
			body:          `{"text": "this is a test"}`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":[{"script":"Latin","words":["this","is","test"],"word_percent":75,"character_percent":91},{"script":"unknown","words":["a"],"word_percent":25,"character_percent":9}],"message":"Here is your input text organized by script","status":"OK"}`,
		},
		{
			description:   "two different scripts",
			route:         organize,
			method:        "POST",
			body:          `{"text": "英国的狗说 тяв 英国的"}`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":[{"script":"Han","words":["英国的狗说","英国的"],"word_percent":67,"character_percent":73},{"script":"Cyrillic","words":["тяв"],"word_percent":33,"character_percent":27}],"message":"Here is your input text organized by script","status":"OK"}`,
		},
		{
			description:   "failed test case",
			route:         organize,
			method:        "POST",
			body:          `{"text": "fail"}`,
			expectedError: false,
			expectedCode:  303,
			expectedBody:  `{"code":303,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/classify","message":"It appears that you're attempting to organize one word. Please visit the classification endpoint instead to learn more about your text","status":"SEE OTHER"}`,
		},
		{
			description:   "four different scripts",
			route:         organize,
			method:        "POST",
			body:          `{"text": "hello goodbye в 英国的 اقثقنح"}`,
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":[{"script":"Latin","words":["hello","goodbye"],"word_percent":40,"character_percent":55},{"script":"Cyrillic","words":["в"],"word_percent":20,"character_percent":5},{"script":"Han","words":["英国的"],"word_percent":20,"character_percent":14},{"script":"Arabic","words":["اقثقنح"],"word_percent":20,"character_percent":27}],"message":"Here is your input text organized by script","status":"OK"}`,
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
