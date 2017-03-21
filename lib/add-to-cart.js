'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');


const addManyProducts = (orderId, cust_id) => {
  let dataLength;
  return new Promise((resolve, reject) => {
      // console.log('Made it in here like a bizzoss', obj.order_id, 'cust id', cust_id);
      console.log(`
        ************************
        **  Choose a product  **
        ************************
        `)
      console.log('0 Done adding products')
      db.all(`SELECT * FROM Products ORDER BY Products.product_id ASC`, (err, data) => {
        data.forEach((e) => { console.log(`${e.product_id} ${e.name} ${e.price}`) });
        resolve(data)
      })
    })
    .then((data) => {
      dataLength = data.length;
      return new Promise((resolve, reject) => {
        var schema = {
          properties: {
            product_id: {
              description: 'Select a product',
              pattern: /^[0-9]+$/,
              message: 'Please use a number to select the product',
              required: true
            }
          }
        };

        // Get two properties from the user: email, password
        prompt.get(schema, function(err, result) {
          resolve(result);
        });
      })
    })
    .then((res) => {
      console.log('this is the data', dataLength)
      return new Promise((resolve, reject) => {
        if (Number(res.product_id) === 0) {
          resolve(res.product_id);
        } else if (res.product_id > dataLength) {
          console.log('Please select a product from the list');
          resolve(addManyProducts(orderId, cust_id));
        } else {
          // push the product onto the order-line
          db.run(`INSERT INTO Order_Line VALUES (null, '${orderId.order_id}', '${res.product_id}')`);
          resolve(addManyProducts(orderId, cust_id));
        }
      })
    })
}


const addProduct = (cust_id) => {
  // create a new order
  return new Promise((resolve, reject) => {
      console.log('cust id', cust_id);
      resolve(db.run(`INSERT INTO Orders VALUES (null, '${cust_id}', 0, 0)`));
    })
    // get the order_id to pass to order lines
    .then(() => {
      return new Promise((resolve, reject) => {
        db.get(`SELECT o.order_id FROM Orders o WHERE o.customer_id = ${cust_id} ORDER BY o.order_id DESC LIMIT 1`, (err, res) => {
          console.log('The current customers last order ' + res.order_id);
          resolve(res);
        });
      })
    })
    // get the selection of products, and pass in the order_id and customer id
    .then((order_id) => {
      return new Promise((resolve, reject) => {
        resolve(addManyProducts(order_id, cust_id));
      })
    })
}

//


module.exports = addProduct
