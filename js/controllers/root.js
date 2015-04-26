'use strict';

var Servers = require('../service/servers'),
	router  = require('../service/router');

var rootCtrl = function () {
    var servers = Servers.fetch();

    if (servers) {
        router.to('bslt-server-list');
    } else {
        router.to('bslt-server-configuration');
    }
};

module.exports = rootCtrl;