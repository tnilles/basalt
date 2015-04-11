var serverConfigurationCtrl = {
    _onEnter: function() {
        var self = this;

        self.pages.selected = 1;
        console.log('enter serverConfig');

        self.createServer = function(event) {
            servers.push(event.detail);
            self.transition('serverList');
        };

        self.$serverConfiguration = document.querySelector('bslt-server-configuration');
        self.$serverConfiguration.addEventListener('add-server-configuration', self.createServer);
    },
    _onExit: function() {
        this.$serverConfiguration.removeEventListener('add-server-configuration', this.createServer);
    }
};
