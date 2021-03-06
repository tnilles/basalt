'use strict';

var RedisConnector  = require('./js/service/redis-connector'),
    RedisCommands   = require('./js/service/redis-commands'),
    _               = require('lodash');

Polymer({
    server: {},
    currentKey: [],
    keyContent: {},
	keys: {},
    path: [],
    redisCommands: {},
    redisConnector: {},
    error: '',
    loading: false,
    serverChanged: function () {
        var self    = this,
            server  = {};

        if (self.server && Object.keys(self.server).length) {
            self.loading = true;

            server = {
                host: self.server.host,
                port: self.server.port
            };

            if (self.server.useTunnel) {
                server.dstHost = self.server.host;
                server.tunnelOptions = self.server.tunnelOptions;
            }

            self.redisConnector = new RedisConnector(server);

            self.redisConnector.on('error', function (error) {
                self.loading = false;
                self.error = 'Could not connect to this server. Please check your configuration and try again.';
                self.redisConnector.end();
            });

            self.redisConnector.on('ready', function () {
                self.loading = false;
                console.log('Connection ready!');
            });

            self.initKeys();
        }
    },
    initKeys: function () {
        var self = this;

        self.redisConnector.on('ready', function (client) {
            self.loading = true;

            self.redisCommands = new RedisCommands(client);

            self.redisCommands.fetchKeys(function (err, replies) {
                self.loading = false;
                console.log('Keys fetched!');
                self.setKeys(replies);
            });

            client.on('error', function (err) {
                self.loading = false;
                console.log('Error ', err);
            });
        });
    },
    selectDB: function (event) {
        var self = this,
            client = self.redisConnector.getConnection();

        this.keyContent = {};
        this.keyType = '';

        client.select(event.detail, function () {
            console.log('DB selected');
            self.loading = true;
            self.redisCommands.fetchKeys(function (err, replies) {
                console.log('Keys fetched');
                self.loading = false;
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

        if (this.path[this.path.length - 1] && this.path[this.path.length - 1].children[word]) {
            this.currentKey = this.currentKey.slice(0, col);
            this.currentKey.push(word);

            nextPath = this.path[this.path.length - 1].children[word];

            if (!nextPath.isLeaf || Object.keys(nextPath.children).length) {
                this.path.push(nextPath);
                this.scrollRight();
            }

            if (nextPath.isLeaf) {
                this.openKey(this.currentKey.join(':'));
            }
        }
    },
    openKey: function (key) {
        var self = this;

        self.redisCommands.getType(key, function (err, type) {
            self.redisCommands['get' + _.capitalize(type)](key, function (err, content) {
                self.showKeyContent(err, content, type);
            });
        });
    },
    showKeyContent: function (err, content, type) {
        this.keyContent = content;
        this.keyType = type;
    },
    selectWord: function (wordElement) {
        var colElements = wordElement.parentElement.querySelectorAll('.key-word');

        [].forEach.call(colElements, function(element) {
            element.classList.remove('selected');
        });

        wordElement.classList.add('selected');

        this.keyContent = {};
        this.keyType = '';
    },
    scrollRight: function () {
        var scrolling = this.$['keys-container'].offsetWidth;

        // Had to setTimeout here, otherwise the scrollTo is not fired...
        setTimeout(function() {
            window.scrollTo(scrolling, 0);
        }, 0);
    },
    reset: function () {
        var self = this;

        self.error = '';
        self.server = {};
        self.currentKey = [];
        self.keyContent = null;
        self.keys = {};
        self.path = [];
        self.redisCommands = {};
        self.redisConnector = {};
    }
});