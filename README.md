# bc35-2_ExpressBookstoreExercise

- [Overview](#overview)
  - [Features](#features)
  - [Future Improvements](#future-improvements)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Setup Instructions](#setup-instructions)
- [Routes](#routes)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
- [License] (#license)

## Overview
This is a simple Express.js application that serves as a backend API for a bookstore. It allows users to perform CRUD operations on a collection of books stored in a PostgreSQL database. The application includes data validation using JSON Schema to ensure that the data being added or updated is in the correct format.

### Features
- RESTful API endpoints for managing books (Create, Read, Update, Delete)
- Data validation using JSON Schema
- Error handling for various scenarios (e.g., book not found, validation errors)
- Uses Express.js for routing and middleware
- PostgreSQL database for storing book data

### Future Improvements
- Implement user authentication and authorization
- Add pagination and filtering for book listings
- Improve error handling and logging
- Add more comprehensive tests

## Built With
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Schema](https://json-schema.org/)
- [pg (node-postgres)](https://node-postgres.com/)

## Getting Started
### Setup Instructions
1. Clone the repository:
   ```bash
   git clone        
2. Navigate to the project directory:
   ```bash
   cd express-bookstore
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   ```bash
   psql < data.sql  

   ```
5. Create a `.env` file in the root directory and add your database connection string:
   ```env
   DATABASE_URL=your_database_connection_string
   ```
6. Start the server:
   ```bash
   npm start
   ```
7. The server will be running at `http://localhost:3000`.

## Routes
- `GET /books` - Retrieve a list of all books
- `GET /books/:id` - Retrieve a specific book by ID
- `POST /books` - Add a new book
- `PUT /books/:id` - Update an existing book by ID
- `DELETE /books/:id` - Delete a book by ID
- `GET /` - Basic home page route


---

## Author
- Github - [TechEdDan2](https://github.com/TechEdDan2)
- Frontend Mentor - [@TechEdDan2](https://www.frontendmentor.io/profile/TechEdDan2)

## Acknowledgments
The YouTubers and other educational resources I have been learning from include: Coder Coder (Jessica Chan), BringYourOwnLaptop (Daniel Walter Scott), Kevin Powell, vairous Udemy courses, Geeks for Geeks, and Stony Brook University's Software Engineering Bootcamp (Colt Steele) 

## License
This project is licensed under the ISC license