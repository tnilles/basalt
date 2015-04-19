'use strict';

var RedisConnector = require('../js/service/RedisConnector'),
	should         = require('should');

describe('RedisConnector', function () {

	it('Should instanciate RedisConnector with default connection options.', function () {
		var redisConnector = RedisConnector();

		redisConnector.should.have.ownProperty('_connectionOptions');
		redisConnector._connectionOptions.host.should.be.exactly('127.0.0.1');
		redisConnector._connectionOptions.port.should.be.exactly(6379);
		should.not.exist(redisConnector._connectionOptions.password);
	});

	it('Should instanciate RedisConnector with custom connection options.', function () {
		var redisConnector = RedisConnector({host: '4.8.15.16', foo: 'bar'});

		redisConnector.should.have.ownProperty('_connectionOptions');
		redisConnector._connectionOptions.host.should.be.exactly('4.8.15.16');
		redisConnector._connectionOptions.port.should.be.exactly(6379);
		redisConnector._connectionOptions.foo.should.be.exactly('bar');
		should.not.exist(redisConnector._connectionOptions.password);
	});
});