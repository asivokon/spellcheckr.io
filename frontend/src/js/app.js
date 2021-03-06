var React = require('react');
var App = require('./components/App.react');
var PubnubUtils = require('./utils/PubnubUtils');
var AppUtils = require('./utils/AppUtils');
require('./stores/R2D2Store');

window.React = React; // export for http://fb.me/react-devtools
PubnubUtils.init();
AppUtils.onAppStart();

React.render(
    <App />,
    document.getElementById('react')
);
