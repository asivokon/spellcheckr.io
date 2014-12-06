var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');


var AT = Constants.ActionTypes;

module.exports = {

    /* Current snippet ID changed/assigned. */
    setSnippetId: function (snippetId) {
        Dispatcher.handleViewAction({
            type: AT.SET_SNIPPET_ID,
            snippetId: snippetId
        });
    },

    setPrimaryLanguage: function (lang) {
        Dispatcher.handleViewAction({
            type: AT.SET_PRIMARY_LANGUAGE,
            lang: lang
        });
        //PubnubUtils.subscribeLangChannel(lang);
    },

    setSecondaryLanguage: function (lang) {
        Dispatcher.handleViewAction({
            type: AT.SET_SECONDARY_LANGUAGE,
            lang: lang
        });
    }

};