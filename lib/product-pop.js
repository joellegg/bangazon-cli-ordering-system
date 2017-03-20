'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT p.name, COUNT(ol.product_id) AS orders, COUNT(o.customer_id) AS customers, p.price * COUNT(ol.product_id) AS revenue
            FROM Order_Line ol
            JOIN Products p ON p.product_id = ol.product_id
            JOIN Orders o ON o.order_id = ol.order_id
            GROUP BY ol.product_id
            ORDER BY orders DESC
            LIMIT 10`,
      (err, data) => {
        resolve(data)
      })
  })
}

const prodPop = () => {
  return new Promise((resolve, reject) => {
    getProducts()
    .then((res) => {
      console.log(`
        Product    Orders    Customers    Revenue
        *****************************************
        `);
      console.log(res)
      resolve(res)
    });
  })
}

module.exports = { prodPop, getProducts }
