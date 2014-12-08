var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorStore = require('./EditorStore');
var FireBaseUtils = require('../utils/FireBaseUtils');
var ApiActions = require('../actions/ApiActions');
var Settings = require('../utils/Settings');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

//test mock for answers
var _questions = [], // {text, id, author}
    _lang = null;

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

    updateOrCreateQuestion: function (id, text, author, date) {
        var filtered = _questions.filter(function (item) {
            return item.id == id;
        });
        if (filtered.length > 0) {
            filtered[0].text = text;
        } else {
            _questions.splice(0, 0, {id: id, text: text, author: author, date: date});
        }
        if (_questions.length > Settings.questionsViewLimit) {
            _questions.splice(Settings.questionsViewLimit, _questions.length - Settings.questionsViewLimit);
        }
    },

    setQuestionsLanguage: function (lang) {
        _lang = lang;
    },

    getQuestionsLanguage: function () {
        return _lang;
    },

    setTypingNotify: function (questionId, isTyping) {
        _questions.forEach(function (q) {
            if (q.id == questionId) {
                q.isTyping = isTyping;
            }
        });
    }


});

QuestionsStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {

        case AT.QUESTION_RECEIVED:
            if (action.snippetId != EditorStore.getSnippetId()) {
                QuestionsStore.updateOrCreateQuestion(action.snippetId, action.text, action.authorUid, action.date);
                QuestionsStore.emitChange();
            }
            break;

        case AT.SET_PRIMARY_LANGUAGE:
            QuestionsStore.setQuestionsLanguage(action.lang);
            QuestionsStore.emitChange();

            FireBaseUtils.getMessagesByLang(action.lang, function (questions) {
                questions.forEach(function (q) {
                    ApiActions.questionReceived(q.id, q.text, q.author, q.date);
                });
            });
            break;

        case AT.QUESTION_TYPING_NOTIFY:
            QuestionsStore.setTypingNotify(action.questionId, action.isTyping);
            QuestionsStore.emitChange();
            break;


        default:
        // do nothing
    }

});

module.exports = QuestionsStore;
