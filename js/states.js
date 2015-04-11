var machina = require('machina');

var fsm = new machina.Fsm({
    initialize: function(pages) {
        this.pages = pages;
    },
    namespace: 'basalt',
    initialState: 'uninitialized',
    states: {
        uninitialized: {
            _onEnter: function(options) {
                console.log('some init...', options);
                this.transition('serverConfiguration');
            }
        },
        serverConfiguration: serverConfigurationCtrl,
        serverList: serverListCtrl,
        keysFinder: {}
    },

});
