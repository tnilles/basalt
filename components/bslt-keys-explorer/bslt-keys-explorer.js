'use strict';

var RedisConnector = require('./js/service/redis-connector'),
    RedisCommands = require('./js/service/redis-commands');

Polymer({
    currentKey: [],
	keys: {},
    path: [],
    redisCommands: {},
    redisConnector: new RedisConnector(),
    ready: function () {
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
            col = parseInt(sender.getAttribute('data-col'), 10),
            nextPath;

        this.selectWord(sender);

        this.path = this.path.slice(0, col + 1);

        if (this.path[this.path.length - 1] && this.path[this.path.length - 1][word]) {
            this.currentKey = this.currentKey.slice(0, col);
            this.currentKey.push(word);

            nextPath = this.path[this.path.length - 1][word];

            if (Object.keys(nextPath).length) {
                this.path.push(nextPath);
                this.scrollRight();
            } else {
                this.openKey(this.currentKey.join(':'));
            }
        }
    },
    openKey: function (key) {
        var self = this;

        self.redisCommands.getType(key, function (err, type) {
            switch (type) {
                case 'string':
                    self.redisCommands.get(key, self.showKeyContent);
                break;

                case 'set':
                    self.redisCommands.smembers(key, self.showKeyContent);
                break;

                case 'hash':
                    self.redisCommands.hgetall(key, self.showKeyContent);
                break;
            }
        });
    },
    showKeyContent: function (err, content) {
        console.log('>', err, content);
    },
    selectWord: function (wordElement) {
        var colElements = wordElement.parentElement.querySelectorAll('.key-word');

        [].forEach.call(colElements, function(element) {
            element.classList.remove('selected');
        });

        wordElement.classList.add('selected');
    },
    scrollRight: function () {
        var scrolling = this.$['keys-container'].offsetWidth;

        // Had to setTimeout here, otherwise the scrollTo is not fired...
        setTimeout(function() {
            window.scrollTo(scrolling, 0);
        }, 0);
    }
});