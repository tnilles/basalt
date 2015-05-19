'use strict';

var _ = require('lodash');

/**
 * A wrapper for redis commands
 *
 * Offers some data structure manipulation too
 */
var RedisCommands = function (client) {
    if (!(this instanceof RedisCommands)) {
        return new RedisCommands();
    }

    this._client = client;
};

RedisCommands.prototype.fetchKeys = function (fn) {
    var self = this,
        keys = [];

    var scan = function(index) {
        self._client.scan(index, function(error, result) {
            keys = keys.concat(result[1]);

            var nextIndex = parseInt(result[0], 10);

            if (nextIndex !== 0 && !error) {
                scan(nextIndex);
            } else {
                fn(error, keys);
            }
        });
    }

    scan(0);
};

RedisCommands.prototype.getType = function (key, fn) {
    this._client.type(key, fn);
};

RedisCommands.prototype.getZset = function (key, fn) {
    var self = this,
        set = {};

    var scan = function (index) {
        self._client.zscan(key, index, function (error, result) {
            set = _.assign(set, arrayToObject(result[1]));

            var nextIndex = parseInt(result[0], 10);

            if (nextIndex !== 0 && !error) {
                scan(nextIndex);
            } else {
                fn(error, set);
            }
        });
    }

    scan(0);
};

// TODO: Move this elsewhere
/**
 * Converts an array to an object, taking each odd element
 * as a key, and each even element as a value.
 *
 * eg: [1, 2, 3, 4, 5, 6] would translate to {'1': 2, '3': 4, '5': 6}
 */
var arrayToObject = function (array) {
    return _.zipObject(_.chunk(array, 2));
};

RedisCommands.prototype.getList = function (key, fn) {
    this._client.lrange(key, 0, -1, fn);
};

RedisCommands.prototype.getHash = function (key, fn) {
    this._client.hgetall(key, fn);
};

RedisCommands.prototype.getSet = function (key, fn) {
    this._client.smembers(key, fn);
};

RedisCommands.prototype.getString = function (key, fn) {
    this._client.get(key, fn);
};

RedisCommands.prototype.toTree = function (keys) {
    var tree = {isLeaf: false, children: {}};

    keys.forEach(function (key) {
        var words = key.split(':'),
            subtree = tree.children;

        words.forEach(function (word, index) {
            if (!subtree[word]) {
                subtree[word] = {isLeaf: false, children: {}};
            }

            if (words.length - 1 === index) {
                subtree[word].isLeaf = true;
            }

            subtree = subtree[word].children;
        });
    });

    return tree;
};

module.exports = RedisCommands;