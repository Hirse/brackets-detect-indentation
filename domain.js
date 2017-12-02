/* eslint-env node */

"use strict";

var DOMAIN_NAME = "hirseDetectIndentation";

var detectIndent = require("detect-indent");

function detectIndentation(text) {
    return detectIndent(text);
}

function init(domainManager) {
    if (!domainManager.hasDomain(DOMAIN_NAME)) {
        domainManager.registerDomain(DOMAIN_NAME, {
            major: 0,
            minor: 1
        });
    }
    domainManager.registerCommand(
        DOMAIN_NAME, // domain name
        "detectIndentation", // command name
        detectIndentation, // command handler function
        false, // this command is synchronous in Node
        "Detect the indentation of code",
        [{
            name: "text", // parameters
            type: "string",
            description: "Text to detect the indentation"
        }], [{
            name: "indent", // return values
            type: "object",
            description: "Stats about the indentation: amount, type, and indent"
        }]
    );
}

exports.init = init;
