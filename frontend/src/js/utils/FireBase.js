var FireBase = require('firebase');

var FireBaseRoutes = {
    rootUrl: 'https://hp5hugl2osm.firebaseio-demo.com/',
    messages: 'messages/',
    responses: 'responses/',

    getMessagesInstance: function (messageId) {
        return new FireBase(FireBaseRoutes.rootUrl).child(FireBaseRoutes.messages + "/" + messageId);
    },

    getResponsesInstance: function (messageId) {
        return new FireBase(FireBaseRoutes.rootUrl).child(FireBaseRoutes.responses + "/" + messageId);
    }
};

var FireBaseService = {
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
        var db = FireBaseRoutes.getResponsesInstance(messageId);
        db.push({message: text, date: new Date().getTime()});
    },

    getMessage: function(messageId, callback, sender) {
        var db = FireBaseRoutes.getMessagesInstance(messageId);
        db.on('value', function (snapshot) {
            callback.call(sender, snapshot.val());
        });
    },

    getResponses: function(messageId, callback, sender) {
        var db = FireBaseRoutes.getResponsesInstance(messageId);
        db.on('value', function (snapshot) {
            callback.call(sender, snapshot.val());
        });
    }

};

module.exports = FireBaseService;