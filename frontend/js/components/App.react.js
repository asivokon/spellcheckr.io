var React = require('react');
var Editor = require('./Editor.react');

module.exports = React.createClass({

    render: function () {
        return (
            <div className="spell-checkr-app">
                app component
                <Editor />
            </div>
        );
    }

});