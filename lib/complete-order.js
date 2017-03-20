'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const getCustOrderId = (active_id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT o.customer_id, o.order_id, o.payment_status FROM Orders o WHERE o.customer_id = ${active_id} ORDER BY o.order_id DESC LIMIT 1`, (err, data) => {
      // get their last order and see if the payment is complete
      if (Number(data.payment_status) === 1) {
        resolve(console.log('Your order is complete! Please create a new order'));
      }
      // if the payment is 0, pass the order_id to get the order_lines
      else {
        resolve(data.order_id);
      }
    })
  })
}

const handleProducts = (order_id) => {
  return new Promise((resolve, reject) => {
    // if there are no products then tell user to add products
    console.log('order_id', order_id)
    db.all(`SELECT * FROM Order_Line ol WHERE ol.order_id = ${order_id}`, (err, data) => {
      if (data[0] === undefined) {
        resolve(console.log('Please add products to your order'));
      }
      // else get the products
      else {
        // get the prices and sum them
        resolve(data);
      }
    })
  })
}

const getProductArray = (orderLineItems) => {
  console.log('the order line items are...', orderLineItems)
    // loop through the array of objects and get the item prices
  let promiseArray = [];
  for (let i = 0; i < orderLineItems.length; i++) {
    // console.log(orderLineItems[i].product_id)
    promiseArray.push(new Promise((resolve, reject) => {
      db.get(`SELECT p.price FROM Products p WHERE p.product_id = ${orderLineItems[i].product_id}`, (err, data) => {
        resolve(data.price);
      })
    }))
  }

  return Promise.all(promiseArray)
}

const sumProducts = (priceArray) => {
  return new Promise((resolve, reject) => {
    console.log('sumProducts priceArray', priceArray);
    let theTotal = 0;
    priceArray.forEach(function(price) {
      theTotal += price
    });
    resolve(theTotal);
  })
}

const readyToPurchase = (theTotal) => {
  return new Promise((resolve, reject) => {
    var schema = {
      properties: {
        cust_response: {
          description: `Your order total is \$${theTotal}. Ready to puchase?
                        (Y/N)`,
          pattern: /^(?:Y|N)$/,
          message: 'Please select Y or N',
          required: true
        }
      }
    };

    // Get two properties from the user: email, password
    prompt.get(schema, function(err, result) {
      resolve(result.cust_response);
    });
  });
}

const completePurchase = (userResponse, active_id) => {
  return new Promise((resolve, reject) => {
    console.log('well i got here at least', userResponse)
    if (userResponse === 'N') {
      return
    } else if (userResponse === 'Y') {
      db.all(`SELECT po.name FROM Payment_Options po WHERE po.customer_id = ${active_id}`, (err, data) => {
        for (let i = 0; i < data.length; i++) {
          console.log((i + 1), data[i].name)
        }
      })
      var schema = {
      properties: {
        payment_option: {
          description: 'Choose a payment option',
          pattern: /^[0-9]+$/,
          message: 'Please use a number to select your card',
          required: true
        }
      }
    };

    // Get two properties from the user: email, password
    prompt.get(schema, function(err, result) {
      resolve(result.payment_option);
    });
    }
  })
}

const completeOrder = (active_id) => {
  return new Promise((resolve, reject) => {
    getCustOrderId(active_id)
      .then((order_id) => {
        return handleProducts(order_id);
      })
      .then((orderLineItems) => {
        return getProductArray(orderLineItems);
      })
      .then((priceArray) => {
        return sumProducts(priceArray);
      })
      .then((theTotal) => {
        return readyToPurchase(theTotal);
      })
      .then((userResponse) => {
        return completePurchase(userResponse, active_id);
      })
  })
}

module.exports = { completeOrder, getCustOrderId, handleProducts, getProductArray, sumProducts, readyToPurchase }
