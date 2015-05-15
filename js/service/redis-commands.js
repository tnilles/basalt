'use strict';

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

RedisCommands.prototype.hgetall = function (key, fn) {
    this._client.hgetall(key, fn);
};

RedisCommands.prototype.smembers = function (key, fn) {
    this._client.smembers(key, fn);
};

RedisCommands.prototype.get = function (key, fn) {
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