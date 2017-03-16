'use strict';

const prompt = require('prompt');

const createCust = () => {
  return new Promise((resolve, reject) => {
    var schema = {
      properties: {
        name: {
          description: 'Enter customer name',
          pattern: /^[a-zA-Z\s]+$/,
          message: 'Name must be only letters and spaces',
          required: true
        },
        address: {
          description: 'Enter street address',
          message: 'Please enter your street address',
          required: true
        },
        city: {
          description: 'Enter city',
          message: 'Please enter your city',
          required: true
        },
        state: {
          description: 'Enter state',
          message: 'Please enter your state',
          required: true
        },
        postal: {
          description: 'Enter postal code',
          pattern: /^\d{5}$/,
          message: 'Please enter your postal code as 5 digits',
          required: true
        },
        phone: {
          description: 'Enter phone number',
          pattern: /^\d{10}$/,
          message: 'Please enter your phone number with 10 digits and no dashes',
          required: true
        }
      }
    };

    // Get two properties from the user: email, password
    prompt.get(schema, function(err, result) {
      resolve(result);
    });
  }).then((res)=> {
    console.log(res);
    return res
  })
}

module.exports = createCust
