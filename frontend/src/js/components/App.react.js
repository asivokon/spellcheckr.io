var React = require('react');
var Editor = require('./Editor.react');
var PubnubEditor = require('./PubnubEditor.react');
var FireBaseMessage = require('./FireBaseMessage.react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                app component
                <Editor />
                <PubnubEditor />
                <FireBaseMessage />
            </div>
        );
    }

});