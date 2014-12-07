var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

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

var AnswersStore = assign({}, EventEmitter.prototype, {

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
    }

});

AnswersStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {

        //TODO: update answers

        default:
        // do nothing
    }

});

module.exports = AnswersStore;