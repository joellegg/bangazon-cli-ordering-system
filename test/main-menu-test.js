'use strict';

const { assert: { isNumber, isUndefined, isArray, include, isFunction, isString } } = require('chai');
const { mainMenu, option } = require('../lib/main-menu');

describe('main menu', () => {
  describe('mainMenu function', () => {
    it('mainMenu should be a function', () => {
      isFunction(mainMenu);
    });
  });
});
