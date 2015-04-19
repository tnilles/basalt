'use strict';

var listener = require('../service/listener'),
    servers = require('../service/servers'),
    router = require('../service/router');

var serverConfigurationCtrl = function() {
    console.log('loading serverConfigurationCtrl')

    var createServer = function(event) {
        servers.add(event.detail);
        router.to('bslt-server-list');
    };

    var back = function() {
        router.to('bslt-server-list');
    };

    var $serverConfiguration = document.querySelector('bslt-server-configuration');


    listener.add($serverConfiguration, 'add-server-configuration', createServer);
    listener.add($serverConfiguration, 'go-back', back);
};

module.exports = serverConfigurationCtrl;
