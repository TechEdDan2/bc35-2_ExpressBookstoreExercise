process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

const Book = require("../models/book");

let testBook;

beforeEach(async function () {
    //Delete everything from books table
    await db.query("DELETE FROM BOOKS");

    //Add a book
    let result = await db.query(`
    INSERT INTO books (
      isbn,
      amazon_url,
      author,
      language,
      pages,
      publisher,
      title,
      year)
    VALUES (
      '0691161518',
      'http://a.co/eobPtX2',
      'Matthew Lane',
      'english',
      264,
      'Princeton University Press',
      'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      2017)
    RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`);
    testBook = result.rows[0];
});

afterEach(async function () {
    // delete everything from books table
    await db.query("DELETE FROM BOOKS");
});

/** GET /books/ */
describe("GET /books", function () {
    test("Gets a list of 1 book", async function () {
        const resp = await request(app).get("/books");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            books: [testBook]
        });
    });
});

/** GET /books/:id */
describe("GET /books/:id", function () {
    test("Gets a single book", async function () {
        const resp = await request(app).get(`/books/${testBook.isbn}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ book: testBook });
    });

    test("Responds with 404 if can't find book", async function () {
        const resp = await request(app).get(`/books/999`);
        expect(resp.statusCode).toBe(404);
    });
});

/** POST /books Unit Test */
describe("Book.create (unit)", function () {
    test("Creates a new book in the DB", async function () {
        const resp = await Book.create({
            isbn: "1234567890",
            amazon_url: "http://a.co/test",
            author: "Test Author",
            language: "english",
            pages: 100,
            publisher: "Test Publisher",
            title: "Test Book",
            year: 2024
        });
        expect(resp).toEqual({
            isbn: "1234567890",
            amazon_url: "http://a.co/test",
            author: "Test Author",
            language: "english",
            pages: 100,
            publisher: "Test Publisher",
            title: "Test Book",
            year: 2024
        });
    });
});

/** POST /books API TEST */
describe("POST /books", function () {
    test("Creates a new book via API", async function () {
        const newBook = {
            book: {
                isbn: "1234567890",
                amazon_url: "http://a.co/test",
                author: "Test Author",
                language: "english",
                pages: 100,
                publisher: "Test Publisher",
                title: "Test Book",
                year: 2024
            }
        };
        const resp = await request(app)
            .post("/books")
            .send(newBook);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            book: newBook.book
        });
    });
});


/** PUT /:isbn */
describe("PUT /books/:isbn", function () {
    test("Update a single book", async function () {
        const resp = await request(app)
            .put(`/books/${testBook.isbn}`)
            .send({
                book: {
                    isbn: "0691161518",
                    amazon_url: "http://a.co/updated",
                    author: "Updated Author",
                    language: "english",
                    pages: 100,
                    publisher: "Updated Publisher",
                    title: "Test Book",
                    year: 2024
                }
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            book: {
                isbn: "0691161518",
                amazon_url: "http://a.co/updated",
                author: "Updated Author",
                language: "english",
                pages: 100,
                publisher: "Updated Publisher",
                title: "Test Book",
                year: 2024
            }
        });
    });
});

/** DELETE /:isbn */
describe("DELETE /books/:isbn", function () {
    test("Deletes a single a book", async function () {
        const resp = await request(app)
            .delete(`/books/${testBook.isbn}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Book deleted" });
    });
});

afterAll(async function () {
    // close db connection
    await db.end();
});