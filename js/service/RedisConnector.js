'use strict';

var _            = require('lodash'),
	EventEmitter = require('events').EventEmitter,
	fs			 = require('fs'),
	redis        = require('redis'),
	tunnelSSH    = require('tunnel-ssh'),
	util         = require('util');

var DEFAULT_CONFIG = {
	host: '127.0.0.1',
	port: 6379,
	password: null
};

/**
 * [RedisConnector description]
 * @param {[type]} connectionOptions [description]
 */
var RedisConnector = function (connectionOptions) {
	var self = this;

	if (!(self instanceof RedisConnector)) {
		return new RedisConnector(connectionOptions);
	}

	self._connectionOptions = _.defaults(connectionOptions || {}, DEFAULT_CONFIG);

	if (self._connectionOptions.hasOwnProperty('tunnelOptions')) {
		var tunnelOptions = {
			host: self._connectionOptions.tunnelOptions.host,
			dstHost: self._connectionOptions.host,
			dstPort: self._connectionOptions.port,
			username: self._connectionOptions.tunnelOptions.username,
			password: self._connectionOptions.tunnelOptions.password || null,
			privateKeyPath: self._connectionOptions.tunnelOptions.privateKeyPath || null
		};

		if (!self._connectionOptions.tunnelOptions.password && !self._connectionOptions.tunnelOptions.privateKeyPath) {
			self.emit('error', new Error('No identification method is provided.'));
		}

		if (self._connectionOptions.tunnelOptions.password) {
			self.emit('_key-ready');
		} else {
			fs.readFile(tunnelOptions.privateKeyPath, function (err, data) {
				if (err) {
					self.emit('error', err);
					return;
				}

				if (!data) {
					self.emit('error', new Error('Unable to find the key with path [' + tunnelOptions.privateKeyPath + ']'));
					return;
				}

				tunnelOptions.privateKey = data;
				self.emit('_key-ready');
			});
		}

		self.on('_key-ready', function () {
			self._tunnel = tunnelSSH(tunnelOptions, function (err) {
				if (err) {
					self.emit('error', err);
					return;
				}

				self.emit('_config-ready');	
			});
		});
	} else {
		self.emit('_config-ready');
	}

	self.on('_config-ready', function () {
		if (self._tunnel) {
			self._client = redis.createClient(self._tunnel, {auth_pass: self._connectionOptions.password});
		} else {
			self._client = redis.createClient(self._connectionOptions.port, self._connectionOptions.host, {auth_pass: self._connectionOptions.password});
		}

		self._client.on('error', function (err) {
			self.emit('error', err);
		});

		self._client.on('ready', function () {
			self.emit('ready', self._client);
		});
	});
};

util.inherits(RedisConnector, EventEmitter);

/**
 * [getConnection description]
 * @return {[type]} [description]
 */
RedisConnector.prototype.getConnection = function () {
	return this._client;
};


module.exports = RedisConnector;