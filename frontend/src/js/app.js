var React = require('react');
var App = require('./components/App.react');
var PubnubUtils = require('./utils/PubnubUtils');
var AppUtils = require('./utils/AppUtils');
var SuggestBotStore = require('./stores/SuggestBotStore');

window.React = React; // export for http://fb.me/react-devtools
AppUtils.onAppStart();

PubnubUtils.init();

React.render(
    <App />,
    document.getElementById('react')
);