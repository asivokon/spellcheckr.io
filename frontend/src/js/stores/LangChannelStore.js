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

    getChannelLang: function () {
        return _lang;
    },

    setChannelLag: function (lang) {
        _lang = lang;
    },

    updateOrCreateSnipet: function (snippetId, text) {
      for (var i = 0; i < _snippets.length; i++) {
        if (_snippets[i].snippetId == snippetId) {
          _snippets[i].text = text;
          return;
        }
      }

      _snippets.push({
        snippetId: snippetId,
        text: text
      });
    }

});

LangChannelStore.dispatchToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    switch(action.type) {

        case AT.LANG_CHANNEL_UPDATE:
            LangChannelStore.updateOrCreateSnipet(action.snippetId, action.text);
            LangChannelStore.emitChange();
            break;

        case AT.SET_PRIMARY_LANGUAGE:
            LangChannelStore.setChannelLag(action.lang);
            LangChannelStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = LangChannelStore;

