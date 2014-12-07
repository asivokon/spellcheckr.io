var React = require('react');
var Editor = require('./Editor.react');
var LangChanel = require('./LangChanel.react');

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                <Editor />
                <div className="snippets-wrapper">
                    <h5>Suggestions</h5>
                    <LangChanel />
                </div>
            </div>
        );
    }

});