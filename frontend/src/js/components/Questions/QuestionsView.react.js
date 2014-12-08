var React = require('react/addons');
var cs = React.addons.classSet;
var QuestionStore = require('../../stores/QuestionStore');
var Question = require('./Question.react');

function getStateFromStores() {
    return {
        questions: QuestionStore.getQuestions()
    }
}

module.exports = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        QuestionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        QuestionStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var state = this.props.state;
        var questions = this.state.questions;
        if (questions && Object.keys(questions).length < 1) {
            return <div className="busy"><div className="spinner pulse"></div></div>;
        }

        var list = questions.map(function (q) {
            return  (
                <Question question={q} />
            );
        });

        return (
            <ul className="listing">
                {list}
            </ul>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});
