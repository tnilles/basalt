'use strict';

var _ = require('lodash'),
    listener = require('./listener');

/**
 * A basic router working with polymer's core-pages element
 *
 * @param {object} options
 *  - corePages: the core-pages html element to base our routing to
 *
 */
var Router = function(options) {
    if (!(this instanceof Router)) {
        return new Router(options);
    }

    this._pages = [];
};

Router.prototype.init = function(options) {
    if (!options.corePages || !(_.isElement(options.corePages))) {
        throw new Error('Router constructor is missing the corePages option');
    }

    this._corePages = options.corePages;
    this._setPagesList(this._corePages);
};

Router.prototype._setPagesList = function(corePages) {
    var self = this,
        corePagesChildren = this._corePages.children,
        pageName;

    for (var i = 0, n = corePagesChildren.length; i < n; i++) {
        pageName = corePagesChildren[i].tagName.toLowerCase();

        self._pages.push({
            name: pageName,
            controller: self._importController(pageName),
            index: i
        });
    }
};

Router.prototype._importController = function(ctrlName) {
    return require('../controllers/' + _.kebabCase(ctrlName));
};

Router.prototype.to = function(pageName) {
    var page = _.find(this._pages, 'name', pageName);

    listener.removeAll();

    this._corePages.selected = page.index;

    page.controller();
};

module.exports = new Router();
