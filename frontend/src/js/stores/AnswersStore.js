var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Pubnub = require('../utils/PubnubUtils');
var Firebase = require('../utils/FireBaseUtils');
var EditorStore = require('../stores/EditorStore');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

//test mock for answers
var _answers = [
    {
        text: 'answer 1, lalala lalal lalalla',
        id: 1
    },
    {
        text: 'answer 2, llolo lol o lo alala',
        id: 2
    }
];

var AnswerStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAnswers: function () {
        return _answers;
    },

    setAnswers: function (answers) {
        _answers = answers;
    }

});

AnswerStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case AT.ANSWER_FIRE:
            var message = {
                question: action.question,
                answer: action.answer,
                authorUid: action.authorUid,
                snippetId: action.snippetId
            };
            Firebase.putResponse(message.snippetId, message);
            Pubnub.publishAnswer(action.snippetId, message);
            //update textarea text...
            EditorStore.setQuestion(action.snippetId, action.answer);
            AnswerStore.emitChange();
            console.log("Answer send to: ", action.snippetId);
            break;

        default:
        // do nothing
    }

});

module.exports = AnswerStore;

