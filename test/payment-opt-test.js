'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const createPayOpt = require('../lib/payment-opt');

describe('payment-opt', () => {
  describe('createPayOpt function', () => {
    it('createPayOpt should be a function', () => {
      isFunction(createPayOpt);
    });
    it('should return an object', () => {
      createPayOpt().then((res) => {
        isObject(res)
      })
    })
  });
});
