# Request Headers

## Authorization Headers

Must be included on all requests outside of the <span id="highlight">**_/api/auth_**</span> endpoint

### _email:_

Email of the person making the request

### _Authorization:_

JWT retrieved from the <span id="highlight">_/api/auth/jwt_</span> endpoint

### <span id="highlight">Example Authorized Request</span>

```javascript
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    Authorization:
      "Bearer eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
  },
}).then((res) => res.json());
```

## Filters 

The options below can be specified in the request headers, and can be combined to create limitless, custom filtered search results

### They are specific to <span id="highlight">_**GET**_</span> requests on the scripts route <br /><span id="highlight">/api/scripts <br />/api/scripts/:id <br /> /api/scripts/filter</span>

### _alive:_

**Either <span id="highlight">_true (still spoken)_</span> or <span id="highlight">_false (not spoken)_</span>**

```javascript
// For example this request would return all non-living languages
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    alive: false,
  },
}).then((res) => res.json());
```

### _min_year:_

**Any <span id="highlight">_whole number / integer_</span>**

Positive numbers are AD and negative numbers are BC

```javascript
// Would return all languages that originated after the year 1090 AD
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    min_year: 1090,
  },
}).then((res) => res.json());
```

### _max_year:_

**Any <span id="highlight">_whole number / integer_</span>**

Positive numbers are AD and negative numbers are BC

```javascript
// Would return all languages that originated before the year 500 BC
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    max_year: -500,
  },
}).then((res) => res.json());
```

### _direction:_

**Any of the three <span id="highlight">_text direction_</span> options**

LEFT_TO_RIGHT, RIGHT_TO_LEFT, TOP_TO_BOTTOM

```javascript
// The query below would only return languages that read left to right
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    direction: "LEFT_TO_RIGHT",
  },
}).then((res) => res.json());
```

### _continent:_

**One of the six <span id="highlight">_Continent Options_</span>**

**AF** [Africa], **AS** [Asia], **AU** [Australia], **EU** [Europe], **NA** [North America], **SA** [South America]

```javascript
// Would return languages that were found on the Asiatic continent
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    continent: "AS",
  },
}).then((res) => res.json());
```

### _fields:_

**Correlates to <span id="highlight">_Table Columns_</span>**

id, name, direction, year, ranges, living, link, continents

** Separated by commas, with or without spaces **

```javascript
// Would return only the id's and name's for the search result
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    fields: "id, name",
  },
}).then((res) => res.json());
```

### _limit:_

**Any <span id="highlight">_whole number (integer)_</span>**

Limits total results returned by the request

```javascript
// Would return two total languages
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    limit: 2,
  },
}).then((res) => res.json());
```

### _order_by:_

**<span id="highlight">_Field_</span> or <span id="highlight">_Column_</span> to organize results by**

id, name, continent, living, year, ranges, direction

```javascript
// Organizes results by ascending id
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    order_by: "id",
  },
}).then((res) => res.json());
```

### _order_direction:_

**<span id="highlight">_Direction_</span> to organize results**

Default is **ascending**, but reversed oder can be specified using the **desc** keyword

```javascript
// Organizes results by descending id
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    order_by: "id",
    order_direction: "desc",
  },
}).then((res) => res.json());
```

**These headers can be _combined_ to receive custom, filtered search results**

**If you reach a <span id="highlight">404 error</span>, remove some filters to cast a broader search net**
