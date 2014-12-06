var ApiActions = require('../actions/ApiActions');
var Pubnub = require('pubnub-browserify');

module.exports = {

    init: function () {
        Pubnub = Pubnub.init({
            publish_key: 'pub-c-9deee8d8-bc12-4770-9075-f125b8de84dd',
            subscribe_key: 'sub-c-56f28a4a-7d24-11e4-baaa-02ee2ddab7fe'
        });
        this.subscribe();
    },

    publish: function (text) {
        Pubnub.publish({
            channel: 'test-typing',
            message: {"typing": text},
            callback  : function(e) { console.log( "SUCCESS!", e ); },
            error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
        });
    },

    subscribe: function () {
        Pubnub.subscribe({
            channel: 'test-typing',
            callback: function (m) {
                console.log('got', m);
                ApiActions.pubnubUpdate(m.typing);
            }
        });
    }
};