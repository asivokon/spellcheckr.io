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

    subscribeToChannel: function (channel) {
        // TODO: unsubscribe
        Pubnub.subscribe({
            channel: channel,
            callback: function (m) {
                ApiActions.questionReceived(m.snippetId, m.text);
            }
        });
    },

    subscribeLangChannel: function (lang) {
        this.subscribeToChannel('lang-' + lang);
    }
};
