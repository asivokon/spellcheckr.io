var https = require('https');
var Settings = require('./Settings');
var AppUtils = require('./AppUtils');


module.exports = {
    sendRequest: function (text, callback) {
        var text = text && text.length?
            text.substring(0, Math.min(text.length, Settings.mashable.languageDetect.maxLength)): null;
        if (text && text.length >= Settings.mashable.languageDetect.minLength) {
            var request = https.request({
                    hostname: Settings.mashable.languageDetect.url,
                    path: '/detect?key=' + Settings.mashable.languageDetect.apiKey,
                    method: 'POST',
                    port: 443,
                    headers: {
                        'X-Mashape-Key': Settings.mashable.key,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                function (response) {
                    response.on('data', function (data) {
                        data = JSON.parse(data);
                        var lang = data && data.data && data.data.detections && data.data.detections.length?
                            data.data.detections[0].language: null;
                        if (callback) {
                            callback(lang);
                        }
                    });
                });
            request.end("q=" + encodeURIComponent(text));
        }
    },

    sendThrottled: AppUtils.throttle(function (text, callback) {
        this.sendRequest(text, callback);
      }, 2000)
};
