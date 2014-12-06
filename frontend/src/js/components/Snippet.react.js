var React = require('react/addons');
var cs = React.addons.classSet;
var ViewActions = require('../actions/ViewActions');
var EditActions = require('../actions/EditActions');

module.exports = React.createClass({

    propTypes: {
        //snippet: React.PropTypes.object
      snippetId: React.PropTypes.string,
      text: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            id: this.props.snippedId,
            text: this.props.text
        };
    },

    render: function () {
        return (
            <div className="snippet-item"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave} >
                <span className="snippet-item-text">{this.props.text}</span>
            </div>
        );
    },

    onMouseEnter: function () {
        ViewActions.getSnippetDiffs(this.props.text)
    },

    onMouseLeave: function () {
        EditActions.resetHighLight(false);
    }

});
