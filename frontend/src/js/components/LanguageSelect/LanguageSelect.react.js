var React = require('react/addons');

module.exports = React.createClass({

    propTypes: {
        selectedLanguage: React.PropTypes.string
    },

    render: function () {
        var selectedLang  = this.props.selectedLanguage;
        var languages = ['ukr', 'eng', 'rus'];
        var options = languages.map(function(lang) {
            return (
                <option value={lang}>{lang}</option>
            );
        });

        return (
            <select>{options}</select>
        );
    },

    _onChange: function () {
    }

});
