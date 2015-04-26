'use strict';

var servers = require('./js/service/servers');

Polymer({
    servers: [],
    ready: function () {
        console.log('loading serverListCtrl');

        this.servers = servers.fetch();
    },
    configureServer: function () {
        //router.to('bslt-server-configuration');
    },
    deleteServer: function (event) {
        servers.remove(event.detail);
    },
    connect: function () {
        //router.to('bslt-keys-explorer');
    }
});