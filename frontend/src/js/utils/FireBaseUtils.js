var FireBase = require('firebase');
var Settings = require('./Settings');

var FireBaseRoutes = {
    messages: 'messages/',
    responses: 'responses/',

    getMessagesInstance: function (messageId) {
        return new FireBase(Settings.fireBaseUrl).child(FireBaseRoutes.messages + "/" + messageId);
    },

    getResponsesInstance: function (messageId) {
        return new FireBase(Settings.fireBaseUrl).child(FireBaseRoutes.responses + "/" + messageId);
    }
};

module.exports = {
    putMessage: function (messageId, text, responseHandler) {
        var db = FireBaseRoutes.getMessagesInstance(messageId);
        db.set({message: text, date: new Date().getTime()});
        var responseDb = FireBaseRoutes.getResponsesInstance(messageId);
        responseDb.on("child_added", function (snapshot) {
            var newPost = snapshot.val();
            console.log("Responded to " + messageId + ":" + newPost.message);
            if (responseHandler) {
                responseHandler(newPost);
            }
        });
    },

    putResponse: function (messageId, text) {
        debugger;
        var db = FireBaseRoutes.getResponsesInstance(messageId);
        db.push({message: text, date: new Date().getTime()});
    },

    getMessage: function (messageId, callback, sender) {
        var db = FireBaseRoutes.getMessagesInstance(messageId);
        db.on('value', function (snapshot) {
            callback.call(sender, snapshot.val());
        });
    },

    getResponses: function (messageId, callback, sender) {
        var db = FireBaseRoutes.getResponsesInstance(messageId);
        db.on('value', function (snapshot) {
            callback.call(sender, snapshot.val());
        });
    }
};