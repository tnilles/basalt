'use strict';

var _ = require('lodash');

var servers = {
    _servers: [],
    add: function (server) {
        this._servers.push(server);
        this._save();
    },
    remove: function (name) {
        _.remove(this._servers, {name: name});
        this._save();
    },
    _save: function () {
        window.localStorage.setItem('servers', JSON.stringify(this._servers));
    },
    fetch: function () {
        var servers = window.localStorage.getItem('servers');
        this._servers = servers? JSON.parse(servers) : [];
        return this._servers;
    }
};

module.exports = servers;