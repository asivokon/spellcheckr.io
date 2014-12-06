var Pubnub = require('pubnub-browserify');
var ApiActions = require('../actions/ApiActions');

module.exports = {

    init: function () {
        Pubnub = Pubnub.init({
            publish_key: 'pub-c-9deee8d8-bc12-4770-9075-f125b8de84dd',
            subscribe_key: 'sub-c-56f28a4a-7d24-11e4-baaa-02ee2ddab7fe'
        });
        this.subscribe();
    },

    publish: function (text, lang, snippetId) {
        Pubnub.publish({
            channel: 'lang-' + lang,
            message: {text: text, lang: lang, snippetId: snippetId},
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
    },

    subscribeLangChannel: function (lang) {
      // TODO: unsubscribe
      Pubnub.subscribe({
        channel: 'lang-' + lang,
        callback: function (m) {
          console.log('got message: ', m);
          ApiActions.langChannelUpdate(lang, m.snippetId, m.text);
        }
      });
    }
};
