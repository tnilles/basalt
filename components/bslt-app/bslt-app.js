'use strict';

var gui = require('nw.gui'),
    win = gui.Window.get(),
    nativeMenuBar = new gui.Menu({
        type: 'menubar'
    });

if (process.platform === 'darwin') {
    nativeMenuBar.createMacBuiltin('Basalt');
}

win.menu = nativeMenuBar;

Polymer({
    pages: {},
    server: {},
    ready: function() {
        this.pages = this.$.pages;
        var serverService = this.$.serverService;

        if (serverService.fetch()) {
            this.switchPage(null, 0); // server-list
        } else {
            this.switchPage(null, 1); // server-configuration
        }
        
    },
    switchPage: function (event, detail, sender) {
        this.pages.selected = detail;
    },
    changeServer: function (event, detail, sender) {
        this.server = detail;
    }
});