var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;
/*
* App have 2 states:
*  0 - Question state (default)
*  1 - Answer state
* */
var _appState = Constants.AppState.QUESTION_STATE,
    _primaryLang = 'eng'; // TODO: this is mocked

var AppStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAppState: function () {
        return _appState;
    },

    getPrimaryLang: function () {
        return _primaryLang;
    },

    setPrimaryLang: function (lang) {
        _primaryLang = lang;
    }

});

AppStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {

        case AT.CHANGE_APP_STATE:
            _appState = action.state;
            AppStore.emitChange();
            break;

        case AT.SET_PRIMARY_LANGUAGE:
            AppStore.setPrimaryLang(action.lang);
            AppStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = AppStore;
