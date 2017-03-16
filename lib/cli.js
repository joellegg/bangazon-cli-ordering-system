"use strict";

const { argv: [,, ...args] } = process,
      { mainMenu, option } = require('./main-menu');

return new Promise((resolve, reject) => {
  resolve(mainMenu());
}).then((res) => {
  console.log('your chosen option was...', res);
  // if (res === 1) {
  //   // run the create cust acct func
  // }
})
