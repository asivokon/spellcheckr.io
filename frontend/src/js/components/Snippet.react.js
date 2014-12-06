var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        snippet: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            id: this.props.snippet.snippetId,
            text: this.props.snippet.text
        };
    },

    render: function () {
        return (
            <div className="snippet_item" onClick={this._clickSnippet} >
                <span className="snippet_text">{this.state.text}</span>
            </div>
        );
    },

    _clickSnippet: function () {

    }

});