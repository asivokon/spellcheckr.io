var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorStore = require('./EditorStore');
var FireBaseUtils = require('../utils/FireBaseUtils');
var ApiActions = require('../actions/ApiActions');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

//test mock for answers
var _questions = [], // {text, id}
    lang = null;

var QuestionsStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getQuestions: function () {
        return _questions;
    },

    updateOrCreateQuestion: function (id, text) {
        var filtered = _questions.filter(function (item) {
            return item.id == id;
        });
        if (filtered.length > 0) {
            filtered[0].text = text;
        } else {
            _questions.splice(0, 0, {id: id, text: text});
        }
    },

    setQuestionsLanguage: function (lang) {
        _lang = lang;
    },

    getQuestionsLanguage: function () {
        return _lang;
    }


});

QuestionsStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {

        case AT.QUESTION_RECEIVED:
            if (action.snippetId != EditorStore.getSnippetId()) {
                QuestionsStore.updateOrCreateQuestion(action.snippetId, action.text);
                QuestionsStore.emitChange();
            }
            break;

        case AT.SET_PRIMARY_LANGUAGE:
            QuestionsStore.setQuestionsLanguage(action.lang);
            QuestionsStore.emitChange();

            FireBaseUtils.getMessagesByLang(action.lang, function (questions) {
                questions.forEach(function (q) {
                    // TODO: pass more (like date)
                    ApiActions.questionReceived(q.id, q.text);
                });
            });

            break;

        default:
        // do nothing
    }

});

module.exports = QuestionsStore;
