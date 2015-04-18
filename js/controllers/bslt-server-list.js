'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router');

var serverListCtrl = function() {
    console.log('loading serverListCtrl')

    var configureServer = function() {
        router.to('bslt-server-configuration');
    };

    var $serverList = document.querySelector('bslt-server-list');

    $serverList.servers = servers.fetch();

    listener.add($serverList, 'open-server-configuration', configureServer);
};

module.exports = serverListCtrl;