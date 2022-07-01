var AUTOMOD_WORDS = {};
const GLOBAL_WEBHOOKS = require("../GLOBAL/WEBHOOKS.js") // Webhooks Manager

AUTOMOD_WORDS.go = async function(global, client, message) {
    try {
        if (message.member == null) return;
        if (message.guild != null) {
            if (message.author.id != client.user.id) {
                if (message.content == '') return;
                let teammember = false;
                if(message.member.permissions.has("ADMINISTRATOR")) teammember = true;

                message.member.roles.cache.forEach((role) => {
                    if(global.cache.roles.linkproved.includes(role.id)){
                        teammember = true;
                    }
                })
                var filter = global.automod.filter
                let messageContent = message.content.toString().toLowerCase()
                if (messageContent.includes("ß")) messageContent = messageContent.replaceAll("ß", "ss")
                messageContent = messageContent.normalize("NFD").replace(/\p{Diacritic}/gu, "")
                let cleanedmsg = filter.clean("content: " + messageContent)
                if (("content: " + messageContent) != cleanedmsg) {
                    if (!teammember) {
                        message.deleteReason = "**[AutoMod.Words]**\n```" + findDiff(cleanedmsg.toLowerCase(), "content: " + message.content.toString().toLowerCase()) + "```"
                        if (message != null) await message.delete({reason: "Wordblacklist"}).catch()
                        //log(findDiff(cleanedmsg.toLowerCase(), "content: " + message.content.toString().toLowerCase()), global, message)
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function findDiff(str1, str2){
    let diff= "";
    str2.split('').forEach(function(val, i){
        if (val != str1.charAt(i))
            diff += val ;
    });
    return diff;
}

function log(word, global, message) {
    GLOBAL_WEBHOOKS.go(global.servers[message.guild.id].serverlog, [
            {
                "title": "[AUTOMOD.WORDS]",
                "description": "```"+word+"```",
                "color": 16730184
            }
        ]
    )
}

module.exports = AUTOMOD_WORDS;