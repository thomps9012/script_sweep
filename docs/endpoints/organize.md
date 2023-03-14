# Organize Text

# POST /api/organize

Organizes a given piece of text based upon the language it's scripted in. The only headers necessary for this route are those associated with authorization, **_JWT and email_**

### Request Parts

1. A request body that contains a _text_ key with a string value
2. Headers specifying the requestor's email and secure JSON Web Token

## Sample Request

```javascript
const response = await fetch("", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
  body: JSON.stringify({
    text: "hello goodbye в 英国的 اقثقنح",
  }),
});
```

### Response Body
The response body consists of a status, HTTP code, and the input text organized by unicode script and descending word percentage. Character percentage makeup is also provided.

## Sample Response

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
