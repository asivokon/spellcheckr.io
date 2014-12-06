var https = require('https');
var Settings = require('../utils/Settings');
var XmlParser = require('xml2js');

module.exports = {
    checkText: function(text, lang, callback){
        var language = lang ? lang: 'en-US';
        var request = https.request({
                hostname: Settings.languageTools.checkUrl,
                port: 443,
                path: '/',
                method: 'POST',
                headers: {
                    'X-Mashape-Key': Settings.languageTools.key,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            function(response) {
                response.on('data', function(data) {
                    XmlParser.parseString(data, function(err, result) {
                        console.dir(result);
                    });
                });
            });
        request.end('language=' + language + '&text=' + text);
    }

};