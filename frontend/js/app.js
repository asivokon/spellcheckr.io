var React = require('react');
var App = require('./components/App.react');

window.React = React; // export for http://fb.me/react-devtools

React.render(
    <App />,
    document.getElementById('react')
);