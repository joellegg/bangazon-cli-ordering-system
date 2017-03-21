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
    .then((popData) => {
      let orderTotal = 0;
      let custTotal = 0;
      let revTotal = 0;
      console.log(`Product    Orders    Customers    Revenue
        *****************************************
        `);
      for (let i = 0; i < popData.length; i++) {
        console.log(`${popData[i].name}   ${popData[i].orders}   ${popData[i].customers}   ${popData[i].revenue}`)
      }
      for (let i = 0; i < popData.length; i++) {
        orderTotal += popData[i].orders;
        custTotal += popData[i].customers;
        revTotal += popData[i].revenue;
      }
      console.log(`*****************************************
        Totals: ${orderTotal}   ${custTotal}   ${revTotal}`)
      resolve(popData)
    });
  })
}

module.exports = { prodPop, getProducts }
