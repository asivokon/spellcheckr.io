var React = require('react');
var Editor = require('./Editor.react');
var PubnubEditor = require('./PubnubEditor.react');
var LangChanell = require('./LangChanell.react');


var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                <Editor />
                <LangChanell />
                <PubnubEditor />
                <RaisedButton label="Default" />
            </div>
        );
    }

});