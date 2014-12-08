var React = require('react/addons');
var cs = React.addons.classSet;
var AnswersStore = require('../../stores/AnswersStore');
var EditorStore = require('../../stores/EditorStore');
var Answer = require('./Answer.react.js');

var EditDiffUtils = require('../../utils/EditDiffUtils');

function getStateFromStores() {
    return {
        answers: AnswersStore.getAnswers(),
        text: EditorStore.getText()
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
        var answers = this.state.answers,
            text = this.state.text;
        if (answers && Object.keys(answers).length < 1) {
            return <div className="busy"><div className="spinner pulse"></div></div>;
        }

        var list = answers.map(function (answer) {
            answer.diffText = EditDiffUtils.getDiff(text, answer.answer);
            return (
                <Answer answer={answer} />
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
