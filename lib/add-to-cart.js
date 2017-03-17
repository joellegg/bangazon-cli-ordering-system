'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const addManyProducts = (obj, cust_id) => {
  return new Promise((resolve, reject) => {
    console.log('Made it in here like a bizzoss', obj.order_id, 'cust id', cust_id);
  })
}

const addProduct = (cust_id) => {
  return new Promise((resolve, reject) => {
      console.log('cust id', cust_id);
      resolve(db.run(`INSERT INTO Orders VALUES (null, '${cust_id}', 0, 0)`));
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        db.get(`SELECT o.order_id FROM Orders o WHERE o.customer_id = ${cust_id} ORDER BY o.order_id DESC LIMIT 1`, (err, res) => {
          console.log('The current customers last order ' + res.order_id);
          resolve(res);
        });
      })
    })
    .then((obj) => {
      console.log('Look what I passed in ma', obj.order_id);
      addManyProducts(obj, cust_id);
      // display products
    })
}

// .then(() => {
//   return new Promise((resolve, reject) => {
//     var schema = {
//       properties: {
//         order_id: {
//           description: 'Enter customer name',
//           pattern: /^[a-zA-Z\s]+$/,
//           message: 'Name must be only letters and spaces',
//           required: true
//         },
//         address: {
//           description: 'Enter street address',
//           message: 'Please enter your street address',
//           required: true
//         },
//         c0
//           description: 'Enter city',
//           message: 'Please enter your city',
//           required: true
//         },
//         state: {
//           description: 'Enter state',
//           message: 'Please enter your state',
//           required: true
//         },
//         postal: {
//           description: 'Enter postal code',
//           pattern: /^\d{5}$/,
//           message: 'Please enter your postal code as 5 digits',
//           required: true
//         },
//         phone: {
//           description: 'Enter phone number',
//           pattern: /^\d{10}$/,
//           message: 'Please enter your phone number with 10 digits and no dashes',
//           required: true
//         }
//       }
//     };

//     // Get two properties from the user: email, password
//     prompt.get(schema, function(err, result) {
//       resolve(result);
//     });
//   })
// }).then((res) => {
//   db.run(`INSERT INTO Customers VALUES (null, '${res.name}', '${res.address}', '${res.city}', '${res.state}', ${res.postal}, ${res.phone})`);
//   console.log(res);
//   return res
// })


module.exports = addProduct
