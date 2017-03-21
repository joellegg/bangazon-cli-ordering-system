'use strict';

const prompt = require('prompt'),
      { Database } = require('sqlite3').verbose(),
      db = new Database('bangazon.sqlite');

const createPayOpt = (active_id) => {
  return new Promise((resolve, reject) => {
    var schema = {
      properties: {
        name: {
          description: 'Enter payment type EX. VISA, MASTERCARD, ETC.',
          pattern: /^[a-zA-Z\s]+$/,
          message: 'Name must be only letters and spaces',
          required: true
        },
        account_number: {
          description: 'Enter account number',
          pattern: /^\d{16}$/,
          message: 'Please enter your account number',
          required: true
        }
      }
    };

    // Get two properties from the user: email, password
    prompt.get(schema, function(err, result) {
      result.customer_id = active_id;
      resolve(result);
    });
  }).then((res)=> {
    db.run(`INSERT INTO Payment_Options VALUES (null, ${res.customer_id}, '${res.name}', ${res.account_number})`);
    console.log('Thank you for adding a new card')
    return res
  })
}

module.exports = createPayOpt
