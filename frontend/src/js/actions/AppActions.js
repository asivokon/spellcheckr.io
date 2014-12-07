var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    changeViewState: function (state) {
        Dispatcher.handleViewAction({
            type: AT.CHANGE_APP_STATE,
            state: state
        });
    }

};
