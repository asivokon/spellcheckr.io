var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PS = AppConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleAPIAction: function (action) {
        var payload = {
            source: PS.API_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function (action) {
        var payload = {
            source: PS.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }

});

module.exports = AppDispatcher;