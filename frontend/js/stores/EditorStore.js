var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

var _text = '';

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
        return _text;
    }

});

EditorStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch(action.type) {

        case AT.UPDATE_TEXT:
            _text = action.text;
            EditorStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = EditorStore;
