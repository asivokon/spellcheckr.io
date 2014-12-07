var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        answer: React.PropTypes.object
    },

    render: function () {
        var answer = this.props.answer;
        return (
            <div className="answer-item">
                <span className="answer-item-text">{answer.text}</span>
            </div>
        );
    }

});
