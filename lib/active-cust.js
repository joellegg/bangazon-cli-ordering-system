'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite'),
  { mainMenu, option } = require('./main-menu');

const activeCust = () => {
  return new Promise((resolve, reject) => {
      // get customers with id from database and log to console followed by a prompt to select to active user
      db.all(`SELECT Customers.customer_id, Customers.name FROM Customers ORDER BY customer_id`, (err, data) => {
        resolve(data.forEach((e) => { console.log(`${e.customer_id} ${e.name}`) }))
      })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        var schema = {
          properties: {
            cust_id: {
              description: 'Select your customer id',
              pattern: /[1-9]/,
              message: 'Customer id must be a number',
              required: true
            }
          }
        };

        // Get two properties from the user: email, password
        prompt.get(schema, function(err, result) {
          let cust_id = result.cust_id;
          resolve(cust_id);
        });
      })
    })
}

module.exports = activeCust
