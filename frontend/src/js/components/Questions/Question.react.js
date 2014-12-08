var React = require('react/addons');
var cs = React.addons.classSet;
var ApiAcitons = require('../../actions/ApiActions');

module.exports = React.createClass({

    propTypes: {
        question: React.PropTypes.object
    },

    render: function () {
        var question = this.props.question;
        var isTyping = this.props.question.isTyping;
        var typingClass = cs({typing: isTyping, 'listing-menu': true});
        var typingVal = isTyping? " is typing..." : "";

        return (
            <li className="listing-item" onClick={this.questionClick}>
                <div className="listing-text">{question.text}</div>
                <div className={typingClass}><span>{question.author + typingVal}</span></div>
            </li>
        );
    },
    
    questionClick: function () {
        ApiAcitons.questionSelected(this.props.question);
    }

});
