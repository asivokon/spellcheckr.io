var React = require('react');
var Editor = require('./Editor.react');
var PubnubEditor = require('./PubnubEditor.react');
var LangChanell = require('./LangChanell.react');
var FireBaseMessage = require('./FireBaseMessage.react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                <Editor />
                <LangChanell />
                <PubnubEditor />
                <FireBaseMessage />
            </div>
        );
    }

});