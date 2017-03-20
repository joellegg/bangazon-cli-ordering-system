'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const addProduct = require('../lib/add-to-cart');

describe('add-to-cart', () => {
  describe('addProduct function', () => {
    it('addProduct should be a function', () => {
      isFunction(addProduct);
    });
    it('should return an object', () => {
      addProduct(1).then((res) => {
        isObject(res)
      })
    })
  });
});
