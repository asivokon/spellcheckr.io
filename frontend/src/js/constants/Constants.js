module.exports = {

    ActionTypes: {
        'QUESTION_FIRED': 'QUESTION_FIRED',                 // {text: 'question', snippetId: uid}
        'QUESTION_RECEIVED': 'QUESTION_RECEIVED',           // {lang: 'ukr', text: 'question', snippetId: uid }
        'GET_SNIPPET_DIFF': 'GET_SNIPPET_DIFF',
        'UPDATE_HIGHLIGHT_TEXT': 'UPDATE_HIGHLIGHT_TEXT',
        'RESET_HIGHLIGHT': 'RESET_HIGHLIGHT',
        'SET_SNIPPET_ID': 'SET_SNIPPET_ID',                 // { snippetId: uid }
        'SET_PRIMARY_LANGUAGE': 'SET_PRIMARY_LANGUAGE',     // { lang: 'ukr' }
        'SET_SECONDARY_LANGUAGE': 'SET_SECONDARY_LANGUAGE'  // { lang: 'eng' }
    },

    Events: {
        CHANGE: 'change'
    },

    PayloadSources: {
        API_ACTION: 'API_ACTION',
        VIEW_ACTION: 'VIEW_ACTION'
    }

};
