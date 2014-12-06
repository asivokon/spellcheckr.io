var Pubnub = require('pubnub-browserify');
var ApiActions = require('../actions/ApiActions');
var Settings = require("./Settings");

module.exports = {

    init: function () {
        console.log("PUBNUB init");
        Pubnub = Pubnub.init({
            publish_key: Settings.pubNub.publishKey,
            subscribe_key: Settings.pubNub.subscribeKey
        });
        this.subscribeLangChannel('eng');
        this.subscribe();
    },

    publish: function (text, lang, snippetId) {
        console.log('PUBNUB publish to ', "lang-" + lang, text, snippetId);
        Pubnub.publish({
            channel: 'lang-' + lang,
            message: {text: text, lang: lang, snippetId: snippetId},
            callback: function (e) {
                console.log("SUCCESS!", e);
            },
            error: function (e) {
                console.log("FAILED! RETRY PUBLISH!", e);
            }
        });
    },

    subscribe: function () {
        Pubnub.subscribe({
            channel: 'lang-eng',
            callback: function (m) {
                console.log('got', m);
                ApiActions.pubnubUpdate(m.text);
            }
        });
    },

    subscribeLangChannel: function (lang) {
        // TODO: unsubscribe
        console.log("PUBNUB subscribe to ", "lang-" + lang);
        Pubnub.subscribe({
            channel: 'lang-' + lang,
            callback: function (m) {
                console.log('got message: ', m);
                ApiActions.langChannelUpdate(lang, m.snippetId, m.text);
            }
        });
    }
};
