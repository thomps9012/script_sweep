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
    "key": "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
    "message": "Please save this api key somewhere secure as it will not be displayed again."
}
```

#### **Request POST /api/auth/jwt**

---

```javascript
const data = await fetch("/api/auth/jwt", {
  method: "POST",
  body: {
    email: "test211@test.com",
    api_key: "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
{
	"status": "OK",
	"code": 201,
	"token": "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq"
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
    email: "test211@test.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    limit: "1",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
[
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
];
```

#### **Request GET /api/scripts/filter**

---

```javascript
const data = await fetch("/api/scripts/filter", {
  method: "GET",
  headers: {
    email: "test211@test.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
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
[
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
];
```

#### **Request GET /api/scripts/:id**

---

```javascript
const data = await fetch("/api/scripts/3", {
  method: "GET",
  headers: {
    email: "test211@test.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    fields: "id, name, living, ranges, year",
  },
}).then((res) => res.json());
```

#### **Response Body**
---

```javascript
[
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
];
```

#### **Request POST /api/organize**

---

```javascript
const data = await fetch("/api/organize", {
  method: "POST",
  headers: {
    email: "test211@test.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
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
	"status": "OK",
	"code": 200,
	"organized_text": [
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
	]
}
```

#### **Request POST /api/classify**

---

```javascript
const data = await fetch("/api/classify", {
  method: "POST",
  headers: {
    email: "test211@test.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
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
	"status": "OK",
	"code": 200,
	"classified_text": [
		{
			"script": "Latin",
			"int_percent": 55,
			"string_percent": "55%"
		},
		{
			"script": "Cyrillic",
			"int_percent": 5,
			"string_percent": "5%"
		},
		{
			"script": "Han",
			"int_percent": 14,
			"string_percent": "14%"
		},
		{
			"script": "Arabic",
			"int_percent": 27,
			"string_percent": "27%"
		}
	]
}
```

## Contributing

If you would like to contribute to the development of this API, please fork the repository and submit a pull request with your changes.

## License

This API is licensed under the [MIT License](https://opensource.org/license/mit/ "MIT License")
