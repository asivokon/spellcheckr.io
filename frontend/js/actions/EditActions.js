var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var APIUtils = require('../utils/ApiUtils');

var AT = Constants.ActionTypes;

module.exports = {

    updateText: function (text) {
        Dispatcher.handleViewAction({
            type: AT.UPDATE_TEXT,
            text: text
        });
        APIUtils.updateText(text);
    }

};
