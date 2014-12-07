var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var FireBaseUtil = require('../utils/FireBaseUtils');
var assign = require('object-assign');
var PubNub = require('../utils/PubnubUtils');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

var question = {
        text: "",
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
        return _isHighLighted ? _highLightedText : question.text;
    },

    getHighLightedState: function () {
        return _isHighLighted;
    },

    setText: function (text) {
        question.text = text;
        this.emitChange();
    },

    getSnippetId: function () {
        return _snippetId;
    },

    getAnswers: function () {
        return question.answers;
    }

});

EditorStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case AT.SET_SNIPPET_ID:
            _snippetId = action.snippetId;
            FireBaseUtil.getMessage(_snippetId, function (data) {
                if (data && data.message) {
                    EditorStore.setText(data.message);
                }
            });
            PubNub.subscribePrivateChannel(_snippetId);
            break;

        case AT.QUESTION_FIRE:
            FireBaseUtil.putMessage(_snippetId, action.text, action.lang);
            EditorStore.emitChange();
            break;

        case AT.UPDATE_HIGHLIGHT_TEXT:
            _highLightedText = action.text;
            _isHighLighted = true;
            EditorStore.emitChange();
            break;
        case AT.ANSWER_RECEIVED:
            if (question.text == action.question) {
                var found = question.answers.filter(function (element) {
                    return element.authorUid == action.authorUid;
                });
                if (found.length) {
                    found[0].text = action.answer;
                } else {
                    question.answers.splice(0, 0, {authorUid: action.authorUid, text: action.answer});
                }
            }
            break;
        case AT.RESET_HIGHLIGHT:
            _isHighLighted = false;
            _highLightedText = '';
            EditorStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = EditorStore;
