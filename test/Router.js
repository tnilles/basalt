'use strict';

var Router = require('../js/service/Router'),
    should = require('should');

describe('Router', function() {

    it('should throw an error when provided with no arguments', function() {
        should.throws(function() {
            var router = new Router();
        });
    });

});
