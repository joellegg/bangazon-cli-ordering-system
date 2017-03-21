'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  { table } = require('table'),
  db = new Database('bangazon.sqlite');

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT p.name, COUNT(ol.product_id) AS orders, COUNT(DISTINCT o.customer_id) AS customers, p.price * COUNT(ol.product_id) AS revenue
            FROM Order_Line ol
            JOIN Products p ON p.product_id = ol.product_id
            JOIN Orders o ON o.order_id = ol.order_id
            GROUP BY ol.product_id
            ORDER BY orders DESC
            LIMIT 3`,
      (err, data) => {
        let orderTotal = 0;
        let custTotal = 0;
        let revTotal = 0;
        let popArray = [
          ['Product', 'Orders', 'Customers', 'Revenue']
        ];
        for (let i = 0; i < data.length; i++) {
          popArray.push([`${data[i].name}`, `${data[i].orders}`, `${data[i].customers}`, `${data[i].revenue}`]);
        }
        for (let i = 0; i < data.length; i++) {
          orderTotal += data[i].orders;
          custTotal += data[i].customers;
          revTotal += data[i].revenue;
        }
        popArray.push([`Totals:`, `${orderTotal}`, `${custTotal}`, `${revTotal}`])
        resolve(popArray)
      })
  })
}

const toTable = (popArray) => {
  return new Promise((resolve, reject) => {
    let config,
      output;

    config = {
      columns: {
        0: {
          alignment: 'left',
          width: 18
        },
        1: {
          alignment: 'left',
          width: 11
        },
        2: {
          alignment: 'left',
          width: 11
        },
        3: {
          alignment: 'left',
          width: 15
        }
      }
    };

    output = table(popArray, config);
    console.log(output);
    resolve(output)
  })
}

const prodPop = () => {
  return new Promise((resolve, reject) => {
    getProducts()
      .then((popArray) => {
        resolve(toTable(popArray));
      })
  })
}

module.exports = { prodPop, getProducts }
