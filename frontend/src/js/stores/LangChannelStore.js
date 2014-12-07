var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorStore = require("./EditorStore");

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

/* Each snippet is the structure:
 *
 * {
 *   snippetId: string,
 *   text:      string
 * }
 */
var _snippets = [],     // Snippets of the channel
    _lang = '';         // Channel's language

var LangChannelStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getSnippets: function () {
        return _snippets;
    },

    getChannelLang: function () {
        return _lang;
    },

    setChannelLag: function (lang) {
        _lang = lang;
    },
});

LangChannelStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        default:
        // do nothing
    }

});

module.exports = LangChannelStore;

