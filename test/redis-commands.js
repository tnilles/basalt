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

            tree.should.have.ownProperty('isLeaf');
            tree.should.have.ownProperty('children');

            tree.children.should.have.ownProperty('abc');
            tree.children.should.have.ownProperty('lmn');
            tree.isLeaf.should.not.be.ok;
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

            tree.isLeaf.should.not.be.ok;
            tree.children.abc.isLeaf.should.be.ok;
            tree.children.abc.children.xyz.isLeaf.should.be.ok;
            tree.children.abc.children.ijk.isLeaf.should.be.ok;
            tree.children.abc.children.ijk.children.lmn.isLeaf.should.be.ok;
            tree.children.lmn.isLeaf.should.not.be.ok;
            tree.children.lmn.children.opq.isLeaf.should.be.ok;
        });

    });

});