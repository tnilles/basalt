'use strict';

var _ = require('lodash');

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

    if (!options.corePages || !(_.isElement(options.corePages))) {
        throw new Error('Router constructor is missing the corePages option');
    }

    this._corePages = options.corePages;
    this._pages = [];

    this._setPagesList(this._corePages);
};

Router.prototype._setPagesList = function(corePages) {
    var self = this,
        corePagesChildren = this._corePages.children;

    for (var i = 0, n = corePagesChildren.length; i < n; i++) {
        self._pages.push({
            name: corePagesChildren[i].tagName,
            index: i
        });
    }
};

Router.prototype.to = function(pageName) {
    this._corePages.selected = _.result(_.find(this._pages, 'name', pageName.toUpperCase()), 'index');
};

module.exports = Router;
