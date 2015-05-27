'use strict';

Polymer({
    port: 6379,
    hasPassword: false,
    hasSSHKey: false,
    useTunnel: false,
    ready: function () {
    },
    resetFields: function () {
        this.name = '';
        this.host = '';
        this.port = 6379;
        this.remoteHost = '';
        this.username = '';
        this.hasPassword = false;
        this.password = '';
        this.hasSSHKey = false;
        this.privateKeyPath = null;
        this.useTunnel = false;
    },
    createServer: function () {
        var server = {};

        if (this.name && this.host) {
            server = {
                name: this.name,
                host: this.host,
                port: this.port
            };

            if (this.useTunnel) {
                server.useTunnel = this.useTunnel;
                server.tunnelOptions = {
                    host   : this.remoteHost,
                    username     : this.username,
                    password     : this.hasPassword? this.password : null,
                    privateKeyPath       : this.hasSSHKey? this.privateKeyPath : null
                };
            }

            this.$.serverService.add(server);

            this.resetFields();

            this.fire('core-signal', {name: 'switch-page', data: 0});
        }
    },
    back: function () {
        this.fire('core-signal', {name: 'switch-page', data: 0});
    },
    toggle: function () {
        this.$['advanced-options'].toggle();
    },
    setFile: function () {
        var self    = this,
            file    = this.$.sshkeyFile.files[0];

        if (file.type.match(/.*x-x509-ca-cert/)) {
            self.privateKeyPath = file.path;
        }
    }
});