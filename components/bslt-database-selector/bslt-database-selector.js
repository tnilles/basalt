'use strict';

Polymer({
    databases: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    selectDB: function(event, detail, sender) {
        this.fire('select-database', sender.getAttribute('data-database'));
    }
});