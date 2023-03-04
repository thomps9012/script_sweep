# Scripts & Filter

The scripts API endpoint consists of three different **_GET_** routes with customized result options specified by the user in the request headers

All request calls must be validated and authorized using email and token request headers

## GET /api/scripts

Searches and returns results from the entire script_sweep database

Results can be limited by a number, fields returned, and ordered by a specific column in either an ascending or descending nature, specified in the request headers

### Request Parts

```javascript
const response = await fetch("/api/scripts", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    limit: 3,
    fields: "id, name, year",
    order_by: "year",
    order_direction: "desc",
  },
}).then((res) => res.json());
```

### Sample Response

```javascript
[
  {
    id: 92,
    name: "Osage",
    year: 2006,
  },
  {
    id: 140,
    name: "Emoji",
    year: 1997,
  },
  {
    id: 1,
    name: "Adlam",
    year: 1987,
  },
];
```

## GET /api/scripts/:id

Returns specific information about a script specified by it's ID

### Request Parts

```javascript
const response = await fetch("/api/scripts/39", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    fields: "id, name, year, continents",
  },
}).then((res) => res.json());
```

### Sample Response

```javascript
[
  {
    id: 39,
    name: "Gujarati",
    year: 1592,
    continents: ["AS"],
  },
];
```

## GET /api/scripts/filter

Allows for the use of all possible filtering request headers, which leads to custom search results

### Request Parts

```javascript
const response = await fetch("/api/scripts/filter", {
  method: "GET",
  headers: {
    email: "sgfunk@email.com",
    token:
      "eaLhcDciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhRMqU2In0..aHVUcEE7IewIDEnfFdPw5g.UammvwKUHOBY7IX8b6xduplxL1JbLGOeLfnPDW_s7-5Xp06methCJns4TZZ2OPBq-mlRRqV-C8MBmKZOEXp-8JwamrN3r_0CCahbzeus2zcDTcUwQD3D69niSlyMk7S30b4v1OYpnKED8cXI_TY-C1woqnCUSIc6aC6wDLHHtByYrfbhX3PvN6hj--5Msh51NnNqHV6IYRlbieYt3MWS0kfQiFNNnOWbpNzXVw-PSMShyvjg9iFueS7WZgW85PlqeZEYVVTw0QNOxQVVz7eLVw.oqpBOqt-riAwoYGa3Y7KPq",
    fields: "name, id, direction, year, continents, living",
    order_by: "name",
    order_direction: "desc",
    max_year: -1200,
    min_year: -500,
    living: false,
    continent: "AS",
    direction: "LEFT_TO_RIGHT",
    limit: 3,
  },
}).then((res) => res.json());
```

### Sample Response

```javascript
[
  {
    name: "Old Persian",
    id: 136,
    direction: "LEFT_TO_RIGHT",
    year: -525,
    continents: ["AS", "EU", "AF"],
    living: false,
  },
  {
    name: "Lycian",
    id: 67,
    direction: "LEFT_TO_RIGHT",
    year: -500,
    continents: ["AS", "EU"],
    living: false,
  },
  {
    name: "Carian",
    id: 21,
    direction: "LEFT_TO_RIGHT",
    year: -650,
    continents: ["AS"],
    living: false,
  },
];
```
