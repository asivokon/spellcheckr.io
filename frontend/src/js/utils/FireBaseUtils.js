var FireBase = require('firebase');
var Settings = require('./Settings');

var FireBaseRoutes = {
    messages: function (messageId) {
        child = messageId? ("messages/" + messageId) : "messages";
        return new FireBase(Settings.fireBaseUrl).child(child);
    },

    responses: function (messageId) {
        return new FireBase(Settings.fireBaseUrl).child("responses/" + messageId);
    }
};

module.exports = {
    putMessage: function (messageId, text, lang) {
        FireBaseRoutes.messages(messageId).
            set({message: text, lang: lang, date: new Date().getTime()});
    },

    putResponse: function (messageId, text) {
        FireBaseRoutes.responses(messageId).
            push({message: text, date: new Date().getTime()});
    },

    getMessage: function (messageId, callback) {
        FireBaseRoutes.messages(messageId).
            on('value', function (snapshot) {
                callback(snapshot.val());
            });
    },

    getMessagesByLang: function (lang, callback) {
        // TODO: indexOn lang
        FireBaseRoutes.messages().
            equalTo(lang).
            on('value', function (snapshot) {
                callback(snapshot.val());
            });
    },

    getResponses: function (messageId, callback, sender) {
        FireBaseRoutes.responses(messageId).
            on('value', function (snapshot) {
                callback.call(sender, snapshot.val());
            });
    }
};
