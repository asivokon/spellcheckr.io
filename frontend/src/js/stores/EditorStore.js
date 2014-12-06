var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var FireBaseUtil = require('../utils/FireBaseUtils');
var assign = require('object-assign');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

var _text = '',
    _pubNubText = '',
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
        return _text;
    },

    setText: function (text) {
        _text = text;
        this.emitChange();
    },

    getPubnubText: function () {
        return _pubNubText;
    },

    getSnippetId: function() {
        return _snippetId;
    }

});

EditorStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case AT.SET_SNIPPET_ID:
            _snippetId = action.snippetId;
            FireBaseUtil.getMessage(_snippetId, function (data) {
                console.log(data);
                if (data && data.message) {
                    EditorStore.setText(data.message);
                }
            });
            break;
        case AT.UPDATE_TEXT:
            _text = action.text;
            FireBaseUtil.putMessage(_snippetId, action.text);
            EditorStore.emitChange();
            break;

        case AT.PUBNUB_UPDATE:
            _pubNubText = action.text;
            EditorStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = EditorStore;
