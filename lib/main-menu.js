'use strict';

const prompt = require('prompt'),
      chalk = require('chalk');

let option;

const mainMenu = () => {
  return new Promise((resolve, reject) => {
    console.log(
`
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
`);

    var schema = {
      properties: {
        option: {
          description: chalk.green('Choose an option from above'),
          pattern: /^([1-7])$/,
          message: chalk.red('Choose an option using a number of 1 through 7'),
          required: true
        }
      }
    };

    // Get 1 number from the user
    prompt.get(schema, function(err, result) {
      resolve(result)
    })
  }).then((res) => {
    return res
  })
}

module.exports = { mainMenu, option }
