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
  }
})
