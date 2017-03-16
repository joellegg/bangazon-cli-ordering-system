'use strict';

const prompt = require('prompt'),
      { Database } = require('sqlite3').verbose(),
      db = new Database('bangazon.sqlite');

const activeCust = () => {
  return new Promise((resolve, reject) => {
    resolve({})
  }).then((res)=> {
    return res
  })
}

module.exports = activeCust
