var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var AppStore = require('../stores/AppStore');

var AT = Constants.ActionTypes;

module.exports = {

    fireQuestion: function (text, snippetId) {
        var lang = AppStore.getPrimaryLang();
        Dispatcher.handleViewAction({
            type: AT.QUESTION_FIRE,
            text: text,
            snippetId: snippetId,
            lang: lang,
            authorUid: AppStore.getUserName()
        });
    }

};
