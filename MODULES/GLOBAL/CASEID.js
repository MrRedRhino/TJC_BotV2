var GLOBAL_CASEID = {}
const GLOBAL_DEBUG = require("./DEBUG.js")
const GLOBAL_THROW = require("./THROW.js")


GLOBAL_CASEID.getlist = function (global, SQL) {
    try {

        // Fetch all cases from database
        SQL.execute("SELECT * FROM `cases`", [], function (err, result, fields) {
            if (err) {
                GLOBAL_DEBUG.console("error", "GLOBAL_CASEID.getlist", "ERRORCODE: " + err)
            }

            // reset array
            global.cache.cases = []

            // push all caseid's in array
            for(i = 0; i < result.length; i++){
                global.cache.cases.push(result[i].caseid)
            }

            // output ready
            GLOBAL_DEBUG.console("log", "GLOBAL_CASEID.getlist", "fetched cases")
        })
    } catch (e) {
        GLOBAL_DEBUG.go("GLOBAL_CASEID.getlist", e)
    }
}


// Generate new CaseID
GLOBAL_CASEID.generate = function (global) {

    id = makeid() // call function from stackoverflow

    // Check, if caseid is unique
    if(global.cache.cases.includes(id)){
        GLOBAL_CASEID.generate(global) // if not, generate new one
    } else {
        global.cache.cases.push(id) // if unique, push id to array
        return id // return the id
    }
}

// Generate new CaseID
GLOBAL_CASEID.check = function (global, caseid) {
    return global.cache.cases.includes(caseid)
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
    var length = 8;
    var result           = ["#"];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

module.exports = GLOBAL_CASEID