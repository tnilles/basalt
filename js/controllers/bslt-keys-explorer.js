'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router'),
    RedisConnector = require('../service/RedisConnector'),
    RedisCommands = require('../service/redis-commands');

var keysExplorerCtrl = function() {
    console.log('loading keys explorer');

    var fetchKeys = function(client, fn) {
        client.keys('*', fn);
    };

    // Init Redis connection
    var client;

    var redisConnector = RedisConnector();

    redisConnector.on('ready', function (client) {
        var redisCommands = new RedisCommands(client);
        
        console.log('client connected!')

        fetchKeys(client, function(err, replies) {
            console.log('keys:', redisCommands.toTree(replies));
        });

        client.on('error', function (err) {
            console.log('Error ' + err);
        });
    });

    var back = function() {
        router.to('bslt-server-list');
    };

    var $keysExplorer = document.querySelector('bslt-keys-explorer');
};

module.exports = keysExplorerCtrl;
