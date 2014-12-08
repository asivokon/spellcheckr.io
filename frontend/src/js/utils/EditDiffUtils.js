var jsdiff = require('diff');

var _getTextTemplate = function (part) {
    var color = part.added ? '#0f0' :
        part.removed ? '#f00' : '#000';

    return '<span style="color:' + color + '">' + part.value + '</span>'
};

module.exports = {

    getDiff: function (text, source) {
        var diff = jsdiff.diffChars(text, source);
        var result = diff.map(_getTextTemplate);

        return result.join('');
    }

};