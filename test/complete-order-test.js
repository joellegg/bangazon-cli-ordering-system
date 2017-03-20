'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const { completeOrder, getCustOrderId, handleProducts, getProductArray } = require('../lib/complete-order');

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
  describe('getProductArray', () => {
    it('should return an array of items with prices', () => {
      var orderLineitems = [{ line_id: 63, order_id: 54, product_id: 1 },
        { line_id: 64, order_id: 54, product_id: 4 },
        { line_id: 65, order_id: 54, product_id: 16 }
      ];
      getProductArray(orderLineitems).then((res) => {
        isArray(res);
      })
    })
  })
});
