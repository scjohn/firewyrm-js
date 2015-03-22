if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./deferred', '../spec/helpers/clock'], function(Deferred, clock) {
    var id = 0;
    var MockWyrmHole = function() {
        var self = this;
        self.spawnId = id++;

        self.lastMessage = {
            respond: function() {}
        };

        self.sendMessage = function(msg, cb) {
            self.lastMessage = {
                args: msg,
                cb: cb,
                respond: function() {
                    cb.apply(null, arguments);
                    clock.flush(); // process any resulting promises / timeouts if our mock clock is installed
                }
            };
        };
    };

    return MockWyrmHole;
});
