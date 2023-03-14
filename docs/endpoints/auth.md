# Authorization and Authentication

The script_sweep API endpoint has two endpoints associated with authorization and authentication

## POST /api/auth/api_key

Used to acquire an API key that can be exchanged for a JWT to make authenticated server requests. Limit of 1 API key per email address, and 100 API server calls per day

### Request Parts

A simple request body consisting of an email, first, and last name

```javascript
const response = await fetch("", {
  method: "POST",
  body: JSON.stringify({
    email: "sgfunk@email.com",
    first_name: "Simon",
    last_name: "Garfunkel",
  }),
}).then((res) => res.json());
```

### Sample Response

Returns the API key, successful status code, and a message alerting the user to save the API key for further reference

```javascript
{
    "code": 201,
    "data": "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
    "message": "Please save this API key somewhere secure, as it will NOT be shown again",
    "status": "KEY CREATED"
}
```

## POST /api/auth/jwt

An endpoint that allows the requestor to exchange their API key for an encrypted JWT string. Will not return a token if the API key has hit the daily server call limit.

### Request Parts

Another minimal request, made of a body that contains a valid email / API key pair

```javascript
const response = await fetch("/api/auth/jwt", {
  method: "POST",
  body: {
    email: "sgfunk@email.com",
    api_key: "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
  },
}).then((res) => res.json());
```

### Sample Response

```javascript
{
	"status": "OK",
	"code": 200,
	"data": "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  "message": "Here is a secure JSON Web Token to make authorized requests to protected API endpoints"
}
```
