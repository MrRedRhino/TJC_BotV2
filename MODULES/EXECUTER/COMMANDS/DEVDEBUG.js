var EXECUTER_COMMANDS_DEVDEBUG = {};

const EXECUTER_REPLY = require("../REPLY.js") // Reply System (command)
const GLOBAL_BUTTONS = require("../../GLOBAL/BUTTONS.js")
const treeify = require("treeify");

let output = ""
async function inject(global, client, SQL, interaction, code) {
    output = ""
    try {
        eval("(async () => {" + code + "})().catch((e) => {output = e})")
    } catch (e) {
        output = e
    }
}


EXECUTER_COMMANDS_DEVDEBUG.command = async function(global, client, SQL, interaction) {
    let code = interaction.data.options[0].value

    let tree = "";

    let isjson = false

    if (interaction.data.options[0] && interaction.data.options[1].value) {
        isjson = true
    }

    await inject(global, client, SQL, interaction, code)

    if(isjson){
        tree = treeify.asTree(JSON.parse(JSON.stringify(output)), true)
    }
    
    //await client.users.fetch(interaction.member.id).then(member => console.log(member))

    EXECUTER_REPLY.go(
        client,
        interaction,
        "",
        [
            {
                "title": "> Debug [EVAL]",
                "description": "```" + `${(isjson) ? tree : output}` + "```",
                "color": global.colors.green,
            }
        ]
    )
}

module.exports = EXECUTER_COMMANDS_DEVDEBUG