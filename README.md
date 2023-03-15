# <img src="./logo.png"  height="50px"> <br />**script_sweep**<br />*Application Program Interface (API)*

## An Endpoint for Script and Unicode Text Classification

### 📚 Provides an interface for classifying and organizing various scripts and recognized by Unicode
### 📜 Allows users to access information about scripts, such as their names, codes, year created, and text direction
### 🔎 Results can be filtered by year, text direction, fields returned, and more
### 💯 100 Free API calls per day
<br />

## Installation

To recreate the API locally, you will need the following

1. Installed Node.js on your system
2. A [supabase](https://supabase.com/ "Supabase Sign Up") database account and associated url / anon key
3. A way to generate a secure 256 bit encryption key in base64 encoding
4. The language / script seed data

### Using npm

`npm install`

### Using yarn

`yarn install`

---

## Usage

### To use the API without local install / set up please visit the [Quick Start](https://thomps9012.github.io/script_sweep/quick_start "script_sweep Documentation")

### Prerequisites

1. API Key
2. JSON Web Token (JWT)
3. A way to interact with the API endpoint (i.e. [Insomnia](https://insomnia.rest/download "Insomnia Install") or [Postman](https://www.postman.com/ "Postman Install"))


#### **Request POST /api/auth/api_key**
---
```javascript
const data = await fetch("/api/auth/api_key", {
  method: "POST",
  body: {
    email: "sgfunk@email.com",
    first_name: "Simon",
    last_name: "Garfunkel",
  },
}).then((res) => res.json());
```

#### **Response Body**

---

```javascript
{
	"code": 201,
	"data": "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
	"message": "Please save this API key somewhere secure, as it will NOT be shown again"
	"status": "KEY CREATED"
}
```

#### **Request POST /api/auth/jwt**

---

```javascript
const data = await fetch("/api/auth/jwt", {
  method: "POST",
  body: {
    email: "sgfunk@email.com",
    api_key: "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"status": "OK",
	"code": 200,
	"data": "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
	"message": "Here is a secure JSON Web Token to make authorized requests to protected API endpoints"
}
```
## ***Once you've created your API key and generated your JSON Web Token (JWT), you can send HTTP requests to the following endpoints***
<br />

#### **Request GET /api/scripts**

---

```javascript
const data = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    limit: "1",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"code": 200,
	"data": [
		  {
		    name: "Adlam",
		    id: 1,
		    ranges: [
		      [125184, 125259],
		      [125264, 125274],
		      [125278, 125280],
		    ],
		    direction: "RIGHT_TO_LEFT",
		    year: 1987,
		    living: true,
		    link: "https://en.wikipedia.org/wiki/Fula_alphabets#Adlam_alphabet",
		    continents: ["AF"],
		  },
		]
	"message": "All of the scripts found based on your filters",
	"status": "OK"
}
```

#### **Request GET /api/scripts With Filters**

---

```javascript
const data = await fetch("/api/scripts", {
  method: "GET",
  headers: {
     email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    fields: "id, name, direction, year",
    order_by: "name",
    order_direction: "desc",
    continent: "AF",
    max_year: "-500",
    limit: "3",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"code": 200,
	"data": [
		  {
		    name: "Ugaritic",
		    id: 133,
		    direction: "LEFT_TO_RIGHT",
		    year: -1400,
		  },
		  {
		    name: "Samaritan",
		    id: 105,
		    direction: "RIGHT_TO_LEFT",
		    year: -600,
		  },
		  {
		    name: "Phoenician",
		    id: 100,
		    direction: "RIGHT_TO_LEFT",
		    year: -1200,
		  },
		],
	"message": "All of the scripts found based on your filters",
	"status": "OK",
}
```

#### **Request GET /api/scripts/:id**

---

```javascript
const data = await fetch("/api/scripts/3", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    fields: "id, name, living, ranges, year",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"code": 200,
	"data": [
		  {
		    id: 3,
		    name: "Ahom",
		    living: false,
		    ranges: [
		      [71424, 71450],
		      [71453, 71468],
		      [71472, 71488],
		    ],
		    year: 1250,
		  },
		],
	"message": "Information on script with id: 3",
	"status": "OK",
}
```

#### **Request POST /api/organize**

---

```javascript
const data = await fetch("/api/organize", {
  method: "POST",
  headers: {
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
  body: {
    text: "hello goodbye в 英国的 اقثقنح",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"code": 200,
	"data": [
			{
				"script": "Latin",
				"words": [
					"hello",
					"goodbye"
				],
				"word_percent": 40,
				"character_percent": 54
			},
			{
				"script": "Cyrillic",
				"words": [
					"в"
				],
				"word_percent": 20,
				"character_percent": 4
			},
			{
				"script": "Han",
				"words": [
					"英国的"
				],
				"word_percent": 20,
				"character_percent": 13
			},
			{
				"script": "Arabic",
				"words": [
					"اقثقنح"
				],
				"word_percent": 20,
				"character_percent": 27
			}
		],
	"message": "Here is your input text organized by script",
	"status": "OK"
}
```

#### **Request POST /api/classify**

---

```javascript
const data = await fetch("/api/classify", {
  method: "POST",
  headers: {
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
  body: {
    text: "hello goodbye в 英国的 اقثقنح",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"classified_by": "character",
	"code": 200,
	"data": [
			{
				"script": "Latin",
				"percent": 46
			},
			{
				"script": "unknown",
				"percent": 15
			},
			{
				"script": "Cyrillic",
				"percent": 4
			},
			{
				"script": "Han",
				"percent": 12
			},
			{
				"script": "Arabic",
				"percent": 23
			}
		],
	"message": "Here is your input text classified by script and character",
	"status": "OK"
}
```

#### **Request POST /api/filter**

---

```javascript
const data = await fetch("/api/filter", {
  method: "POST",
  headers: {
     email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
  body: {
    text: "hello goodbye в 英国的 اقثقنح this is a test",
    script_id: 61
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"code": 200,
	"data": {
		"script": "Latin",
		"filtered_text": [
			"hello",
			"goodbye",
			"this",
			"is",
			"a",
			"test"
		],
		"word_percent": 67,
		"character_percent": 70
	},
	"message": "Here is your input text filtered by your specified script",
	"status": "OK"
}
```

## Contributing

If you would like to contribute to the development of this API, please fork the repository and submit a pull request with your changes.

## License

This API is licensed under the [MIT License](https://opensource.org/license/mit/ "MIT License")
