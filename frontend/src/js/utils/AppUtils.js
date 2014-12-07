var UiActions = require("../actions/UiActions");

module.exports = {
    generateSnippetId: function () {
        var hash = window.location.hash,
            uid = hash && hash.length ? hash.substring(1) : btoa('' + new Date().getTime());
        UiActions.setSnippetId(uid);
        window.location.hash = uid;
    },

    onAppStart: function () {
        this.generateSnippetId();
        UiActions.setPrimaryLanguage('eng');        // TODO: autoguess lang by IP
    },

    throttle: function (f, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = window.setTimeout(function () {
          f.apply(context, args);
        },
        delay || 500);
      }
    }

};
