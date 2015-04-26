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