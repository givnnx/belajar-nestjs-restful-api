# Contact API Spec

## Creaete Contact

Endpoint : POST /api/contacts

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Giorno Giovanna",
  "last_name": "Giovanni",
  "email": "B8V7n@example.com",
  "phone": "1234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Giorno Giovanna",
    "last_name": "Giovanni",
    "email": "B8V7n@example.com",
    "phone": "1234567890"
  }
}
```

Response Body (Failed):

```json
{
  "error": {
    "message": "Unable to create contact"
  }
}
```

## Get Contact

Endpoint : POST /api/contacts/:contactId

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Giorno Giovanna",
  "last_name": "Giovanni",
  "email": "B8V7n@example.com",
  "phone": "1234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Giorno Giovanna",
    "last_name": "Giovanni",
    "email": "B8V7n@example.com",
    "phone": "1234567890"
  }
}
```

Response Body (Failed):

```json
{
  "error": {
    "message": "Unable to getting the contact"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Giorno Giovanna",
  "last_name": "Giovanni",
  "email": "B8V7n@example.com",
  "phone": "1234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Giorno Giovanna",
    "last_name": "Giovanni",
    "email": "B8V7n@example.com",
    "phone": "1234567890"
  }
}
```

Response Body (Failed):

```json
{
  "error": {
    "message": "Unable to update contact"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "data": true
}
```

Response Body (Failed):

```json
{
  "error": {
    "message": "Unable to remove contact"
  }
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

- Authorization: token

Query Params:

- name: string, contact first name or contact last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Body :

```json
{
  "first_name": "Giorno Giovanna",
  "last_name": "Giovanni",
  "email": "B8V7n@example.com",
  "phone": "1234567890"
}
```

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Giorno Giovanna",
      "last_name": "Giovanni",
      "email": "B8V7n@example.com",
      "phone": "1234567890"
    },
    {
      "id": 2,
      "first_name": "Giorno Giovanna",
      "last_name": "Giovanni",
      "email": "B8V7n@example.com",
      "phone": "1234567890"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_pages": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "error": {
    "message": "Unable to create contact"
  }
}
```
