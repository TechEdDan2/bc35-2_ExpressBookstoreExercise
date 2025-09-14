/** Database config for database. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

// connect to db using URI from config.js
let db = new Client({
  connectionString: DB_URI
});

db.connect();


module.exports = db;
