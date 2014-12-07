var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var LanguageToolUtils = require('../utils/LanguageToolUtils');
var LanguageDetectionUtils = require('../utils/LanguageDetectionUtils');
var EditorStore = require('./EditorStore');
var assign = require('object-assign');
var ApiActions = require('../actions/ApiActions');

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
        case AT.QUESTION_FIRE:
            LanguageToolUtils.sendThrottled(action.text, null, function (response) {
                ApiActions.fireAnswer(action.text, response, action.snippetId, "Smarty R2D2");
                EditorStore.emitChange();
            });
            LanguageDetectionUtils.sendThrottled(action.text, function(lang) {
                ApiActions.fireLanguageDetected(action.text, action.snippetId, lang);
                EditorStore.emitChange();
            });
            break;
    }
});
module.exports = SuggestBotStore;