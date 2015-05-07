'use strict';

var _ = require('lodash');

Polymer({
    servers: [],
    ready: function () {
        this.serverService = this.$.serverService;

        this.fetchServers();
    },
    configureServer: function () {
        this.fire('core-signal', {name: 'switch-page', data: 1});
    },
    deleteServer: function (event) {
        this.serverService.remove(event.detail);
    },
    connect: function (event, detail) {
        var server = _.find(this.servers, 'name', detail);

        this.fire('core-signal', {name: 'change-server', data: server});
        this.fire('core-signal', {name: 'switch-page', data: 2});
    },
    fetchServers: function () {
        this.servers = this.serverService.fetch();
    }
});