var React = require('react/addons');
var cs = React.addons.classSet;
var Editor = require('./Editor.react');

module.exports = React.createClass({

    render: function () {
        var state = this.props.state;

        return (
            <div className="text-edit-view">
                <Editor />
            </div>
        );
    }

});
