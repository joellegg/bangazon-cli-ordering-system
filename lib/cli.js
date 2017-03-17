"use strict";

const { argv: [, , ...args] } = process, { mainMenu, option } = require('./main-menu'),
  createCust = require('./create-cust-acct'),
  activeCust = require('./active-cust'),
  createPayOpt = require('./payment-opt'),
  addProduct = require('./add-to-cart');

// global variables
let active_id;

const startUp = () => {
  return new Promise((resolve, reject) => {
      resolve(mainMenu());
    })
    .then((res) => {
      if (Number(res.option) === 1) {
        console.log(res.option + '. Create customer account');
        createCust().then(() => { startUp() });
      } else if (Number(res.option) === 2) {
        console.log(res.option + '. Choose active customer');
        activeCust().then((res) => {
          active_id = res;
          startUp();
        });
      } else if (Number(res.option) === 3) {
        if (active_id === undefined) {
          console.log('Please select the active customer');
          return startUp();
        }
        console.log(res.option + '. Create a payment option');
        createPayOpt(active_id).then(() => {
          startUp();
        });
      } else if (Number(res.option) === 4) {
        console.log(res.option + '. Add product to shopping cart');
        addProduct(active_id)
        .then((res) => {
          if (Number(res) === 0) {
            startUp();
          }
        })
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
}

startUp();
