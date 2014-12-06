var ApiActions = require('../actions/ApiActions');

var Pubnub;

module.exports = {

    init: function() {
        Pubnub = PUBNUB.init({
            publish_key: 'pub-c-9deee8d8-bc12-4770-9075-f125b8de84dd',
            subscribe_key: 'sub-c-56f28a4a-7d24-11e4-baaa-02ee2ddab7fe'
        });
        this.subscribe();
    },

    publish: function(text) {
        Pubnub.publish({
            channel: 'test-typing',
            message: {"typing": text}
        });
    },

    subscribe: function() {
        Pubnub.subscribe({
            channel: 'test-typing',
            message: function(m){
                console.log('got', m);
                ApiActions.pubnubUpdate(m.typing);
            }
        });
    }
};