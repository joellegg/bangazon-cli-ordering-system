"use strict";

const { argv: [,, ...args] } = process,
      { mainMenu, option } = require('./main-menu'),
      createCust = require('./create-cust-acct');

return new Promise((resolve, reject) => {
  resolve(mainMenu());
}).then((res) => {
  if (Number(res.option) === 1) {
    console.log(res.option + '. Create customer account');
    createCust();
  } else if (Number(res.option) === 2) {
    console.log(res.option + '. Choose active customer');
  } else if (Number(res.option) === 3) {
    console.log(res.option + '. Create a payment option');
  } else if (Number(res.option) === 4) {
    console.log(res.option + '. Add product to shopping cart');
  } else if (Number(res.option) === 5) {
    console.log(res.option + '. Complete an order');
  } else if (Number(res.option) === 6) {
    console.log(res.option + '. See product popularity');
  } else if (Number(res.option) === 7) {
    console.log(res.option + '. Leave Bangazon');
  } else {
    console.log('error')
  }
})
