'use strict';

var RedisConnector = require('./js/service/redis-connector'),
    RedisCommands = require('./js/service/redis-commands');

Polymer({
	keys: {},
    path: [],
    redisCommands: {},
    redisConnector: new RedisConnector(),
    ready: function() {
        var self = this;

        self.redisConnector.on('ready', function (client) {
            self.redisCommands = new RedisCommands(client);

            self.redisCommands.fetchKeys(client, function (err, replies) {
                self.setKeys(replies);
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

            self.redisCommands.fetchKeys(client, function (err, replies) {
                self.setKeys(replies);
            });
        });
    },
    setKeys: function (keys) {
        this.keys = this.redisCommands.toTree(keys);
        this.path = [];
        this.path.push(this.keys);
    },
	getKeys: function (o) {
	    return Object.keys(o);
	},
    openWord: function (event, detail, sender) {
        var word = sender.getAttribute('data-word'),
            col = parseInt(sender.getAttribute('data-col')),
            nextPath;

        this.path = this.path.slice(0, col + 1);

        if (this.path[this.path.length - 1] && this.path[this.path.length - 1][word]) {
            nextPath = this.path[this.path.length - 1][word];

            if (Object.keys(nextPath).length) {
                this.path.push(nextPath);
            }
        }
    }
});