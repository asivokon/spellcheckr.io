var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    pubnubUpdate: function (text) {
        Dispatcher.handleViewAction({
            type: AT.PUBNUB_UPDATE,
            text: text
        });
    }

};
