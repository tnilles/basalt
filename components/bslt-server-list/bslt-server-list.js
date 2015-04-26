'use strict';

Polymer({
    servers: [],
    ready: function() {
        this.$.addServer.addEventListener('click', function() {
            this.fire('open-server-configuration');
        });
    }
});