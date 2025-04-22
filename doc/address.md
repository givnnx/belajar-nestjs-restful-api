# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization: token

Request Body :

```json
{
  "street": "123 Main St, optional",
  "city": "New York, optional",
  "province": "New York, optional",
  "country": "United States",
  "postal_code": "10001"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "123 Main St, optional",
    "city": "New York, optional",
    "province": "New York, optional",
    "country": "United States",
    "postal_code": "10001"
  }
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "123 Main St, optional",
    "city": "New York, optional",
    "province": "New York, optional",
    "country": "United States",
    "postal_code": "10001"
  }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Request Body :

```json
{
  "street": "123 Main St, optional",
  "city": "New York, optional",
  "province": "New York, optional",
  "country": "United States",
  "postal_code": "10001"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "123 Main St, optional",
    "city": "New York, optional",
    "province": "New York, optional",
    "country": "United States",
    "postal_code": "10001"
  }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "data": true
}
```

## List Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "123 Main St, optional",
      "city": "New York, optional",
      "province": "New York, optional",
      "country": "United States",
      "postal_code": "10001"
    },
    {
      "id": 2,
      "street": "123 Main St, optional",
      "city": "New York, optional",
      "province": "New York, optional",
      "country": "United States",
      "postal_code": "10001"
    }
  ]
}
```
