# Classify Text

# POST /api/classify

The classify endpoint consists of two major parts to the request, the text body, and authorization / preference headers. It returns an object with details about the word or character breakdown and HTTP status codes.

### Request Parts

1. A request body that contains a _text_ key with a value of string
2. Request headers that contain information about the user and how they would like their results classified.
3. The default classification behavior is by individual character<br />
   **_Disclaimer_**<br /> _Slightly better performance when classifying **by: word** as shown below_

## Sample Request

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

### Response Body

The response body will convey information about the request status, HTTP code, whether the text was classified by word or character, and the classified text.

## Example Word Response

```javascript
{
    "status": "OK",
    "code": 200,
    "classified_by": "word",
    "classified_text": [
		{
			"script": "Latin",
			"int_percent": 40,
			"string_percent": "40%"
		},
		{
			"script": "Cyrillic",
			"int_percent": 20,
			"string_percent": "20%"
		},
		{
			"script": "Han",
			"int_percent": 20,
			"string_percent": "20%"
		},
		{
			"script": "Arabic",
			"int_percent": 20,
			"string_percent": "20%"
		}
	]
}
```

## Example Character Response

```javascript
{
    "status": "OK",
    "code": 200,
    "classified_by": "character",
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
