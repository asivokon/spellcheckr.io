var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');
var LangChannelStore = require('../stores/LangChannelStore');

var AT = Constants.ActionTypes;

module.exports = {

    fireQuestion: function (text, snippetId) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_FIRED,
            text: text,
            snippetId: snippetId
        });
        PubnubUtils.publish(text, LangChannelStore.getChannelLang(), snippetId);
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
