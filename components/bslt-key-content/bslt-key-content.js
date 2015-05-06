'use strict';

Polymer({
    content: {},
    type: '',
    ready: function () {
        console.log('content!')
    },
    contentChanged: function () {
        console.log(this.content, ' changed!')
    },
    typeChanged: function () {
        console.log(this.type, ' changed...')
    },
    getKeys: function (o) {
        return Object.keys(o);
    }
});