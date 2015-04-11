var serverListCtrl = {
    _onEnter: function() {
        var self = this;

        self.pages.selected = 0;
        console.log('enter serverList');

        self.openServerConfig = function() {
            self.transition('serverConfiguration');
        };

        self.$serverList = document.querySelector('bslt-server-list');
        self.$serverList.addEventListener('open-server-configuration', self.openServerConfig);
    },
    _onExit: function() {
        this.$serverList.removeEventListener('open-server-configuration', this.openServerConfig);
    }
};
