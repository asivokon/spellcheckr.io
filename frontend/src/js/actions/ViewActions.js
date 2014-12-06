var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EditDiffUtils = require('../utils/EditDiffUtils');

var AT = Constants.ActionTypes;

module.exports = {

    getSnippetDiffs: function (text) {
        Dispatcher.handleViewAction({
            type: AT.GET_SNIPPET_DIFF,
            text: text
        });
        EditDiffUtils.getSnipDiff(text)
    }
};
