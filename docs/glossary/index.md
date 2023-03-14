# Glossary

### API (Application Program Interface)

A domain that is accessible by the public to access resources held on a remote digital server. Software that enables two components to communicate.
#### <a href="https://aws.amazon.com/what-is/api/#:~:text=API%20stands%20for%20Application%20Programming,other%20using%20requests%20and%20responses.">Amazon Definitions</a>

### HTTP (Hypertext Transfer Protocol)

The standardized method in which requests are sent to, acted upon, and responded by from a remote online server. Used to transmit documents or data between parties.
#### <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">Third Party Reference</a>

### JSON (JavaScript Object Notation)

Method of organizing data in object formats, such as arrays. A _lightweight data-interchange format_ that is easy for both humans and computers to read.
#### <a href="https://www.json.org/json-en.html">Official Standards</a>

### JWT (JSON Web Token)
Tool to verify that users who access the API endpoint are who they claim to be.
#### <a href="https://jwt.io/">General Reference</a><br/>
#### <a href="https://www.rfc-editor.org/rfc/rfc7519">Technical Documentation</a>

### Encryption

Method or preventing untrustworthy actors from tampering with and accessing user's personal data. Used for security measures in protecting user's data.
#### <a href="https://www.ibm.com/topics/encryption">Encryption Reference</a>

### Unicode

Language classification system based on converting various language characters to bytes and eventually integer (or whole) numbers.
#### <a href="https://en.wikipedia.org/wiki/Script_(Unicode)">Further Reading</a>

### Text Direction

The direction in which a text is interpreted by the reader, for example
- Left to Right
- Right to Left
- Top to Bottom

### Continent Codes

Describes where a various language or script can be found. Represented by a collection of abbreviations correlating to the world's various continents.<br />
- **AS** is to ***Asia***<br />
- As **AF** is to ***Africa***<br />
- As **NA** is to ***North America***<br />
- As **SA** is to ***South America***<br />
- As **AU** is to ***Australia***<br />
- As **EU** is to ***Europe***<br />

### Request Method

The HTTP method that is associated with a various API call to the server. Can be either a **_GET_**, **_POST_**, **_PUT_**, or **_DELETE_** method.

#### All methods can include request headers, but _GET_ Requests can not include a request body

```javascript
// GET or Retrieve
const response = await fetch("/api/testing", {
  method: "GET",
});
// POST or Create
const response = await fetch("/api/testing", {
  method: "POST",
  body: {
    email: "test@test.com",
    some_data: "data",
  },
});
// PUT or Update
const response = await fetch("/api/testing", {
  method: "PUT",
  body: {
    id: 1,
    update_info: "info to update",
  },
});
// DELETE or Destroy
const response = await fetch("/api/testing", {
  method: "DELETE",
  body: {
    id: 2,
  },
});
```

### Request Headers

Key value pairs that are sent along with either GET or POST requests to the API endpoint.

```javascript
const res = await fetch("/api/testing", {
  method: "GET",
  // below are the headers
  headers: {
    one: "header_one",
    Authorization: "Bearer token_value",
  },
});
```

### Request Body

A JSON object that consists of key value pairs, and is typically sent with an HTTP request to the server. Typically request bodies are converted into strings when sent to the server.

#### _GET Requests can not include a request body_

```javascript
const res = await fetch("/api/testing", {
  method: "POST",
  headers: {
    one: "header_one",
    Authorization: "Bearer token_value",
  },
  // below is the request body
  body: JSON.stringify({
    email: "test@test.com",
    password: "superSecurePW1!",
  }),
});
```

### Response Code

HTTP status codes that correlate to different server responses from the API.
#### <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">303 See Other</a>

### Error Code

HTTP status codes that are associated with unsuccessful requests, regardless of method, to the server.
#### <a href="https://thomps9012-io.vercel.app/404">404 Not Found</a>

### Response Status

Correlate to various HTTP status codes and provide a bit more information about the status of the request.

### Response Body

Various JSON objects that represent data returned from a user's query to the API endpoint, can be either arrays, objects, or text.

```javascript
const response = await fetch("/api/testing").then((res) => res.json());
// could return a body consisting of
[
  ({
    id: 1,
    key: "value",
  },
  {
    id: 2,
    valid_request: true,
  }),
];
```
