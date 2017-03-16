const { Database } = require('sqlite3').verbose();
const db = new Database('bangazon.sqlite', () => console.log('Data added'));

const { customers } = require('../data/customers.json');
const { payment_options } = require('../data/payment_options.json');
const { products } = require('../data/products.json');
const { orders } = require('../data/orders.json');
const { order_lines } = require('../data/order_lines.json');


customers.forEach((obj) => {
  // Using ES6 string templating, we can create an insert statement for each object
  db.run(`INSERT INTO Customers VALUES (${obj.customer_id}, '${obj.name}', '${obj.address}', '${obj.city}', '${obj.state}', ${obj.postal_code}, ${obj.phone_number})`);
});

payment_options.forEach((res) => {
  db.run(`INSERT INTO Payment_Options VALUES (${res.payment_id}, '${res.name}', ${res.account_number})`);
});

products.forEach((res) => {
  db.run(`INSERT INTO Products VALUES (${res.product_id}, '${res.name}', ${res.price})`)
});

orders.forEach((res) => {
  db.run(`INSERT INTO Orders VALUES (${res.order_id}, ${res.customer_id}, ${res.payment_id}, ${res.payment_status})`)
});

order_lines.forEach((res) => {
  db.run(`INSERT INTO Order_Line VALUES (${res.line_id}, ${res.order_id}, ${res.product_id})`)
});
