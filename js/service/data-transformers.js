'use strict';

var _ = require('lodash');

/**
 * Converts an array to an object, taking each odd element
 * as a key, and each even element as a value.
 *
 * eg: [1, 2, 3, 4, 5, 6] would translate to {'1': 2, '3': 4, '5': 6}
 */
var arrayToObject = function (array) {
    return _.zipObject(_.chunk(array, 2));
};


module.exports = {
	arrayToObject: arrayToObject
};