var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

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
    }

});

QuestionsStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {

        //TODO: update questions

        default:
        // do nothing
    }

});

module.exports = QuestionsStore;