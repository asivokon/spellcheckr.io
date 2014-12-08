var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        answer: React.PropTypes.object
    },

    render: function () {
        var answer = this.props.answer;
        return (
            <li className="listing-item">
                <div className="listing-text">{answer.answer}</div>
                <div className="listing-menu"><span>{answer.author}</span></div>
            </li>
        );
    }

});
