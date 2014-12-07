var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorStore = require('./EditorStore');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

//test mock for answers
var _questions = [
    {
        text: 'question 1, lala lalal lalalla',
        id: 1
    },
    {
        text: 'question 2, lol lol o lo alala',
        id: 2
    }
];

var _lang = null;

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
        for (var i = 0; i < _questions.length; i++) {
            if (_questions[i].id == id) {
                _questions[i].text = text;
                return;
            }
        }

        _questions.push({ id: id, text: text });
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
            break;

        default:
        // do nothing
    }

});

module.exports = QuestionsStore;
