'use strict';

var servers = require('../service/servers'),
    router = require('../service/router');

var rootCtrl = function() {

    // If there already are some servers saved
    var plop = servers.fetch()
    if (plop) {
        router.to('bslt-server-list');
    } else {
        router.to('bslt-server-configuration');
    }

};

module.exports = rootCtrl;
