'use strict';

var servers = require('./js/service/servers');

Polymer({
    port: 6379,
    ready: function () {
        console.log('loading serverConfigurationCtrl');
    },
    createServer: function () {
        servers.add({
            name: this.name,
            host: this.host,
            port: this.port
        });

        this.name = '';
        this.host = '';
        this.port = 6379;

        //router.to('bslt-server-list');
    },
    back: function () {
        //router.to('bslt-server-list');
    }
});