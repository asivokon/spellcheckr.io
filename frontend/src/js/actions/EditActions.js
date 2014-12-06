var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');
var LangChannelStore = require('../stores/LangChannelStore');

var AT = Constants.ActionTypes;

module.exports = {

    updateText: function (text) {
        Dispatcher.handleViewAction({
            type: AT.UPDATE_TEXT,
            text: text
        });
        PubnubUtils.publish(text, LangChannelStore.getChannelLang(), "snippetId");  // FIXME: real snippetId
    }

};
