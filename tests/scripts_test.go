package tests

import (
	"io"
	"net/http"
	"script_sweep_go/config"
	"script_sweep_go/router"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestScriptsEndpoint(t *testing.T) {
	api := "/api"
	scripts := api + "/scripts"
	tests := []struct {
		description string
		route       string
		method      string
		headers     struct {
			fields          string
			continent       string
			limit           string
			order_by        string
			order_direction string
			living          string
			min_year        string
			max_year        string
		}
		expectedError bool
		expectedCode  int
		expectedBody  string
	}{
		{
			description: "limit to one result",
			route:       scripts,
			method:      "GET",
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				limit: "1",
			},
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":[{"continents":["AF"],"direction":"RIGHT_TO_LEFT","id":1,"link":"https://en.wikipedia.org/wiki/Fula_alphabets#Adlam_alphabet","living":true,"name":"Adlam","ranges":[[125184,125259],[125264,125274],[125278,125280]],"year":1987}],"message":"All of the scripts found based on your filters","status":"OK"}`,
		},
		{
			description:   "limit to one result descending order",
			route:         scripts,
			method:        "GET",
			expectedError: false,
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				limit:           "1",
				order_by:        "id",
				order_direction: "desc",
			},
			expectedCode: 200,
			expectedBody: `{"code":200,"data":[{"continents":["AS,NA,SA,AF,EU,AU"],"direction":"LEFT_TO_RIGHT","id":140,"link":"https://en.wikipedia.org/wiki/Emoji","living":true,"name":"Emoji","ranges":[[35,35],[42,42],[48,57],[169,169],[174,174],[8252,8252],[8265,8265],[8482,8482],[8596,8601],[8617,8618],[8986,8987],[9000,9000],[9167,9167],[9193,9203],[9208,9210],[9410,9410],[9642,9643],[9654,9654],[9664,9664],[9723,9726],[9728,9732],[9742,9742],[9745,9745],[9748,9749],[9752,9752],[9757,9757],[9760,9760],[9762,9763],[9766,9766],[9770,9770],[9774,9775],[9784,9786],[9792,9792],[9794,9794],[9800,9811],[9823,9824],[9829,9830],[9832,9832],[9851,9851],[9854,9855],[9874,9879],[9881,9881],[9883,9884],[9888,9889],[9895,9895],[9899,9899],[9904,9905],[9917,9918],[9924,9925],[9928,9928],[9934,9935],[9937,9937],[9939,9940],[9961,9962],[9968,9973],[9975,9978],[9981,9981],[9986,9986],[9989,9989],[9992,9997],[9999,9999],[10002,10002],[10004,10004],[10006,10006],[10013,10013],[10017,10017],[10024,10024],[10035,10036],[10052,10052],[10055,10055],[10060,10060],[10062,10062],[10067,10069],[10071,10071],[10083,10084],[10133,10135],[10145,10145],[10160,10160],[10175,10175],[10548,10549],[11013,11015],[11035,11036],[11088,11088],[11093,11093],[12336,12336],[12349,12349],[12951,12951],[12953,12953],[126980,126980],[127183,127183],[127344,127345],[127358,127359],[127374,127374],[127377,127386],[127462,127487],[127489,127490],[127514,127514],[127535,127535],[127538,127546],[127568,127569],[127744,127777],[127780,127891],[127894,127895],[127897,127899],[127902,127984],[127987,127989],[127991,127994],[128000,128253],[128255,128317],[128329,128334],[128336,128359],[128367,128368],[128371,128378],[128391,128391],[128394,128397],[128400,128400],[128405,128406],[128420,128421],[128424,128424],[128433,128434],[128444,128444],[128450,128452],[128465,128467],[128476,128478],[128481,128481],[128483,128483],[128488,128488],[128495,128495],[128499,128499],[128506,128511],[128513,128517],[128519,128591],[128640,128709],[128715,128722],[128725,128727],[128732,128741],[128745,128745],[128747,128748],[128752,128752],[128755,128764],[128992,129003],[129008,129008],[129292,129338],[129340,129349],[129351,129535],[129648,129660],[129664,129672],[129680,129725],[129727,129729],[129731,129733],[129742,129755],[129760,129768],[129776,129784]],"year":1997}],"message":"All of the scripts found based on your filters","status":"OK"}`,
		},
		{
			description:   "limiting fields on one result",
			route:         scripts,
			method:        "GET",
			expectedError: false,
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				limit:           "1",
				order_by:        "id",
				order_direction: "desc",
				fields:          "id, name, year, living",
			},
			expectedCode: 200,
			expectedBody: `{"code":200,"data":[{"id":140,"living":true,"name":"Emoji","year":1997}],"message":"All of the scripts found based on your filters","status":"OK"}`,
		},
		{
			description:   "should return two languages",
			route:         scripts,
			method:        "GET",
			expectedError: false,
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				fields:    "id, name, year, direction, living, year",
				continent: "EU",
				limit:     "2",
			},
			expectedCode: 200,
			expectedBody: `{"code":200,"data":[{"direction":"RIGHT_TO_LEFT","id":1,"living":true,"name":"Adlam","year":1987},{"direction":"LEFT_TO_RIGHT","id":2,"living":false,"name":"Caucasian Albanian","year":420}],"message":"All of the scripts found based on your filters","status":"OK"}`,
		},
		{
			description:   "too many filters",
			route:         scripts,
			method:        "GET",
			expectedError: false,
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				fields:          "id, name, year",
				continent:       "AS",
				limit:           "1",
				order_by:        "name",
				order_direction: "desc",
				living:          "false",
				min_year:        "1001",
				max_year:        "1002",
			},
			expectedCode: 404,
			expectedBody: `{"code":404,"data":"https://thomps9012.github.io/script_sweep/docs/endpoints/scripts","message":"We couldn't find any scripts that match the parameters and filters that you've set. Please broaden your search horizons to view results","status":"NOT FOUND"}`,
		},
		{
			description:   "no limiting headers",
			route:         scripts + "/39",
			method:        "GET",
			expectedError: false,
			expectedCode:  200,
			expectedBody:  `{"code":200,"data":[{"continents":["AS"],"direction":"LEFT_TO_RIGHT","id":39,"link":"https://en.wikipedia.org/wiki/Gujarati_alphabet","living":true,"name":"Gujarati","ranges":[[2689,2692],[2693,2702],[2703,2706],[2707,2729],[2730,2737],[2738,2740],[2741,2746],[2748,2758],[2759,2762],[2763,2766],[2768,2769],[2784,2788],[2790,2802],[2809,2816]],"year":1592}],"message":"Information on script with id: 39","status":"OK"}`,
		},
		{
			description:   "return specific fields",
			route:         scripts + "/39",
			method:        "GET",
			expectedError: false,
			headers: struct {
				fields          string
				continent       string
				limit           string
				order_by        string
				order_direction string
				living          string
				min_year        string
				max_year        string
			}{
				fields: "id, name, year",
			},
			expectedCode: 200,
			expectedBody: `{"code":200,"data":[{"id":39,"name":"Gujarati","year":1592}],"message":"Information on script with id: 39","status":"OK"}`,
		},
	}

	app := router.SetupForTests()

	for _, test := range tests {
		req, _ := http.NewRequest(
			test.method,
			test.route,
			nil,
		)
		test_jwt := config.Config("TEST_AUTH_JWT")
		test_email := config.Config("TEST_AUTH_EMAIL")
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+test_jwt)
		req.Header.Set("email", test_email)
		if test.headers.fields != "" {
			req.Header.Set("fields", test.headers.fields)
		}
		if test.headers.limit != "" {
			req.Header.Set("limit", test.headers.limit)
		}
		if test.headers.order_by != "" {
			req.Header.Set("order_by", test.headers.order_by)
		}
		if test.headers.order_direction != "" {
			req.Header.Set("order_direction", test.headers.order_direction)
		}
		if test.headers.living != "" {
			req.Header.Set("living", test.headers.living)
		}
		if test.headers.min_year != "" {
			req.Header.Set("min_year", test.headers.min_year)
		}
		if test.headers.max_year != "" {
			req.Header.Set("max_year", test.headers.max_year)
		}
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
