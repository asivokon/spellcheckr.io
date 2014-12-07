var React = require('react/addons');
var cs = React.addons.classSet;
var AnswersStore = require('../../stores/AnswerStore');
var Answer = require('./Answer.react.js');
var Toolbar = require('../Toolbar.react')


function getStateFromStores() {
    return {
        answers: AnswersStore.getAnswers()
    }
}

module.exports = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        AnswersStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AnswersStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var state = this.props.state;
        if (!state) {
            return <Toolbar />;
        }

        var answers = this.state.answers;
        if (answers && Object.keys(answers).length < 1) {
            return <div className="no-answers-message">You don't have answers for the text.</div>;
        }

        var list = answers.map(function (answer) {
            return  (
                <Answer answer={answer} />
            );
        });

        return (
            <div className='answers-view'>
                <h4>Answers View</h4>
                {list}
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});
