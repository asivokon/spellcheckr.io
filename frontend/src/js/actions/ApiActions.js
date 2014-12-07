var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    questionReceived: function (lang, snippetId, text) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_RECEIVED,
            snippetId: snippetId,
            text: text,
            lang: lang
        });
    }

};
