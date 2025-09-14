// express is a library that helps in building web applications and APIs.
// Here we are using it to create routes for handling book-related requests.
const express = require("express");
// Book is a model that interacts with the database to perform CRUD operations on books.
const Book = require("../models/book");

// Create a new router object to define routes for books.
const router = new express.Router();

//Validation Schemas and Library
const { validate } = require("jsonschema");
const bookSchemaFlat = require("../schemas/bookSchemaFlat.json");
const bookSchemaNest = require("../schemas/bookSchemaNest.json");

/** GET / => {books: [book, ...]}  */
router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    // Validation using the nested schema
    const result = validate(req.body, bookSchemaNest);
    //console.log(result);
    if (!result.valid) {
      return next({
        message: "Bad Request",
        status: 400,
        errors: result.errors.map(error => error.stack)
      });
    }
    const book = await Book.create(req.body.book);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    // Validation using the nested schema
    const result = validate(req.body, bookSchemaNest);
    //console.log(result);
    if (!result.valid) {
      return next({
        message: "Bad Request",
        status: 400,
        errors: result.errors.map(error => error.stack)
      });
    }
    // Update book in database
    const book = await Book.update(req.params.isbn, req.body.book);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
