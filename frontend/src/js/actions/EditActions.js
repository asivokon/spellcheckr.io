var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');
var LangChannelStore = require('../stores/LangChannelStore');

var AT = Constants.ActionTypes;

module.exports = {

    fireQuestion: function (text, snippetId) {
        var lang = LangChannelStore.getChannelLang();
        Dispatcher.handleViewAction({
            type: AT.QUESTION_FIRE,
            text: text,
            snippetId: snippetId,
            lang: lang
        });
        PubnubUtils.publish(text, lang, snippetId);
    },

    updateHighLightText: function (text) {
        Dispatcher.handleViewAction({
            type: AT.UPDATE_HIGHLIGHT_TEXT,
            text: text
        });
    },

    resetHighLight: function (state) {
        Dispatcher.handleViewAction({
            type: AT.RESET_HIGHLIGHT,
            state: state
        });
    }

};
