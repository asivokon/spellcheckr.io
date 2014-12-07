var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        question: React.PropTypes.object
    },

    render: function () {
        var question = this.props.question;
        return (
            <div className="question-item">
                <span className="question-item-text">{question.text}</span>
            </div>
        );
    }

});
