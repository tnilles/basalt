'use strict';

var RedisConnector = require('./js/service/redis-connector'),
    RedisCommands = require('./js/service/redis-commands');

Polymer({
	keys: {},
    redisCommands: {},
    redisConnector: new RedisConnector(),
    ready: function() {
        console.log('loading keys explorer');

        var self = this;

        self.redisConnector.on('ready', function (client) {
            self.redisCommands = new RedisCommands(client);

            self.redisCommands.fetchKeys(client, function (err, replies) {
                self.keys = self.redisCommands.toTree(replies);
            });

            client.on('error', function (err) {
                console.log('Error ' + err);
            });
        });
    },
    selectDB: function (event) {
        var self = this;

        var client = self.redisConnector.getConnection();
        client.select(event.detail, function () {
            console.log('changed db!');

            self.redisCommands.fetchKeys(client, function (err, replies) {
                self.keys = self.redisCommands.toTree(replies);
            });
        });
    },
	getKeys: function (o) {
	    return Object.keys(o);
	}
});
