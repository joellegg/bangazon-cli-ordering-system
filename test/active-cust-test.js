'use strict';

const { assert: { isNumber, isObject, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const activeCust = require('../lib/active-cust');

describe('active-cust', () => {
  describe('activeCust function', () => {
    it('activeCust should be a function', () => {
      isFunction(activeCust);
    });
    it('should return an object', () => {
      activeCust().then((res) => {
        isObject(res)
      })
    })
  });
});
