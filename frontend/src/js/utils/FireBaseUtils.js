var FireBase = require('firebase');
var Settings = require('./Settings');

var FireBaseRoutes = {
    messages: function (messageId) {
        child = messageId ? ("messages/" + messageId) : "messages";
        return new FireBase(Settings.fireBaseUrl).child(child);
    },

    responses: function (messageId) {
        return new FireBase(Settings.fireBaseUrl).child("responses/" + messageId);
    }
};

module.exports = {
    putMessage: function (messageId, text, lang, author) {
        FireBaseRoutes.messages(messageId).
            set({message: text, lang: lang, date: new Date().getTime(), author: author});
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
            //equalTo(lang).            // TODO:
            once('value', function (snapshot) {
                var val = snapshot.val();
                var messages = [];
                for (var id in val) {
                    if (val.hasOwnProperty(id)) {
                        var msg = val[id];
                        if (msg.lang == lang) {
                            messages.push({
                                id: id,
                                text: msg.message,
                                lang: lang,
                                date: msg.date,
                                author: msg.author
                            });
                        }
                    }
                }
                callback(messages);
            });
    },

    subscribeToAnswers: function (messageId, callback, sender) {
        FireBaseRoutes.responses(messageId).
            on('value', function (snapshot) {
                var val = snapshot.val();
                var result = [];
                //console.log("Got answers from Firebase:", val);
                for (var id in val) {
                    if (val.hasOwnProperty(id)){
                        result.push({
                            id: id,
                            text: val[id].message.answer
                        })
                    }
                }

                callback.call(sender, result);
            });
    }
};
