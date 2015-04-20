'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router');

var serverListCtrl = function() {
    console.log('loading serverListCtrl')

    var configureServer = function() {
        router.to('bslt-server-configuration');
    };

    var deleteServer = function(event) {
        servers.remove(event.detail);
    };

    var connect = function(event) {
        router.to('bslt-keys-explorer');
    };

    var $serverList = document.querySelector('bslt-server-list');

    $serverList.servers = servers.fetch();

    listener.add($serverList, 'open-server-configuration', configureServer);
    listener.add($serverList, 'delete-server', deleteServer);
    listener.add($serverList, 'connect', connect);
};

module.exports = serverListCtrl;
