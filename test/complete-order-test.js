'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const { completeOrder, handleProducts, getProductArray } = require('../lib/complete-order');

describe('complete-order', () => {
  describe('completeOrder function', () => {
    it('completeOrder should be a function', () => {
      isFunction(completeOrder);
    });
    it('should return an object', () => {
      completeOrder().then((res) => {
        isObject(res)
      })
    })
  });
  describe('handleProducts', () => {
    it('should return an array of objects from order line', () => {
      handleProducts().then((res) => {
        isArray(res);
      })
    })
  })
  describe('getProductArray', () => {
    it('should return an array of items with prices', () => {
      getProductArray().then((res) => {
        isArray(res)
      })
    })
  })
});
