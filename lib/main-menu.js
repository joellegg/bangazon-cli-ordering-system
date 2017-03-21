'use strict';

const prompt = require('prompt'),
  chalk = require('chalk'),
  { table, getBorderCharacters } = require('table');

let promptMessage, config, output, option;

const mainMenu = () => {
  return new Promise((resolve, reject) => {
    promptMessage = [
      ['*********************************************************'],
      ['**  ' + chalk.bold.bgGreen('Welcome to Bangazon! Command Line Ordering System') + '  **'],
      ['*********************************************************'],
      ['1. Create a customer account'],
      ['2. Choose active customer'],
      ['3. Create a payment option', ],
      ['4. Add product to shopping ,cart'],
      ['5. Complete an order'],
      ['6. See product popular,ity'],
      ['7. Leave Bangazon!']
    ];

    config = {
      border: getBorderCharacters(`void`),
      columnDefault: {
        paddingLeft: 5,
        paddingRight: 0
      },
      drawJoin: () => {
        return false
      },
      columns: {
        0: {
          alignment: 'left',
          width: 80
        },
        1: {
          alignment: 'left',
          width: 80
        },
        2: {
          alignment: 'left',
          width: 80
        },
        3: {
          alignment: 'left',
          width: 80
        },
        4: {
          alignment: 'left',
          width: 80
        },
        5: {
          alignment: 'left',
          width: 80
        },
        6: {
          alignment: 'left',
          width: 80
        },
        7: {
          alignment: 'left',
          width: 80
        },
        8: {
          alignment: 'left',
          width: 80
        },
        9: {
          alignment: 'left',
          width: 80
        }
      }
    };

    output = table(promptMessage, config);
    console.log(output);

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
