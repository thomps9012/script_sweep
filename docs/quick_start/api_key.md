---
sidebar_position: 1
---

# Request an API Key

Send a POST request to the https://tinyurl.com/4zh9cjzb/api/auth/api_key
With a valid email, first, and last name

### API Key Example Request

```javascript
const data = await fetch("https://tinyurl.com/4zh9cjzb/api/auth/api_key", {
  method: POST,
  body: JSON.stringify({
    email: "sgfunk@email.com",
    first_name: "Simon",
    last_name: "Garfunkel",
  }),
});
```

### API Key Example Response

```javascript
{
    "code": 201,
    "data": "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",
    "message": "Please save this API key somewhere secure, as it will NOT be shown again",
    "status": "KEY CREATED"
}
```

## Ensure you save the API Key in a secure place as it will not be shown again
