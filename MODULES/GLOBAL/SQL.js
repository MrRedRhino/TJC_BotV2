var GLOBAL_SQL = {}
const GLOBAL_DEBUG = require("./DEBUG.js")
const GLOBAL_THROW = require("./THROW.js")

GLOBAL_SQL.execute = function (SQL, caller, SQLCommand, Arguments) {
    try {
        SQL.execute(SQLCommand, Arguments, function (err, result, fields) {
            if (err) {
                GLOBAL_DEBUG.console("error", "GLOBAL_SQL.execute", "ERRORCODE: " + err + "\n>>> LOCATED AT: " + caller)
            }
        })
    } catch (e) {
        GLOBAL_THROW.go("GLOBAL_SQL.execute", e + "\n>>> LOCATED AT: " + caller)
    }
}


GLOBAL_SQL.getwhitelist = function (global, SQL) {
    try {

        // Fetch all cases from database
        SQL.execute("SELECT * FROM `whitelist`", [], function (err, result, fields) {
            if (err) {
                GLOBAL_DEBUG.console("error", "GLOBAL_SQL.getwhitelistlist", "ERRORCODE: " + err)
            }

            // reset array
            global.cache.whitelist = []

            // push all caseid's in array
            for(i = 0; i < result.length; i++){
                global.cache.whitelist.push(result[i].link)
            }

            // output ready
            GLOBAL_DEBUG.console("log", "GLOBAL_SQL.getwhitelist", "fetched whitelist")
        })
    } catch (e) {
        GLOBAL_DEBUG.go("GLOBAL_SQL.getwhitelist", e)
    }
}


module.exports = GLOBAL_SQL