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

RedisCommands.prototype.fetchKeys = function (client, fn) {
    client.keys('*', fn);
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
    var tree = {};

    keys.forEach(function (key) {
        var words = key.split(':'),
            subtree = tree;

        words.forEach(function (word) {
            if (!subtree[word]) {
                subtree[word] = {};
            }

            subtree = subtree[word];
        });
    });

    return tree;
};

module.exports = RedisCommands;