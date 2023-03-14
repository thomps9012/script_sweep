# Filter Text

## POST /api/filter

Filters a given piece of text based upon a specified scripting language. The only headers necessary for this route are those associated with authorization, **_JWT and email_**

### Request Parts

1. A request body that contains a _text_ key with a string value and a _script_id_ key with a number between 1 and 140 that specifies the scripting language id
2. Headers specifying the requestor's email and secure JSON Web Token

```javascript
const response = await fetch("/api/filter", {
  method: "POST",
  headers: {
    email: "sgfunk@email.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
  body: JSON.stringify({
    text: "hello goodbye в 英国的 اقثقنح this is a test",
    script_id: 61,
  }),
}).then((res) => res.json());
```

### Sample Response

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
};
```
