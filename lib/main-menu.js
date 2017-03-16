'use strict';

const prompt = require('prompt');

let option;

const mainMenu = () => {
  return new Promise((resolve, reject) => {
    console.log(`
      *********************************************************
      **  Welcome to Bangazon! Command Line Ordering System  **
      *********************************************************
      1. Create a customer account
      2. Choose active customer
      3. Create a payment option
      4. Add product to shopping cart
      5. Complete an order
      6. See product popularity
      7. Leave Bangazon!
      `)

    // Start the prompt
    prompt.start();
    // Get 1 number from the user
    prompt.get('number', function(err, result) {
      // log the results
      option = result.number;
      resolve(option)
    })
  }).then((res) => {
    console.log('the correct number is', res)
    return res
  })
}

module.exports = { mainMenu, option }
