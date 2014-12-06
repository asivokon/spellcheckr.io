var React = require('react');
var App = require('./components/App.react');
var PubnubUtils = require('./utils/PubnubUtils');

window.React = React; // export for http://fb.me/react-devtools

PubnubUtils.init();

React.render(
    <App />,
    document.getElementById('react')
);