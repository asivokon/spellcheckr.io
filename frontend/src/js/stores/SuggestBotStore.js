var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var LanguageToolUtils = require('../utils/LanguageToolUtils');
var EditorStore = require('./EditorStore');
var LangChannelStore = require('./LangChannelStore');
var assign = require('object-assign');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;


var SuggestBotStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
SuggestBotStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
        case AT.UPDATE_TEXT:
            LanguageToolUtils.sendThrottled(action.text, null, function(response){
                EditorStore.emitChange();
            });
            break;
    }
});
module.exports = SuggestBotStore;