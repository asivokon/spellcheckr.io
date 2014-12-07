module.exports = {

    ActionTypes: {
        'CHANGE_APP_STATE': 'CHANGE_APP_STATE',
        'QUESTION_FIRE': 'QUESTION_FIRE',                   // { text: 'question', snippetId: uid }
        'QUESTION_RECEIVED': 'QUESTION_RECEIVED',           // { text: 'question', snippetId: uid }
        'ANSWER_FIRE':'ANSWER_FIRE',                        // { question:'', answer: 'answer', authorUid: uid, snippedId: uid}
        'ANSWER_RECEIVED':'ANSWER_RECEIVED',                // { question:'', answer: 'answer', authorUid: uid }
        'GET_SNIPPET_DIFF': 'GET_SNIPPET_DIFF',
        'UPDATE_HIGHLIGHT_TEXT': 'UPDATE_HIGHLIGHT_TEXT',
        'RESET_HIGHLIGHT': 'RESET_HIGHLIGHT',
        'SET_SNIPPET_ID': 'SET_SNIPPET_ID',                 // { snippetId: uid }
        'SET_PRIMARY_LANGUAGE': 'SET_PRIMARY_LANGUAGE',     // { lang: 'ukr' }
        'SET_SECONDARY_LANGUAGE': 'SET_SECONDARY_LANGUAGE'  // { lang: 'eng' }
    },

    AppState: {
        "QUESTION_STATE": 0,
        "ANSWER_STATE": 1
    },

    Events: {
        CHANGE: 'change'
    },

    PayloadSources: {
        API_ACTION: 'API_ACTION',
        VIEW_ACTION: 'VIEW_ACTION'
    }

};
