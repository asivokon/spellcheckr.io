var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        question: React.PropTypes.object
    },

    render: function () {
        var question = this.props.question;
        return (
            <li className="listing-item">
                <div className="listing-text">{question.text}</div>
                <div className="listing-menu"><span>by Bot</span></div>
            </li>
        );
    }

});
