# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "Giorno",
  "password": "himitsu",
  "name": "Giorno Giovanna"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Giorno",
    "name": "Giorno Giovanna"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "Giorno",
  "password": "himitsu"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Giorno",
    "name": "Giorno Giovanna",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers:

- Authorization: token

Response Body (Success):

```json
{
  "data": {
    "username": "Giorno",
    "name": "Giorno Giovanna"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers:

- Authorization: token

Request Body :

```json
{
  "name": "giorno giovanna", //optional if you want to change it
  "password": "himitsu" //optional if you want to change it
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Giorno",
    "name": "Giorno Giovanna"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers:

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
  "errors": "Unable to logout"
}
```
