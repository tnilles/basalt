// Copy paste for OSX
// initialize window menu
var gui = require('nw.gui');
var win = gui.Window.get(),
    nativeMenuBar = new gui.Menu({
        type: "menubar"
    });

var RedisConnector = require('./js/service/RedisConnector.js');

// check operating system for the menu
if (process.platform === "darwin") {
    nativeMenuBar.createMacBuiltin("Your App Name");
}

// actually assign menu to window
win.menu = nativeMenuBar;
// Copy paste for OSX


var client;

var redisConnector = RedisConnector();
redisConnector.on('ready', function (_client) {
    client = _client;
    
    client.on("error", function (err) {
        console.log("Error " + err);
    });
});


function doYourThings() {
    var fragment = document.createDocumentFragment();

    keys.innerHTML = '';

    client.keys('*', function(err, replies) {
        replies.forEach(function(key) {

            // Attempt to get
            client.get(key, function(err, replies) {
                var li = document.createElement('li');

                if (err) {
                    // Try to hgetall
                    client.hgetall(key, function(err, replies) {
                        if (err) {
                            li.innerHTML = key;
                        } else {
                            li.innerHTML = key + ' > ' + JSON.stringify(replies);
                        }
                    });

                } else {
                    li.innerHTML = key + ' > ' + JSON.stringify(replies);
                }

                fragment.appendChild(li);
                keys.appendChild(fragment);
            });


        });
    });
    /*client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
        client.quit();
    });*/
}


// Event handlers

var databases = document.querySelectorAll('#databases li'),
    currentDB = document.getElementById('currentDB'),
    keys = document.getElementById('keys'),
    flushdb = document.getElementById('flushdb'),
    reload = document.getElementById('reload');
/*
reload.addEventListener('click', function() {
    doYourThings();
});

flushdb.addEventListener('click', function() {
    client.flushdb();
    doYourThings();
});
*/

Array.prototype.forEach.call(databases, function(database) {
    database.addEventListener('click', function(event) {
        var db = parseInt(event.target.innerHTML, 10);
        client.select(db, function() {
            doYourThings();
            resetActive();
            event.target.classList.add('active');
        });
    });
});

function resetActive() {
    var actives = document.querySelectorAll('.active');

    Array.prototype.forEach.call(actives, function(active) {
        active.classList.remove('active');
    });
}
