# Common Errors & Possible Causes

<br />

# Redirect Errors (300)

---

### **303 See Other**

- Attempting to organize one word

#### Potential Resolution

- Use the **_/api/classify_** endpoint to learn more about your text instead

<br />

# Request Errors (400)

---

### **400 Bad Request**

- Not including a valid first name when requesting an API key
- Not including a valid last name when requesting an API key
- Not including a valid email when requesting an API key

#### Potential Resolution

- Ensure that your request body to the **/api/auth/api_key** meets the required request specifications

### **401 Unauthorized**

- Not including a valid email address in the request headers
- Not including a valid API key when requesting a JWT
- Not including a valid JWT in the request headers

#### Potential Resolution

- Ensure that your request body to the **/api/auth/jwt** endpoint includes an email and API key

### **403 Forbidden**

- Not including a valid JWT
- Including an expired JWT
- Including a JWT that has been tampered with
- Not including a valid email in the request header

#### Potential Resolution

- Ensure that all requests to available endpoints include token and email headers

### **404 Not Found**

- Too many limits or filters
- Incorrect script ID
- An unknown script

#### Potential Resolution

- Remove some of the specified filters from your request headers to widen your search net

### **409 Conflict**

- Duplicate email requesting an API Key

#### Potential Resolution

- Sign up for a new API key or check that your email is correct

### **422 Unprocessable Content**

- You have not included all the request body parameters
- You've included extra response body key / value pairs

#### Potential Resolution

- Check that your request body matches the specified fields for the endpoint

### **429 Too Many Requests**

- You've reached the 100 API call limit
- You've sent more than five API calls in under one minute

#### Potential Resolution

- Wait until tomorrow
- Slow your horses

<br />

# Server Errors (500)

---

### **501 Not Implemented**

- The API endpoint has not yet been constructed

#### Potential Resolution

- Wait until we build it, or contribute to the repo and open a pull request

### **503 Service Unavailable**

- Servers are down

#### Potential Resolution

- Check back later, if the issue persists feel free to contact the dev team
