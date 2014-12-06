var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var FireBaseUtil = require('../utils/FireBaseUtils');
var assign = require('object-assign');
var EditorStore = require('../stores/EditorStore');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE,
    snippetId = null,
    FireBaseStore = assign({}, EventEmitter.prototype, {

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

FireBaseStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
        case AT.SET_SNIPPET_ID:
            snippetId = action.snippetId;
            FireBaseUtil.getMessage(snippetId, function (data) {
                console.log(data);
                if (data && data.message) {
                    EditorStore.setText(data.message);
                }
            });
            break;
        case AT.UPDATE_TEXT:
            FireBaseUtil.putMessage(snippetId, action.text);
            break;
        default:
    }

});

module.exports = FireBaseStore;


