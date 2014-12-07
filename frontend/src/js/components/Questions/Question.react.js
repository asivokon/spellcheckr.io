var React = require('react/addons');
var cs = React.addons.classSet;
var ApiAcitons = require('../../actions/ApiActions');

module.exports = React.createClass({

    propTypes: {
        question: React.PropTypes.object
    },

    render: function () {
        var question = this.props.question;
        return (
            <li className="listing-item" onClick={this.questionClick}>
                <div className="listing-text">{question.text}</div>
                <div className="listing-menu"><span>{question.author}</span></div>
            </li>
        );
    },
    
    questionClick: function () {
        ApiAcitons.questionSelected(this.props.question);
    }

});
