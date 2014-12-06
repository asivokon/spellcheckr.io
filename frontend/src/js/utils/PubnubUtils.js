var Pubnub = require('pubnub-browserify');
var ApiActions = require('../actions/ApiActions');
var Settings = require("./Settings");

module.exports = {

    init: function () {
        Pubnub = Pubnub.init({
            publish_key: Settings.pubNub.publishKey,
            subscribe_key: Settings.pubNub.subscribeKey
        });
        this.subscribeLangChannel('eng');
        this.subscribe();
    },

    publish: function (text, lang, snippetId) {
        Pubnub.publish({
            channel: 'lang-' + lang,
            message: {text: text, lang: lang, snippetId: snippetId},
            callback: function (e) {
            },
            error: function (e) {
            }
        });
    },

    subscribe: function () {
        Pubnub.subscribe({
            channel: 'lang-eng',
            callback: function (m) {
                ApiActions.suggestRequest(m.text);
            }
        });
    },

    subscribeLangChannel: function (lang) {
        // TODO: unsubscribe
        Pubnub.subscribe({
            channel: 'lang-' + lang,
            callback: function (m) {
                ApiActions.langChannelUpdate(lang, m.snippetId, m.text);
            }
        });
    }
};
