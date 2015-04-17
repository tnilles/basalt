'use strict';

var _ = require('lodash');

/**
 * A singleton object to manage application-wide event listeners
 */
var Listener = function() {
    this._listeners = [];
};

Listener.prototype.add = function(element, type, fn) {
    if (!_.isElement(element)) {
        throw new Error('Can\'t add an event listener on ', element);
    }

    if (!_.isString(type)) {
        throw new Error('Event should be a string');
    }

    if (!_.isFunction(fn)) {
        throw new Error('Callback function needed');
    }

    element.addEventListener(type, fn);

    this._listeners.push({
        listener: fn,
        element: element,
        type: type
    });
};

Listener.prototype.remove = function(element, type, listener) {
    var removed = _.remove(this._listeners, {
        listener: listener,
        element: element,
        type: type
    });

    if (removed) {
        element.removeEventListener(type, listener);
    }
};

Listener.prototype.removeAll = function() {
    var l;

    while (l = this._listeners.pop()) {
        this.remove(l.element, l.type, l.listener);
    }
};


module.exports = new Listener();
