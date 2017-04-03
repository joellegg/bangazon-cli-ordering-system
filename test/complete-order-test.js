'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, strictEqual } } = require('chai');
const { completeOrder, getCustOrderId, handleProducts, getProductArray, sumProducts, readyToPurchase } = require('../lib/complete-order');

describe('complete-order', () => {
  describe('getCustOrderId', () => {
    it('should return an order id', () => {
      getCustOrderId(1).then((res) => {
        isNumber(res)
      })
    })
  })
  describe('handleProducts', () => {
    it('should return an array of objects from order line', () => {
      handleProducts(5).then((res) => {
        isArray(res);
      })
    })
  });
  // describe('getProductArray', () => {
  //   it('should return an array of items with prices', () => {
  //     var orderLineitems = [{ line_id: 54, order_id: 20, product_id: 1 },
  //       { line_id: 13, order_id: 12, product_id: 4 },
  //       { line_id: 18, order_id: 10, product_id: 16 }
  //     ];
  //     getProductArray(orderLineitems).then((res) => {
  //       isArray(res);
  //     })
  //   })
  // });
  describe('sumProducts function', () => {
    it('should return a total price', () => {
      let somePrices = [2, 3, 4];
      sumProducts(somePrices).then((res) => isNumber(res));
    })
  });
});
