'use strict';

var gui = require('nw.gui');
var win = gui.Window.get(),
    nativeMenuBar = new gui.Menu({
        type: 'menubar'
    });

if (process.platform === 'darwin') {
    nativeMenuBar.createMacBuiltin('Basalt');
}

win.menu = nativeMenuBar;

global.document = document;
global.window = window;

var router = require('./js/service/router.js'),
    rootCtrl = require('./js/controllers/root');

router.init({
    corePages: document.querySelector('core-pages')
});

rootCtrl();