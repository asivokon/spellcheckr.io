var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var AT = Constants.ActionTypes;

module.exports = {

    questionReceived: function (snippetId, text, authorUid) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_RECEIVED,
            snippetId: snippetId,
            text: text,
            authorUid: authorUid
        });
    },

    fireAnswer: function (question, answer, questionId, answerId, author) {
        Dispatcher.handleViewAction({
            type: AT.ANSWER_FIRE,
            question: question,
            answer: answer,
            answerId: answerId,
            snippetId: questionId,
            author: author
        });
    },

    fireLanguageDetected: function (question, questionId, lang) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_LANGUAGE_DETECTED,
            question: question,
            questionId: questionId,
            lang: lang
        });
    },

    answerReceived: function (answer) {
        Dispatcher.handleViewAction({
            type: AT.ANSWER_RECEIVED,
            question: answer.question,
            answer: answer.answer,
            authorUid: answer.authorUid
        });
    },

    questionSelected: function (question) {
        Dispatcher.handleViewAction({
            type: AT.QUESTION_SELECTED,
            question: question.text,
            questionId: question.id
        });
    }

};
