var EXECUTER_COMMAND_ROLE = {};
const GLOBAL_DEBUG = require("../../GLOBAL/DEBUG.js")
const EXECUTER_REPLY = require("../REPLY.js")
const GLOBAL_SQL = require("../../GLOBAL/SQL.js")

EXECUTER_COMMAND_ROLE.command = async function(global, client, SQL, interaction) {
    let userid = interaction.data.options[0].options[0].value
    let roleid = (interaction.data.options[0].options[1] == null) ? null: interaction.data.options[0].options[1].value
    switch (interaction.data.options[0].name) {
        case "add":
            if (global.teamroles[userid] != null && global.teamroles[userid].includes(roleid)) {
                EXECUTER_REPLY.go(
                    client,
                    interaction,
                    "",
                    [{
                        "title": "Teamrollen",
                        "color": 16711680,
                        "description": "Der User <@!" + userid + "> besitzt bereits die <@&" + roleid + "> Rolle"
                    }]
                )
                break;
            }

            if (global.teamroles[userid] != undefined) {
                global.teamroles[userid].push(JSON.parse(roleid.toString()))
            } else {
                global.teamroles[userid] = JSON.parse("[\"" + roleid.toString() + "\"]")
            }

            GLOBAL_SQL.execute(SQL, "ROLECOMMAND_ROLEADD_INSERT", "INSERT IGNORE INTO userroles (userid, roleid) VALUES (?, ?)", [userid, roleid])
            EXECUTER_REPLY.go(
                client,
                interaction,
                "",
                [{
                    "title": "Teamrollen",
                    "color": 16711680,
                    "description": "Der User <@!" + userid + "> besitzt nun die <@&" + roleid + "> Rolle"
                }]
            )
            break;

        case "remove":
            if (global.teamroles[userid].includes(roleid)) {
                let newRoles = JSON.parse("[]");
                global.teamroles[userid].forEach(role => {
                    if (role != roleid) newRoles.push(role);
                })
                global.teamroles[userid] = newRoles
                //global.teamroles[userid] = JSON.parse(JSON.stringify(global.teamroles[userid]).replace("\"" + roleid.toString() + "\"", ""))
                GLOBAL_SQL.execute(SQL, "ROLECOMMAND_ROLEREMOVE_DELETE", "DELETE FROM userroles WHERE userid = ? AND roleid = ?", [userid, roleid])
                EXECUTER_REPLY.go(
                    client,
                    interaction,
                    "",
                    [{
                        "title": "Teamrollen",
                        "color": 16711680,
                        "description": "Der User <@!" + userid + "> besitzt nun nicht mehr die <@&" + roleid + "> Rolle"
                    }]
                )
                break;
            }
            EXECUTER_REPLY.go(
                client,
                interaction,
                "",
                [{
                    "title": "Teamrollen",
                    "color": 16711680,
                    "description": "Der User <@!" + userid + "> hat die <@&" + roleid + "> Rolle nicht"
                }]
            )
            break;

        case "list":
            let roles = ""
            if (global.teamroles[userid] != null) {
                for (let i = 0; i < global.teamroles[userid].length; i++) {
                    roles += "<@&" + global.teamroles[userid][i] + ">\n"
                }
                EXECUTER_REPLY.go(
                    client,
                    interaction,
                    "",
                    [{
                        "title": "Teamrollen",
                        "color": 16711680,
                        "description": "Rollen, die <@!" + userid + "> beim Joinen wieder bekommt:\n\n" + roles
                    }]
                )
                break;
            }
            EXECUTER_REPLY.go(
                client,
                interaction,
                "",
                [{
                    "title": "Teamrollen",
                    "color": 16711680,
                    "description": "<@!" + userid + "> bekommt keine Rollen beim Joinen:"
                }]
            )
            break;
    }
}

module.exports = EXECUTER_COMMAND_ROLE