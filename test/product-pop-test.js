'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const { prodPop, getProducts } = require('../lib/product-pop');

describe('product-pop', () => {
  describe('getProducts function', () => {
    it('getProducts should be a function', () => {
      isFunction(getProducts);
    });
    it('should return an object', () => {
      getProducts().then((res) => {
        isArray(res);
      })
    })
  });
});
