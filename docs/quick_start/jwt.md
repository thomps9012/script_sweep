---
sidebar_position: 2
---

# Request a JWT

Now that you have acquired and stored your secure API Key, it's time to exchange it for an encrypted JWT to ensure that all of your further API requests are authenticated

### JWT Example Request

```javascript
const data = await fetch("https://tinyurl.com/4zh9cjzb/api/auth/jwt", {
  method: POST,
  body: JSON.stringify({
    email: "sgfunk@email.com",
    api_key: "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
  }),
});
```

### JWT Example Response

```javascript
{
	"status": "OK",
	"code": 200,
	"data": "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  "message": "Here is a secure JSON Web Token to make authorized requests to protected API endpoints"
}
```

### JWT are valid for 12 hours ⏱️
