// Require in the Database method from the sqlite3 module
// We will be using the verbose execution mode, which will help with debugging errors.
const { Database } = require('sqlite3').verbose();

// Returns a new database object and automatically opens the database
// Database method accepts a callback function for successful connection
const db = new Database('bangazon.sqlite', () => console.log('Tables added!'));

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};

// Passing in IF NOT EXISTS after CREATE TABLE will check to make sure there are no tables named 'customers'
// If it does exist, this line will not run
db.run(`CREATE TABLE IF NOT EXISTS Customers (
  customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code INT,
  phone_number INT)`, errorHandler);
db.run(`CREATE TABLE IF NOT EXISTS Payment_Options (
  payment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  account_number INT)`, errorHandler);
db.run(`CREATE TABLE IF NOT EXISTS Products (
  product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INT)`, errorHandler);
db.run(`CREATE TABLE IF NOT EXISTS Orders (
  order_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  customer_id INT,
  payment_id INT,
  payment_status INT,
  FOREIGN KEY(customer_id) REFERENCES Customers(customer_id),
  FOREIGN KEY(payment_id) REFERENCES Payment_Options(payment_id))`, errorHandler);
db.run(`CREATE TABLE IF NOT EXISTS Order_Line (
  line_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  order_id INT,
  product_id INT,
  FOREIGN KEY(order_id) REFERENCES Orders(order_id),
  FOREIGN KEY(product_id) REFERENCES Products(product_id))`, errorHandler);
