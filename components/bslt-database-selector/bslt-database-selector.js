'use strict';

Polymer({
    databases: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    selectDB: function (event, detail, sender) {
        var dbs = sender.parentElement.querySelectorAll('li');

        [].forEach.call(dbs, function(element) {
            element.classList.remove('selected');
        });

        sender.classList.add('selected');

        this.fire('select-database', sender.getAttribute('data-database'));
    },
    toServerList: function () {
        this.fire('to-server-configuration');
        this.fire('core-signal', {name: 'switch-page', data: 0});
    }
});