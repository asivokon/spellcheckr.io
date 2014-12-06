var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    suggestRequest: function (text) {
        Dispatcher.handleViewAction({
            type: AT.SUGGEST_REQUEST,
            text: text
        });
    },

    langChannelUpdate: function (lang, snippetId, text) {
        Dispatcher.handleViewAction({
            type: AT.LANG_CHANNEL_UPDATE,
            snippetId: snippetId,
            text: text,
            lang: lang
        });
    }

};
