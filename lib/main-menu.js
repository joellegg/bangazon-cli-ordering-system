'use strict';

const prompt = require('prompt'),
  chalk = require('chalk'),
  { table, getBorderCharacters } = require('table');

let promptMessage, config, output, option;

const mainMenu = () => {
  return new Promise((resolve, reject) => {
    console.log(chalk.bold.bgGreen('*********************************************************'));
    console.log(chalk.bold.bgGreen('**  Welcome to Bangazon! Command Line Ordering System  **'));
    console.log(chalk.bold.bgGreen('*********************************************************'));
    console.log('1. Create a customer account');
    console.log('2. Choose active customer');
    console.log('3. Create a payment option');
    console.log('4. Add product to shopping cart');
    console.log('5. Complete an order');
    console.log('6. See product popularity');
    console.log('7. Leave Bangazon!');

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
    prompt.message = chalk.green(">");
    // Get 1 number from the user
    prompt.get(schema, function(err, result) {
      resolve(result)
    })
  }).then((res) => {
    return res
  })
}

module.exports = { mainMenu, option }
