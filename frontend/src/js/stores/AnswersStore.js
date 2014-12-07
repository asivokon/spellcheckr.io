var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Pubnub = require('../utils/PubnubUtils');
var Firebase = require('../utils/FireBaseUtils');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

var AnswersStore = assign({}, EventEmitter.prototype, {

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

AnswersStore.dispatchToken = Dispatcher.register(function (payload) {
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
            AnswersStore.emitChange();
            console.log("Answer send to: ", action.snippetId);
            break;

        default:
        // do nothing
    }

});

module.exports = AnswersStore;
