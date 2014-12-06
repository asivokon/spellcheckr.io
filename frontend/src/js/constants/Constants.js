module.exports = {

    ActionTypes: {
        'UPDATE_TEXT': 'UPDATE_TEXT',
        'PUBNUB_UPDATE': 'PUBNUB_UPDATE',
        'GET_SNIPPET_DIFF': 'GET_SNIPPET_DIFF',
        'UPDATE_HIGHLIGHT_TEXT': 'UPDATE_HIGHLIGHT_TEXT',
        'RESET_HIGHLIGHT': 'RESET_HIGHLIGHT',
        'LANG_CHANNEL_UPDATE': 'LANG_CHANNEL_UPDATE',       // { snippetId: '1234abef', lang: 'ukr', text: 'foobar' }
        'SET_SNIPPET_ID': 'SET_SNIPPET_ID',                 // { snippetId: '1234abef' }
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
