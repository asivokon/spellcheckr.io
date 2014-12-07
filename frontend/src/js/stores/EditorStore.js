var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var FireBaseUtils = require('../utils/FireBaseUtils');
var assign = require('object-assign');
var PubNub = require('../utils/PubnubUtils');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

var editor = {
        text: '',
        questionId: null,
        questionText: '',
        detectedLanguage: null,
        answers: [] // {authorUid, text}
    },
    _isHighLighted = false,
    _highLightedText = '',
    _snippetId;

var EditorStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getText: function () {
        return _isHighLighted ? _highLightedText : editor.text;
    },

    getQuestionText: function () {
        return editor.questionText;
    },

    getQuestionId: function () {
        return editor.questionId;
    },

    setQuestion: function (id, text) {
        editor.questionId = id;
        editor.questionText = text;
        this.emitChange();
    },

    getHighLightedState: function () {
        return _isHighLighted;
    },

    setText: function (text) {
        editor.text = text;
        this.emitChange();
    },

    getSnippetId: function () {
        return _snippetId;
    },

    getAnswers: function () {
        return editor.answers;
    },

    getDetectedLanguage: function () {
        return editor.detectedLanguage;
    },

    setDetectedLanguage: function (lang) {
        editor.detectedLanguage = lang;
    }

});

EditorStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case AT.SET_SNIPPET_ID:
            _snippetId = action.snippetId;
            FireBaseUtils.getMessage(_snippetId, function (data) {
                EditorStore.setText(data && data.message || '');
            });
            PubNub.subscribePrivateChannel(_snippetId);
            break;

        case AT.QUESTION_FIRE:
            FireBaseUtils.putMessage(_snippetId, action.text, action.lang, action.authorUid);
            PubNub.publishQuestion(action.text, action.lang, _snippetId, action.authorUid);
            EditorStore.emitChange();
            break;

        case AT.UPDATE_HIGHLIGHT_TEXT:
            _highLightedText = action.text;
            _isHighLighted = true;
            EditorStore.emitChange();
            break;

        case AT.ANSWER_RECEIVED:
            if (editor.text == action.question) {
                var found = editor.answers.filter(function (element) {
                    return element.authorUid == action.authorUid;
                });
                if (found.length) {
                    found[0].text = action.answer;
                } else {
                    editor.answers.splice(0, 0, {authorUid: action.authorUid, text: action.answer});
                }
            }
            break;

        case AT.RESET_HIGHLIGHT:
            _isHighLighted = false;
            _highLightedText = '';
            EditorStore.emitChange();
            break;

        case AT.ANSWER_FIRE:
            var message = {
                question: action.question,
                answer: action.answer,
                authorUid: action.authorUid,
                snippetId: action.snippetId
            };
            FireBaseUtils.putResponse(message);
            PubNub.publishAnswer(action.snippetId, message);
            EditorStore.emitChange();
            break;

        case AT.QUESTION_SELECTED:
            EditorStore.setQuestion(action.questionId, action.question);
            break;

        case AT.QUESTION_LANGUAGE_DETECTED:
            EditorStore.setDetectedLanguage(action.lang);
            break;

        default:
        // do nothing
    }

});

module.exports = EditorStore;
