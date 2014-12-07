var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    questionReceived: function (snippetId, text) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_RECEIVED,
            snippetId: snippetId,
            text: text
        });
    },

    fireAnswer: function (question, answer, authorUid, snippetId) {
        Dispatcher.handleViewAction({
            type: AT.ANSWER_FIRE,
            question: question,
            answer: answer,
            authorUid: authorUid,
            snippetId: snippetId
        });
    },

    answerReceived: function (answer) {
        Dispatcher.handleViewAction({
            type: AT.ANSWER_RECEIVED,
            question: answer.question,
            answer: answer.answer,
            authorUid: answer.authorUid
        });
    }

};
