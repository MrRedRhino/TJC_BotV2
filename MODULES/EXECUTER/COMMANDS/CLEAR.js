var EXECUTER_COMMANDS_CLEAR = {};

const GLOBAL_DEBUG = require("../../GLOBAL/DEBUG.js") // Debug System (log)
const EXECUTER_REPLY = require("../REPLY.js") // Reply System (command)
const GLOBAL_SQL = require("../../GLOBAL/SQL.js")
const GLOBAL_BUTTONS = require("../../GLOBAL/BUTTONS.js")

EXECUTER_COMMANDS_CLEAR.command = async function(global, client, SQL, interaction, guild, member, channel) {
    
    // Set Var
    let anzahl = interaction.data.options[0].value
    let targetmember = false

    // Check, if Member is there
    if(typeof(interaction.data.options[1]) != "undefined"){
        targetmember = await guild.members.fetch(interaction.data.options[1].value)
    }
    
    // Idiot reply
    if(anzahl <= 0) {
        EXECUTER_REPLY.go(client, interaction, "",
        [{
            "title": "Gebe eine Anzahl an, mit der man auch arbeiten kann!1!1",
            "color": 16724016
        }])

        return;
    }

    // Bulkdelete @everyone
    if(!targetmember){
        channel.bulkDelete(anzahl)
        .then(() => {
            EXECUTER_REPLY.go(client, interaction, "",
            [{
                "title": `Es wurden ${anzahl} Nachrichten gelöscht`,
                "color": 7012144
            }])
        })
    }
    
    // Bulkdelete @user
    else {
        // geklaut von https://stackoverflow.com/questions/61691549/bulk-delete-messages-by-user-in-discord-js


        // Fetch Messages from Channel
        channel.messages.fetch({
            limit: 100
        }).then((messages) => { 
            const botMessages = [];
            const filterMessages = [];
            messages.filter(m => m.author.id === targetmember.id).forEach(msg => botMessages.push(msg))

            // Only Filter first ${anzahl} Messages
            for(i = 0; i < anzahl; i++){
                if(typeof(botMessages[i]) == "undefined") {
                    break;
                }
                filterMessages.push(botMessages[i])
            }

            channel.bulkDelete(filterMessages)
            .then(() => {
                EXECUTER_REPLY.go(client, interaction, "",
                    [{
                        "title": `Es wurden ${anzahl} Nachrichten von ${targetmember.displayName} gelöscht`,
                        "color": 7012144
                    }])
            });
        })
    }
}


module.exports = EXECUTER_COMMANDS_CLEAR