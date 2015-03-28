if (typeof define !== 'function') { var define = require('amdefine')(module); }
(function(globalScope) {
    define([], function() {
        return function(params) {
            params = params || {};
            var browser = {};
            Object.defineProperties(browser, {
                'eval': { value: evalFn, writable: true },
                getDocument: { value: getDocument, writable: true },
                getWindow: { value: getWindow, writable: true },
                readArray: { value: readArray, writable: true },
                readObject: { value: readObject, writable: true },
            });
            return browser;


            function evalFn(str) {
                try {
                    return eval(str); // jshint ignore:line
                } catch(error) {
                    var ret = { $type: 'error', data: { error: 'exception thrown', message: error && error.message }};
                    if (error.stack) { ret.stack = error.stack; }
                    return ret;
                }
            }
            function getDocument() { return globalScope.document; }
            function getWindow() { return globalScope.window; }
            function readArray() { }
            function readObject() { }
        };
    });
}(typeof(global) !== 'undefined' ? global : this));