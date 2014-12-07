var https = require('https');
var XmlParser = require('xml2js');
var Settings = require('./Settings');
var AppUtils = require('./AppUtils');

module.exports = {
    sendRequest: function (text, lang, callback) {
        var language = lang ? lang : 'en-US';
        var request = https.request({
                hostname: Settings.languageTools.checkUrl,
                path: '/',
                method: 'POST',
                headers: {
                    'X-Mashape-Key': Settings.languageTools.key,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            function (response) {
                response.on('data', function (data) {
                    XmlParser.parseString(data, function (err, result) {
                        var errors = result && result.matches && result.matches.error ?
                            result.matches.error.map(function (item) {
                                return item.$;
                            }) : [];
                        if (callback) {
                                result = '';
                                var lastIndex = 0;
                            for (var i = 0; i < errors.length; i++) {
                                var error = errors[i];
                                if (error.errorlength) {
                                    var word = error.replacements.split("#")[0];
                                    if (word) {
                                        result += text.substring(lastIndex, parseInt(error.fromx, 10)) + word;
                                        lastIndex = parseInt(error.tox, 10);
                                    }
                                }
                            }
                            if (lastIndex < text.length) {
                                result += text.substring(lastIndex);
                            }
                            callback(result);
                        }
                    });
                });
            });
        request.end('language=' + language + '&text=' + text);
    },

    sendThrottled: AppUtils.throttle(function (text, lang, callback) {
        this.sendRequest(text, lang, callback);
    }, 1500)

};
