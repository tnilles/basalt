'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router'),
    RedisConnector = require('../service/RedisConnector'),
    RedisCommands = require('../service/redis-commands');

var keysExplorerCtrl = function() {
    console.log('loading keys explorer');

    // Init Redis connection
    var client;

    var redisConnector = RedisConnector();

    var redisCommands;

    var $keysExplorer = document.querySelector('bslt-keys-explorer');

    redisConnector.on('ready', function (client) {
        redisCommands = new RedisCommands(client);

        redisCommands.fetchKeys(client, function(err, replies) {
            $keysExplorer.keys = redisCommands.toTree(replies);
        });

        client.on('error', function (err) {
            console.log('Error ' + err);
        });
    });

    var back = function() {
        router.to('bslt-server-list');
    };

    var selectDB = function(event) {
        var client = redisConnector.getConnection();
        client.select(event.detail, function() {
            console.log('changed db!');

            redisCommands.fetchKeys(client, function(err, replies) {
                $keysExplorer.keys = redisCommands.toTree(replies);
            });

        });
    };

    listener.add($keysExplorer, 'select-database', selectDB);

};

module.exports = keysExplorerCtrl;
