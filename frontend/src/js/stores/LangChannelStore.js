var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var lodash = require('lodash');

var AT = Constants.ActionTypes,
    CHANGE_EVENT = Constants.Events.CHANGE;

/* Each snippet is the structure:
 *
 * {
 *   snippetId: string,
 *   text:      string
 * }
 */
var _snippets = [],     // Snippets of the channel
    _lang = "";         // Channel's language

var LangChannelStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getSnippets: function () {
        return _snippets;
    },

    updateOrCreateSnipet: function (snippetId, text) {
      var existing = _.find(_snippets, {'snippetId' : snippetId});
      if (existing) {
        existing.text = text;
      } else {
        _snippets.push({
          snippetId: snippetId,
          text: text
        });
      }
    }

});

EditorStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch(action.type) {

        case AT.LANG_CHANNEL_UPDATE:
            this.updateOrCreateSnipet(action.snippetId, action.text);
            EditorStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = EditorStore;
