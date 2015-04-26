'use strict';

Polymer({
    ready: function () {
        var self = this;

        this.$.name.addEventListener('click', function () {
            self.fire('connect', self.name);
        });

        this.$.delete.addEventListener('click', function () {
            self.fire('delete-server', self.name);
        });
    }
});