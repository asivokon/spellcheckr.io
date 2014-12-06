var jsdiff = require('diff');
var EditorStore = require('../stores/EditorStore');
var EditActions = require('../actions/EditActions');

var _getTextTemplate = function (part) {
    var color = part.added ? '#0f0' :
        part.removed ? '#f00' : '#000';

    return '<span style="color:' + color + '">' + part.value + '</span>'
};

module.exports = {
    getSnipDiff: function (snippet) {
        var text = EditorStore.getText();
        var diff = jsdiff.diffChars(text, snippet.text);
        var result = diff.map(_getTextTemplate);

        EditActions.updateHighLightText(result.join(''));
    }

};
