'use strict';

const { assert: { isNumber, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const createCust = require('../lib/create-cust-acct');

describe('create-cust-acct', () => {
  describe('createCust function', () => {
    it('should be a function', () => {
      isFunction(createCust);
    });
    it('should return an array', () => {
      isArray(createCust());
    });
  });
});
