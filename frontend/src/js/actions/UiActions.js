var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PubnubUtils = require('../utils/PubnubUtils');
var FireBaseUtils = require('../utils/FireBaseUtils');
var AnswersStore = require('../stores/AnswersStore');

var AT = Constants.ActionTypes;

module.exports = {

    /* Current snippet ID changed/assigned. */
    setSnippetId: function (snippetId) {
        Dispatcher.handleViewAction({
            type: AT.SET_SNIPPET_ID,
            snippetId: snippetId
        });

        FireBaseUtils.subscribeToAnswers(snippetId, function (answers) {
            AnswersStore.setAnswers(answers);
            AnswersStore.emitChange();
        }, this);
    },

    setPrimaryLanguage: function (lang) {
        Dispatcher.handleViewAction({
            type: AT.SET_PRIMARY_LANGUAGE,
            lang: lang
        });
        PubnubUtils.subscribeLangChannel(lang);
    },

    setSecondaryLanguage: function (lang) {
        Dispatcher.handleViewAction({
            type: AT.SET_SECONDARY_LANGUAGE,
            lang: lang
        });
    }

};
