var UiActions = require("../actions/UiActions");
var FireBaseStore = require("../stores/FireBaseStore");

module.exports = {
    updateText: function (text) {
        console.log(text);
    },

    generateSnippetId: function () {
        var hash = window.location.hash,
            uid = hash && hash.length ? hash.substring(1) : btoa('' + new Date().getTime());
        UiActions.setSnippetId(uid);
        window.location.hash = uid;
    },

    onAppStart: function () {
        this.generateSnippetId();
        UiActions.setPrimaryLanguage('ukr');        // TODO: autoguess lang by IP
    }

};
