'use strict';

Polymer({
    port: 6379,
    ready: function() {
        var self = this;

        self.$.addServer.addEventListener('click', function() {
            self.fire('add-server-configuration', {
                name: self.name,
                host: self.host,
                port: self.port
            });

            self.name = '';
            self.host = '';
            self.port = 6379;
        });

        self.$.back.addEventListener('click', function() {
            self.fire('go-back');
        });
    }
});