var React = require('react');
var App = require('./components/App.react');
var PubnubUtils = require('./utils/PubnubUtils');
var AppUtils = require('./utils/AppUtils');
var LanguageToolUtils = require('./utils/LanguageToolUtils');

window.React = React; // export for http://fb.me/react-devtools
AppUtils.onAppStart();

PubnubUtils.init();

LanguageToolUtils.checkText("I a married", null, function(response) {
    console.log(response);
});

React.render(
    <App />,
    document.getElementById('react')
);