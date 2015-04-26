'use strict';

(function () {
    var _ = require('lodash');

    var _servers = [];

    Polymer({
        add: function (server) {
            _servers.push(server);
            this._save();
        },
        remove: function (name) {
            _.remove(_servers, {name: name});
            this._save();
        },
        fetch: function () {
            var servers = window.localStorage.getItem('servers');
            _servers = servers? JSON.parse(servers) : [];
            return _servers;
        },
        _save: function () {
            window.localStorage.setItem('servers', JSON.stringify(_servers));
            this.fire('core-signal', {name: 'servers-changed'});
        }
    });
})();

