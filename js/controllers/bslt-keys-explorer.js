'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router'),
    RedisConnector = require('../service/RedisConnector');

var keysExplorerCtrl = function() {
    console.log('loading keys explorer');


    // Init Redis connection
    var client;

    var redisConnector = RedisConnector();

    redisConnector.on('ready', function (_client) {
        client = _client;
        
        console.log('client connected!')

        client.on("error", function (err) {
            console.log("Error " + err);
        });
    });


    var createServer = function(event) {
        servers.add(event.detail);
        router.to('bslt-server-list');
    };

    var back = function() {
        router.to('bslt-server-list');
    };

    var $serverConfiguration = document.querySelector('bslt-server-configuration');


    listener.add($serverConfiguration, 'add-server-configuration', createServer);
    listener.add($serverConfiguration, 'go-back', back);
};

module.exports = keysExplorerCtrl;
