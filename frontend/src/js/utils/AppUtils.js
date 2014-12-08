var UiActions = require("../actions/UiActions");

module.exports = {
    generateSnippetId: function () {
        var hash = window.location.hash,
            uid = hash && hash.length > 1 ? hash.substring(1) :
                (Math.random().toString(36).slice(2));
        UiActions.setSnippetId(uid);
        window.location.hash = uid;
    },

    onAppStart: function () {
        UiActions.setPrimaryLanguage('eng');        // TODO: autoguess lang by IP
        this.generateSnippetId();
    },

    throttle: function (f, delay) {
        var timer = null, tries = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = window.setTimeout(function () {
                    f.apply(context, args);
                    tries += 1;
                },
                delay || 500);
        }
    }
};
