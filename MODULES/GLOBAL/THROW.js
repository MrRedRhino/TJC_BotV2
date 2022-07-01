var GLOBAL_THROW = {};

// Console kann eingefärbt werden
const NPM_COLORS = require("colors/safe")

// Error erzeugen, der den Code nicht abstürzen lässt
function getErrorObject(){
    try { throw Error('') } catch(err) { return err; }
}

GLOBAL_THROW.go = function(name, message) {

    // Extractiere den Ort, an dem der Fehler auftritt
    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);

    // Erzeuge Consolenachricht mit dem Ort und den angegebenen Fehlerdaten
    console.log(NPM_COLORS.bold.red("\n\n\n! ") + NPM_COLORS.red("Bot gestoppt!"))
    console.log(NPM_COLORS.bold.red("! ") + NPM_COLORS.red("Grund: ") + NPM_COLORS.white.bgBrightRed(message))
    console.log(NPM_COLORS.bold.red("! ") + NPM_COLORS.red("Debug Name: ") + NPM_COLORS.white.bgBrightRed(name))
    console.log(NPM_COLORS.bold.red("! ") + NPM_COLORS.red("Ort: ") + NPM_COLORS.white.bgBrightRed(clean.slice(1)))

    // Stoppe Codes
    process.exit(1)
}

module.exports = GLOBAL_THROW