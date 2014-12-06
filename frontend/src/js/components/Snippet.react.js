var React = require('react/addons');
var cs = React.addons.classSet;

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
            <div className="snippet_item" onClick={this._clickSnippet} >
                <span className="snippet_text">{this.props.text}</span>
            </div>
        );
    },

    _clickSnippet: function () {

    }

});
