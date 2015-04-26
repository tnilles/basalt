'use strict';


Polymer({
    port: 6379,
    ready: function () {
        console.log('loading serverConfigurationCtrl');
    },
    createServer: function () {
        if (this.name) {
            this.$.serverService.add({
                name: this.name,
                host: this.host,
                port: this.port
            });

            this.name = '';
            this.host = '';
            this.port = 6379;

            this.fire('core-signal', {name: 'switch-page', data: 0});
        }
    },
    back: function () {
        this.fire('core-signal', {name: 'switch-page', data: 0});
    }
});