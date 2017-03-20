'use strict';

const prompt = require('prompt'),
  { Database } = require('sqlite3').verbose(),
  db = new Database('bangazon.sqlite');

const getCustOrderId = (active_id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT o.customer_id, o.order_id, o.payment_status FROM Orders o WHERE o.customer_id = ${active_id} ORDER BY o.order_id DESC LIMIT 1`, (err, data) => {
      // get their last order and see if the payment is complete
      if (Number(data.payment_status) === 1) {
        console.log('Your order is complete! Please create a new order');
        const { startUp } = require('./cli');
        startUp();
      }
      // if the payment is 0, pass the order_id to get the order_lines
      else {
        resolve(data.order_id);
      }
    })
  })
}

const handleProducts = (order_id) => {
  if (order_id === undefined) {
    return
  }
  return new Promise((resolve, reject) => {
    // if there are no products then tell user to add products
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
  if (orderLineItems === undefined) {
    return
  }
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
  if (priceArray === undefined) {
    return
  }
  return new Promise((resolve, reject) => {
    let theTotal = 0;
    priceArray.forEach(function(price) {
      theTotal += price
    });
    resolve(theTotal);
  })
}

const readyToPurchase = (theTotal) => {
  if (theTotal === undefined) {
    return
  }
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
  if (userResponse === undefined) {
    return
  }
  return new Promise((resolve, reject) => {
    if (userResponse === 'N') {
      resolve;
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
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please type in your card name',
            required: true
          }
        }
      };

      prompt.get(schema, function(err, result) {
        if (result.payment_option !== 'Visa' && result.payment_option !== 'MasterCard' && result.payment_option !== 'Capital One' && result.payment_option !== 'Amex') {
          console.log("Please type the payment as shown")
          resolve(completePurchase(userResponse, active_id));
        } else {
          db.get(`SELECT po.payment_id, po.name FROM Payment_Options po WHERE po.customer_id = ${active_id} AND po.name = '${result.payment_option}'`, (err, data) => {
            resolve(data.payment_id);
          });
        }
      });
    }
  })
}

const paymentComplete = (paymentId, order_id) => {
  if (paymentId === undefined) {
    return
  }
  console.log('data to update', paymentId, order_id)
  return new Promise((resolve, reject) => {
    // order id, cust id, payment id, payment status
    db.run(`UPDATE Orders SET payment_status = 1, payment_id = ${paymentId} WHERE order_id = ${order_id}`)
  })
}

const completeOrder = (active_id) => {
  return new Promise((resolve, reject) => {
    let orderId;
    getCustOrderId(active_id)
      .then((order_id) => {
        orderId = order_id;
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
      .then((paymentId) => {
        return paymentComplete(paymentId, orderId);
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

module.exports = { completeOrder, getCustOrderId, handleProducts, getProductArray, sumProducts, readyToPurchase }
