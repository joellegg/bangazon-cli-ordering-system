'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const addManyProducts = (obj, cust_id) => {
  return new Promise((resolve, reject) => {
      // console.log('Made it in here like a bizzoss', obj.order_id, 'cust id', cust_id);
      console.log(`
        ************************
        **  Choose a product  **
        ************************
        `)
      console.log('0 Done adding products')
      db.all(`SELECT * FROM Products ORDER BY Products.product_id ASC`, (err, data) => {
        resolve(data.forEach((e) => { console.log(`${e.product_id} ${e.name} ${e.price}`) }))
      })
    })
    .then(() => {
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
      return new Promise((resolve, reject) => {
        if (Number(res.product_id) === 0) {
          console.log('so you\'d like to go back to the main menu...');
          console.log('this is the product id you are passing', res.product_id, typeof(res.product_id))
          resolve(res.product_id);
        } else {
          //
          console.log('this is the response', res)
          resolve(addManyProducts());
        }
          // db.run(`INSERT INTO Order_Line VALUES (null, '${res.order_id}', '${res.product_id}')`);
          // console.log(res);
          // return res
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
