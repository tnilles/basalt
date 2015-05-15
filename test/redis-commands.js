'use strict';

var RedisCommands = require('../js/service/redis-commands'),
    should         = require('should');

describe('RedisCommands', function () {

    // TODO: fix RedisCommands to fit these tests
    describe('To tree', function () {

        var redisCommands = new RedisCommands();

        it('Should convert basic keys to a tree', function () {
            var keys = [
                'abc:xyz',
                'abc:ijk',
                'lmn:opq'
            ];

            var tree = redisCommands.toTree(keys);

            tree.should.have.ownProperty('abc');
            tree.should.have.ownProperty('lmn');

            tree.abc.should.have.ownProperty('isLeaf');
            tree.abc.should.have.ownProperty('children');

            tree.abc.isLeaf.should.not.be.ok;
        });

        it('Should mark some nodes as leaves', function () {
            var keys = [
                'abc',
                'abc:xyz',
                'abc:ijk',
                'abc:ijk:lmn',
                'lmn:opq'
            ];

            var tree = redisCommands.toTree(keys);

            tree.abc.isLeaf.should.be.ok;
            tree.abc.children.xyz.isLeaf.should.be.ok;
            tree.abc.children.ijk.isLeaf.should.be.ok;
            tree.abc.children.ijk.children.lmn.isLeaf.should.be.ok;
            tree.lmn.isLeaf.should.not.be.ok;
            tree.lmn.children.opq.isLeaf.should.be.ok;
        });

    });

});