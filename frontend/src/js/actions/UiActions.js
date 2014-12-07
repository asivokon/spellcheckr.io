var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');
var FireBaseUtils = require('../utils/FireBaseUtils');
var ApiActions = require('./ApiActions');


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
        PubnubUtils.subscribeLangChannel(lang);
        FireBaseUtils.getMessagesByLang(lang, function (questions) {
            console.log('Firebase messages by lang', lang, questions);
            questions.forEach(function (q) {
                // TODO: pass more (like date)
                ApiActions.questionReceived(q.id, q.text);
            });
        });
    },

    setSecondaryLanguage: function (lang) {
        Dispatcher.handleViewAction({
            type: AT.SET_SECONDARY_LANGUAGE,
            lang: lang
        });
    }

};
