'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const getCustOrderId = (active_id) => {
  return new Promise((resolve, reject) => {
    console.log('the current customer id is...' + active_id);
    db.get(`SELECT o.customer_id, o.order_id, o.payment_status FROM Orders o WHERE o.customer_id = ${active_id} ORDER BY o.order_id DESC LIMIT 1`, (err, data) => {
      // get their last order and see if the payment is complete
      if (Number(data.payment_status) === 1) {
        resolve(console.log('Your order is complete! Please create a new order'));
      }
      // if the payment is 0, pass the order_id to get the order_lines
      else {
        resolve(data.order_id);
      }
    })
  })
}

const handleProducts = (order_id) => {
  return new Promise((resolve, reject) => {
    // if there are no products then tell user to add products
    db.all(`SELECT * FROM Order_Line ol WHERE ol.order_id = ${order_id}`, (err, data) => {
      if (data[0] === undefined) {
        resolve(console.log('Please add products to your order'))
      }
      // else get the products
      else {
        // get the prices and sum them
        resolve(data);
      }
    })
  })
}

const getProductArray = () => {
  return new Promise((resolve, reject) => {
    // loop through the array of objects and sum the items
    resolve([])
  })
}

const completeOrder = (active_id) => {
  return new Promise((resolve, reject) => {
    getCustOrderId(active_id)
    .then((order_id) => {
      handleProducts(order_id);
    })
    .then(() => {
      getProductArray();
    })
  })
}

module.exports = { completeOrder, handleProducts, getProductArray }
