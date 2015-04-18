'use strict';

var servers = require('../service/servers'),
    router = require('../service/router');

var rootCtrl = function() {

    console.log('router=', router)

    // If there already are some servers saved
    var plop = servers.fetch()
    if (plop) {
        console.log('plop:', plop)
        router.to('bslt-server-list');
    } else {
        console.log('no plop :(')
        router.to('bslt-server-configuration');
    }

};

module.exports = rootCtrl;
