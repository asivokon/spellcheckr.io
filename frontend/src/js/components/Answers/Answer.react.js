var React = require('react/addons');
var cs = React.addons.classSet;

module.exports = React.createClass({

    propTypes: {
        answer: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            isHover: false
        };
    },

    render: function () {
        var answer = this.props.answer,
           text = !this.state.isHover ? answer.answer : answer.diffText;

        return (
            <li className="listing-item"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <div className="listing-text" dangerouslySetInnerHTML={{__html: text}}></div>
                <div className="listing-menu"><span>{answer.author}</span></div>
            </li>
        );
    },

    onMouseEnter: function () {
        this.setState({isHover:true});
    },

    onMouseLeave: function () {
        this.setState({isHover:false});
    }

});
