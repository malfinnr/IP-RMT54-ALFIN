1. POST /products

Request Body:

`````json:
{
   "name": "Office Chair",
    "image": "https://example.com/images/office-chair.jpg",
    "description": "Ergonomic office chair for better posture.",
    "fromName": "Sam",
    "durationOfRelationship": "8 months",
    "categoryId": 1,
    "userId": 1
}

Response (201-Created)

```json:
{
  "name": "Office Chair",
  "image": "https://example.com/images/office-chair.jpg",
  "description": "Ergonomic office chair for better posture.",
  "fromName": "Sam",
  "durationOfRelationship": "8 months",
  "categoryId": 1,
  "userId": 1,
  "createdAt": "2024-11-01T00:00:00.000Z",
  "updatedAt": "2024-11-01T00:00:00.000Z"
}

Response (400-Bad Request)

```json
{
  "message": "Validation Error"
}

Response (500-Internal Server Error)

```json
{
  "message": "Internal Server Error"
}

2. GET /products

Response (200-OK)

````json
[
  {
    "id": 1,
    "name": "Office Chair",
    "description": "Ergonomic office chair for better posture.",
    "fromName": "Sam",
    "durationOfRelationship": "8 months",
    "imgUrl": "https://example.com/image.jpg",
    "category": {
      "id": 1,
      "name": "Office Stuff"
    },
    "user": {
      "id": 1,
      "username": "alfin",
      "email": "alfin@mail.com"
    }
  },
  {
    "id": 2,
    "name": "Massage Roller",
    "image": "https://example.com/images/massage-roller.jpg",
    "description": "Relaxing massage roller for muscle relief.",
    "fromName": "Kate",
    "durationOfRelationship": "1 year",
    "category": {
      "id": 2,
      "name": "Baby Product"
    },
    "user": {
      "id": 1,
      "username": "alfin",
      "email": "alfin@mail.com"
    }
  }
]

Response (500-Internal Server Error)

```json
{
  "message": "Internal Server Error"
}

3. GET /products/id

Response (200-OK)

```json
{
  "id": 1,
  "name": "Office Chair",
  "image": "https://example.com/images/office-chair.jpg",
  "description": "Ergonomic office chair for better posture.",
  "fromName": "Sam",
  "durationOfRelationship": "8 months",
  "categoryId": 1,
  "userId": 1,
  "createdAt": "2024-11-01T00:00:00.000Z",
  "updatedAt": "2024-11-01T00:00:00.000Z"
}

Response (404-Not Found)

```json
{
  "message": "error not found"
}

4. PUT /products/:id

Request Body:

```json
{
  "name": "Office Chair",
  "image": "https://example.com/images/office-chair.jpg",
  "description": "Ergonomic office chair for better posture.",
  "fromName": "Sam",
  "durationOfRelationship": "8 months",
  "categoryId": 1
}

Response (200-OK)

```json
{
  "id": 1,
  "name": "Office Chair",
  "image": "https://example.com/images/office-chair.jpg",
  "description": "Ergonomic office chair for better posture.",
  "fromName": "Sam",
  "durationOfRelationship": "8 months",
  "categoryId": 1,
  "updatedAt": "2024-11-01T00:00:00.000Z"
}

Response (404-Not Found)

```json
{
  "message": "error not found"
}

5. DELETE /products/:id

Response (200-OK)

```json
{
  "message": "Office Chair success to delete"
}

Response (404-Not Found)

```json
{
  "message": "error not found"
}

6. GET /pub/products

Query Parameters:

	•	filter: { "categories": "1,2" }
	•	search: "Office Chair"
	•	sort: { "by": "name", "order": "ASC" }
	•	page: 1

Response (200-OK)

```json
[
  {
    "id": 1,
     "name": "Office Chair",
    "image": "https://example.com/images/office-chair.jpg",
    "description": "Ergonomic office chair for better posture.",
    "fromName": "Sam",
    "durationOfRelationship": "8 months",
    "category": {
      "id": 1,
      "name": "Office Stuff"
    }
  },
  {
    "id": 2,
    "name": "Massage Roller",
    "image": "https://example.com/images/massage-roller.jpg",
    "description": "Relaxing massage roller for muscle relief.",
    "fromName": "Kate",
    "durationOfRelationship": "1 year",
    "category": {
      "id": 2,
      "name": "Baby Product"
    }
  }
]

7. POST /categories

```Request Body:

```json
{
    "name": "Office Stuff"
}

Response (201-Created)

```json
{
  "id": 1,
  "name": "Office Stuff"
}

Response (400-Bad Request)

```json
{
  "message": "Email is Required"
}

Response (401-Unauthorized)

```json
{
  "message": "Invalid Email or Password"
}

8. GET /Categories

Response (200-OK)

```json
[
  {
    "id": 1,
    "name": "Office Stuff",
    "Products": [
      {
        "id": 1,
        "name": "Office Chaie",
        "description": "Ergonomic office chair for better posture."
      }
    ]
  }
]

Response (500- Internal Server Error)

```json
{
  "message": "Internal Server Error"
}

9. PUT /categories/:id

Response (200-OK)

```json
{
  "id": 1,
  "name": "Office Chair"
}

Response (400-Bad Request)

```json
{
  "message": "Email is Required"
}

Response (404-Not Found)

```json
{
  "message": "error not found"
}

10. POST /login

Request Body:

```json
{
  "email": "alfin@mail.com",
  "password": "123456"
}

Response (200-OK)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1..."
}

Response (400-Bad Request)

```json
{
  "message": "Email is Required"
}

Response (401-Unauthorized)

```json
{
  "message": "Invalid Email or Password"
}

11. POST /register

Request Body:

```json
{
  "fullName": "Malaikha",
  "userName": "malaikha",
  "email": "malaikha@mail.com",
  "password": "123456",
  "gender": "female",
  "dateOfBirth": "01-01-2001",
}

Response (201-Created)

```json
{
  "message": "User Added Successfully",
  "data": {
  "id": 2,
  "username": "Malaikha",
  "email": "malaikha@mail.com",
  "password": "123456",
  "gender": "female",
  "dateOfBirth": "01-01-2001"
  }
}

Response (403-Forbidden)

```json
{
  "message": "Forbidden"
}



`````
