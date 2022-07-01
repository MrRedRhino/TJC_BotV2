var AUTOMOD_LINKS = {};
const GLOBAL_WEBHOOKS = require("../GLOBAL/WEBHOOKS.js") // Webhooks Manager

const anchorme = require("anchorme").default // NPM Um Texte von Links zu unterscheiden
const dns2 = require("dns2")

const options = {
    dns: '1.1.1.1'
};
const dns = new dns2(options);

function getAllLinks(input) {
    return anchorme({input})
}

function removeFormat(input) {
    let output = input.toLowerCase()
    if (input.includes("̸")) output = output.replaceAll("̸", "/")
    if (input.includes("[.]")) output = output.replaceAll("[.]", ".")
    if (input.includes(" [.] ")) output = output.replaceAll(" [.] ", ".")
    if (input.includes("(.)")) output = output.replaceAll("(.)", ".")
    if (input.includes(" . ")) output = output.replaceAll(" . ", ".")
    if (input.includes(" .")) output = output.replaceAll(" .", ".")
    if (input.includes(". ")) output = output.replaceAll(". ", ".")
    if (input.includes(" (.) ")) output = output.replaceAll(" (.) ", ".")
    if (input.includes(",")) output = output.replaceAll(",", ".")
    if (input.includes("/.")) output = output.replaceAll("/.", ".")
    if (input.includes("./")) output = output.replaceAll("./", ".")
    if (input.includes("܁")) output = output.replaceAll("܁", ".")
    if (input.includes("\\/")) output = output.replaceAll("\\/", "/")
    if (input.includes("\/")) output = output.replaceAll("\/", "/")
    if (input.includes("\\")) output = output.replaceAll("\\", "")
    if (input.includes("[punkt]")) output = output.replaceAll("[punkt]", ".")
    if (input.includes(" punkt ")) output = output.replaceAll(" punkt ", ".")
    if (input.includes("(Punkt)")) output = output.replaceAll("(Punkt)", ".")
    if (input.includes("(punkt)")) output = output.replaceAll("(punkt)", ".")
    if (input.includes("*")) output = output.replaceAll("*", "")
    if (input.includes("`")) output = output.replaceAll("`", "")
    if (input.includes("~")) output = output.replaceAll("~", "")
    if (input.includes("_")) output = output.replaceAll("_", "")
    if (input.includes("\n")) output = output.replaceAll("\n", "")
    if (input.includes("..")) output = output.replaceAll("..", ".")
    if (input.includes("@")) output = output.replaceAll("@", " ")
    if (input.includes("?")) output = output.replaceAll("?", "")
    if (input.includes("=")) output = output.replaceAll("=", "")
    return output
}

AUTOMOD_LINKS.go = async function(global, client, message, SQL) {
    let messageDeleted = false
    if(message.member == null) return // Return, if no Member found (Webhook)
    let tmp = false; // Set Roles-Check to false
    if(message.member.permissions.has("ADMINISTRATOR")) {tmp = true} // Set Check to true if Administrator
    // Check, if Member has Link Proved Role
    message.member.roles.cache.forEach((role) => {
        if(global.cache.roles.linkproved.includes(role.id)){
            tmp = true;
        }
    })
    if (tmp) return

    let deleteAble = false
    let Blockedlink = ""
    let messageContent = removeFormat(message.content.toLowerCase())
    messageContent = messageContent.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    let checkedMessage = getAllLinks(messageContent)

    if (checkedMessage.includes("<a href=\"") || checkedMessage.includes("<iframe src=\"")) {
        let splitedMSG = "";
        if (checkedMessage.includes("<a href=\"")) splitedMSG = checkedMessage.split("<a href=\"")
        if (checkedMessage.includes("<iframe src=\"")) splitedMSG = checkedMessage.split("<iframe src=\"")
        splitedMSG.forEach(async (unparsedLink) => {
            if (unparsedLink != splitedMSG[0]) {
                let link = unparsedLink.split("\"")[0]
                let whitelistedLink = global.cache.whitelist.find(string => link.includes(string))
                if (link != null && whitelistedLink == undefined) {    
                    let allowed = true;
 					let parsedLink = link.split(">")[0].split("//")[1].split("/")[0];
                    const response = await dns.resolve(parsedLink);
                    if (response.answers.length > 0) {
                        allowed = false;
                    } else {
                        if (response.authorities.length > 0) {
                            if (parsedLink.endsWith(response.authorities[0].name)) {
                                allowed = true;
                            } else {
                                allowed = false;
                            }
                        } else {
                            allowed = true;
                        }
                    }
                    
                    if (parsedLink == "tenor.com") allowed = false;
                    if (parsedLink == "bit.ly") allowed = false;

                    if (parsedLink.match(/^\d/)) {
                        if (parsedLink.startsWith("192.168.") || parsedLink.startsWith("10.") || parsedLink.startsWith("172.18.")) {
                            allowed = true;
                        } else {
                           if (response.questions != null) {
                                allowed = false;
                            }
                        }
                    }

                    if(!allowed) {
                        if (!deleteAble) {
                            deleteAble = true
                            Blockedlink = link
                        }
                        if (!messageDeleted) {
                            messageDeleted = true;
                            /*await GLOBAL_WEBHOOKS.go(global.servers[message.guild.id].serverlog, [
                                    {
                                        "title": "[AUTOMOD.LINKS]",
                                        "description": "```" + Blockedlink + "```",
                                        "color": 16730184
                                    }
                                ]
                            )*/
                            message.deleteReason = "**[AutoMod.Links]**\n```" + Blockedlink + "```";
                            if (message != null) await message.delete()
                            SQL.execute("INSERT INTO usedLinks (`link`) VALUES (?) ON DUPLICATE KEY UPDATE count = (count+1)", [Blockedlink])
                            return;
                        }
                    }

                }
            }
        })
    }
}

module.exports = AUTOMOD_LINKS