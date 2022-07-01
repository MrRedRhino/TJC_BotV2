var GLOBAL_WEBHOOKS= {};

const GLOBAL_DEBUG = require('./DEBUG');
const request = require('request');

GLOBAL_WEBHOOKS.go = function(webhook, embed) {

    if (webhook != null) {
        var options = {
            method: 'POST',
            uri: "canary.discordapp.com",
            headers: {'Content-Type': 'application/json'},
            body: {
                content: null,
                embeds: embed
            },
            json: true
        };

        request(webhook, options, function (error, response, body) {
            if (error) {
                GLOBAL_DEBUG.console("error", "GLOBAL_WEBHOOKS_send", error)
            }
            ;
        });
    }

}

module.exports = GLOBAL_WEBHOOKS