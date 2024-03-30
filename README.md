# Registration Table

Given two files `app.js` and a database file `register.db` consisting a table `register`.

Write APIs to perform operations on the table `register` containing the following columns,

| Columns     | Type                              |
| ----------- | --------------------------------- |
| id          | INTEGER PRIMARY KEY AUTOINCREMENT |
| name        | VARCHAR(255) NOT NULL             |
| email       | VARCHAR(255) NOT NULL             |
| dateOfBirth | DATE                              |

### API 1

#### Path: `/registration/`

#### Method: `POST`

#### Description:

Creates a new person details in the table (database). `id` is auto-incremented

#### Request

```
{
  "name": "Vishal",
  "email": "vishal@gmail.com",
  "dateOfBirth": 2000-08-05
}
{
  "name": "Mahesh",
  "email": "mahesh@gmail.com",
  "dateOfBirth": 2001-07-25
}
```

#### Response

```
[
{
  "name": "Vishal",
  "email": "vishal@gmail.com",
  "dateOfBirth": 2000-08-05
}

  ...
]
```

### API 2

#### Path: `/register/`

#### Method: `GET`

#### Description:

Returns a list of all data in the table

#### Response

```
Person Details Added to Team
```

### API 3

#### Path: `/register/:id/`

#### Method: `PUT`

#### Description:

Updates the details of a person in the table (database) based on the ID

#### Request

```
{
  "name": "Maneesh",
  "email": "maneesh@gmail.com",
  "dateOfBirth": 1999-02-17
}
```

#### Response

```
Register Details Updated
```

### API 4

#### Path: `/register/:id/`

#### Method: `DELETE`

#### Description:

Deletes a person from the table (database) based on the ID

#### Response

```
Register Detail Removed
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.** 


To Run code using `node app.js` 
For Debugging the responses open `app.http` 
