var React = require('react');
var Editor = require('./Editor.react');
var PubnubEditor = require('./PubnubEditor.react');
var LangChanell = require('./LangChanell.react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                app component
                <Editor />
                <LangChanell />
                <PubnubEditor />
            </div>
        );
    }

});