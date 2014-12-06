var React = require('react');
var Editor = require('./Editor.react');
var PubnubEditor = require('./PubnubEditor.react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                app component
                <Editor />
                <PubnubEditor />
            </div>
        );
    }

});