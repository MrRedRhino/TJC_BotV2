var NOTESCOMMAND = {};
const GLOBAL_DEBUG = require("../../GLOBAL/DEBUG.js")
const EXECUTER_REPLY = require("../REPLY.js")
const GLOBAL_SQL = require("../../GLOBAL/SQL.js")
const GLOBAL_CASEID = require("../../GLOBAL/CASEID.js")
const GLOBAL_WEBHOOK = require("../../GLOBAL/WEBHOOKS.js")

NOTESCOMMAND.command = async function(global, client, SQL, interaction) {
    //Eintrag in die Datenbank
    GLOBAL_SQL.execute(SQL, "NOTESCOMMAND_INSERT", "INSERT INTO usernotes (user, note, moderator) VALUES (?, ?, ?)",
        [interaction.data.options[0].value, interaction.data.options[1].value, interaction.member.user.id])

    // Antwort an den Moderator
    EXECUTER_REPLY.go(
        client,
        interaction,
        "",
        [{
            "title": "neuer Usernotiz",
            "color": 5242148,
            "description": "Über den User <@!" + interaction.data.options[0].value + "> wurde folgendes gespeichert:\n`" + interaction.data.options[1].value + "`"
        }]
    )
}

module.exports = NOTESCOMMAND;