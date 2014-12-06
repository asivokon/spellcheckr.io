var UiActions = require("../actions/UiActions");

module.exports = {
    updateText: function (text) {
    },

    generateSnippetId: function () {
        var hash = window.location.hash,
            uid = hash && hash.length ? hash.substring(1) : btoa('' + new Date().getTime());
        UiActions.setSnippetId(uid);
        window.location.hash = uid;
    },

    onAppStart: function () {
        this.generateSnippetId();
        UiActions.setPrimaryLanguage('eng');        // TODO: autoguess lang by IP
    }

};
