'use strict';

var servers = {
    _servers: [],
    add: function(server) {
        this._servers.push(server);
        window.localStorage.setItem('servers', JSON.stringify(this._servers));
    },
    fetch: function() {
        var servers = window.localStorage.getItem('servers');
        this._servers = servers? JSON.parse(servers) : [];
        return this._servers;
    }
};


module.exports = servers;
