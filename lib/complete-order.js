'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const getCustOrderId = (active_id) => {
  return new Promise((resolve, reject) => {
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
    console.log('order_id', order_id)
    db.all(`SELECT * FROM Order_Line ol WHERE ol.order_id = ${order_id}`, (err, data) => {
      if (data[0] === undefined) {
        resolve(console.log('Please add products to your order'));
      }
      // else get the products
      else {
        // get the prices and sum them
        resolve(data);
      }
    })
  })
}

const getProductArray = (orderLineItems) => {
  console.log('the order line items are...', orderLineItems)
    // loop through the array of objects and get the item prices
  let promiseArray = [];
  for (let i = 0; i < orderLineItems.length; i++) {
    // console.log(orderLineItems[i].product_id)
    promiseArray.push(new Promise((resolve, reject) => {
      db.get(`SELECT p.price FROM Products p WHERE p.product_id = ${orderLineItems[i].product_id}`, (err, data) => {
        resolve(data.price);
      })
    }))
  }

  return Promise.all(promiseArray)
}

const sumProducts = () => {
  return new Promise((resolve, reject) => {
    return 5;
  })
}

const completeOrder = (active_id) => {
  return new Promise((resolve, reject) => {
    getCustOrderId(active_id)
      .then((order_id) => {
        return handleProducts(order_id);
      })
      .then((orderLineItems) => {
        return getProductArray(orderLineItems);
      })
      .then((priceArray) => {
        return sumProducts(priceArray);
      })
      .then((orderLineResponse) => {
        resolve(orderLineResponse)
      })
  })
}

module.exports = { completeOrder, getCustOrderId, handleProducts, getProductArray, sumProducts }
