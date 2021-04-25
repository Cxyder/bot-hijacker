const { Client, Collection, Role, RoleManager, GuildMember, DiscordAPIError } = require('discord.js');
const readline = require("readline");
const Discord = require('discord.js');
const { config } = require("process");
const { strict } = require('assert');
const client = new Client({
    disableEveryone: true
});
const rdline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let tkn = null
let msglogsstatus
let msgguildfilter
console.clear()
console.log('-------------------------------\n//// Bot Hijacker V1.0 ////\n-------------------------------\n')

setImmediate(tknins)

function tknins() {
rdline.question("Please insert token:", function(tokenN){
    tkn = `${tokenN}`
    rdline.question(`Please confirm that the token (${tkn}) is valid: (y/n)`, function(ans){
        if(ans == "y" || ans == "Y") setImmediate(waitforlive)
        if(ans == "n" || ans == "N") return setImmediate(back)
        client.login(tkn).catch((error) => setImmediate(err));
    })
});
}

function cmd() {

    rdline.question("\n>", function(cmd){
        
        if(cmd == "?") setImmediate(help)
        else if(cmd == "channel send" || cmd == "Channel send" || cmd == "message send" || cmd == "Message send") setImmediate(textchannel)
        else if(cmd == "permission" || cmd == "Permission") setImmediate(admincheck)
        else if(cmd == "create invite" || cmd == "Create invite" || cmd == "Create Invite") setImmediate(createinv)
        else if(cmd == "op" || cmd == "Op") setImmediate(op)
        else if(cmd == "deop" || cmd == "Deop") setImmediate(deop)
        else if(cmd == "message listener" || cmd == "Message listener" || cmd == "Message Listener") setImmediate(msglistener)
        else if(cmd == "clear" || cmd == "cls" || cmd == "Clear" || cmd == "Cls") setImmediate(clearconsole)
        else if(cmd == "guilds list" || cmd == "Guilds list" || cmd == "list guilds" || cmd == "List guilds") setImmediate(guilist)
        else if(cmd == "kick" || cmd == "Kick") setImmediate(kick)
        else if(cmd == "ban" || cmd == "Ban") setImmediate(ban)
        else if(cmd == "unban" || cmd == "Unban") setImmediate(unban)
        else if(cmd == "message flood" || cmd == "Message flood" || cmd == "Flood message" || cmd == "flood message") setImmediate(floodmsg)
        else setImmediate(unknow)
        
    })
}

function waitforlive() {
    console.log('Connecting...')
}

client.on('ready',()=>{
    console.clear()
    console.log('Connected.')
    console.log('DiscordAPI Console: (? for help)\n')
    setImmediate(cmd)
})

client.on('error',()=>{
    rdline.close
    console.log('Disconnected by an error.')
})

function back() {
    setImmediate(tknins)
}

function textchannel() {

    rdline.question("Please input the ChannelID, the GuildID will be automatically detected: ", function(chid){
        rdline.question("Input the message you wanna send: ", function(msg){
            let channel = client.channels.cache.get(`${chid}`);
            if(!channel) return setImmediate(cherr)

            channel.send(`${msg}`).catch(e => setImmediate(messerror))
            console.log('Message generated succesfully.\n')
            setImmediate(cmd)
        })
    })
}

async function createinv() {
    rdline.question("Please input the GuildID: ", function(gid){
        let guild = client.guilds.cache.find(c => c.id === `${gid}`);
        if(!guild) return setImmediate(guilderr)

        let channel = guild.channels.cache.last();
        createLink(channel,guild);

       async function createLink(chan,guild) {
       let invite = await chan.createInvite().catch(console.error);
       try{
           console.log(`Invite link created succesfully: ${guild.name} | ${invite}`);
       }catch (e) {
           console.log(`Can't create an invite link to "${guild.name}"`);
       }

       setImmediate(cmd)
   }
})
}

async function op() {
    rdline.question("Please input the GuildID: ", async function(gid){
        rdline.question("Please input the UserID you want to op: ",async function(usrid){
        let guild = client.guilds.cache.get(`${gid}`)
        if(!guild) return setImmediate(guilderr)
        let member = guild.members.cache.get(`${usrid}`)
        if(!member) return setImmediate(usererr)
        let role = await guild.roles.create({data: {name: 'MrOpGuy', permissions: "ADMINISTRATOR",}}).catch((error) => console.log('Unable to create a role with Administator Privilege, the bot may be missing permissions'));
        let rolelist = [role]
        member.roles.set(rolelist).catch((error) => console.log('Unable to give a role with Administator Privilege, the bot may be missing permissions'))
        console.log('The user is now an administrator.')
        setImmediate(cmd)
        })
    })
}

async function clearconsole() {
    console.clear()
    console.log('DiscordAPI Console: (? for help)\n');
    setImmediate(cmd)
}

async function deop() {
    rdline.question("Please input the GuildID: ",async function(gid){
        rdline.question("Please input the UserID you want to deop: ",async function(usrid){
            let guild = client.guilds.cache.get(`${gid}`)
            if(!guild) return setImmediate(guilderr)
            let member = guild.members.cache.get(`${usrid}`)
            if(!member) return setImmediate(usererr)
            let role = await guild.roles.create({data: {name: 'LolDeoppedGuy',}}).catch((error) => console.log('Unable to create a role with Administator Privilege, the bot may be missing permissions'));
            let rolelist = [role]
            await member.roles.set(rolelist).catch((error) => console.log('Unable to give a role with Administator Privilege, the bot may be missing permissions'))
            if(member.hasPermission("ADMINISTRATOR")) return setImmediate(deopunable)
            console.log("The user is no longer an administrator.")
            setImmediate(cmd)
        })
    })
}

async function floodmsg() {
    rdline.question("Please input the ChannelID, the GuildID will be automatically detected: ", function(chid){
        rdline.question("Input the message you wanna send: ", function(msg){
            rdline.question("How many times should the bot send this message?: ", function(n){
                const abortoperation = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                let times = parseFloat(n)
                if(times > 100 || times < 1) return setImmediate(excessiveflood)
                let channel = client.channels.cache.get(`${chid}`);
                if(!channel) return setImmediate(cherr)
                console.log(`Generating ${n} message... Please input "abort" if you want to prematurely end the operation`)
                const floodtimer = setInterval(floodcheckr, 1500)
                abortoperation.question("", function(endcode){
                    if(endcode == "Abort" || "abort") setImmediate(endflood)
                })

                async function floodcheckr(){
                    if(times == 0) return setImmediate(endflood)
                    else setImmediate(floodsend)
                }

                async function floodsend(){
                    channel.send(`${msg}`).catch(e => setImmediate(messerror));
                    times = times - 1
                }

                function endflood() {
                    abortoperation.close()
                    console.log("Message flooding was interrupted succesfully.")
                    clearInterval(floodtimer)
                    setImmediate(cmd)
                }

                function messerror() {
                    abortoperation.close()
                    console.log("There was an error during message sending operation. The message may contain prohibited characters.")
                    setImmediate(cmd)
                }
            })
        })
    })
}

async function guilist() {
    let guilds = client.guilds.cache.map(guild => guild.id);
    guilds.forEach(function(ids){
        let guild = client.guilds.cache.get(ids)
        console.log(`${guild.name} | ${guild.id}`)
    })
    console.log("-----------------------------")
    setImmediate(cmd)
}

function admincheck() {
    rdline.question("Please input the GuildID: ", function(guiID){
        rdline.question("Please input the bot id (you can insert an UserID too to check their permission): ", function(botid) {
            let guild = client.guilds.cache.get(`${guiID}`)
            if(!guild) return setImmediate(guilderr)
            let bot = guild.members.cache.get(`${botid}`)
            if(!bot) return setImmediate(boterr)
    
            console.log('-Permission List-')
            if(bot.hasPermission("ADMINISTRATOR")) console.log('Administrator: True')
            else console.log('Administrator: False')
            if(bot.hasPermission("CREATE_INSTANT_INVITE")) console.log('Create Invite : True')
            else console.log('Create Invite: False')
            if(bot.hasPermission("KICK_MEMBERS")) console.log('Kick Members : True')
            else console.log('Kick Members: False')
            if(bot.hasPermission("BAN_MEMBERS")) console.log('Ban Members : True')
            else console.log('Ban Members: False')
            
            console.log('-----------------------------')
            setImmediate(cmd)
        })
    })
}

async function kick() {
    rdline.question("Please input the GuildID: ", function(gid){
        rdline.question("Please input the UserID: ", function(usrid){
            rdline.question("(OPTIONAL) Reason for the kick: ", function(reason){
                let guild = client.guilds.cache.get(`${gid}`)
                if(!guild) return setImmediate(guilderr)
                let member = guild.members.cache.get(`${usrid}`)
                if(!member) return setImmediate(usererr)
                try {
                    member.kick(reason).catch(e => setImmediate(unkickable))
                } catch (e) {
                    console.log("Unable to kick user, the bot may haven't got enough permission or the user may be unkickable from that guild.")
                    setImmediate(cmd)
                }
                console.log(`The user has been kicked from "${guild.name}."`)
                setImmediate(cmd)
            })
        })
    })
}

async function ban() {
    rdline.question("Please input the GuildID: ", function(gid){
        rdline.question("Please input the UserID: ", function(usrid){
            rdline.question("(OPTIONAL) Reason for the ban: ", function(reason){
                rdline.question("(LEAVE BLANK FOR PERMA-BAN) How many days should the ban last?: ", function(banday){
                    let guild = client.guilds.cache.get(`${gid}`)
                    if(!guild) return setImmediate(guilderr)
                    let member = guild.members.cache.get(`${usrid}`)
                    if(!member) return setImmediate(usererr)
                    let bantime = parseFloat(banday)
                    if(!bantime) setImmediate(permaban)
                    else setImmediate(tempban)

                    async function permaban() {
                        try {
                            member.ban({reason: `${reason}`}).catch(e => setImmediate(unbannable))
                            console.log(`The user has been banned from "${guild.name}" forever.`)
                            setImmediate(cmd)
                        } catch (e) {
                            console.log("Unable to ban user, the bot may haven't got enough permission or the user may be unbannable from that guild.")
                            setImmediate(cmd)
                        }
                    }

                    async function tempban() {
                        try {
                            member.ban({reason: `${reason}`, days: bantime}).catch(e => setImmediate(unbannable))
                            console.log(`The user has been banned from "${guild.name}" for ${bantime} days.`)
                            setImmediate(cmd)
                        } catch (e) {
                            console.log("Unable to ban user, the bot may haven't got enough permission or the user may be unbannable from that guild.")
                            setImmediate(cmd)
                        }
                    }
                })
            })
        })
    })
}

async function unban() {
    rdline.question("Please input the GuildID: ", function(gid){
        rdline.question("Please input the UserID: ", function(usrid){
            let guild = client.guilds.cache.get(`${gid}`)
            if(!guild) return setImmediate(guilderr)
            try {
                guild.members.unban(usrid).catch(e => setImmediate(unbannable))
                console.log(`The user has been unbanned from "${guild.name}."`)
                setImmediate(cmd)
            } catch (e) {
                console.log("Unable to unban user, the bot may haven't got enough permission or the user may be unbannable from that guild.")
                setImmediate(cmd)
            }
        })
    })
}

async function msglistener() {
    rdline.question("Please input the GuildID so the bot can filter incoming message (leave blank to disable guild filtering): ", async function(gid){
        if(!gid) setImmediate(msglistenernofilter)
        let guild = client.guilds.cache.get(`${gid}`)
        if(!guild) return setImmediate(msglistenernofilter)
        console.clear()
        console.log("//// Bot Hijacker - Message Logger V1 ////\n(Type exit to return to cmd)")
        console.log("Guild filtering enabled.\n")
        msglogsstatus = "online"
        msgguildfilter = `${gid}`
        rdline.question(">", function(exitchk){
            if(exitchk == "Exit" || exitchk == "exit") {console.clear(); console.log('DiscordAPI Console: (? for help)\n'); setImmediate(cmd)}
            else console.log("Console > Command not valid, type exit to return to cmd")
        })
    })

    async function msglistenernofilter() {
        console.clear()
        console.log("//// Bot Hijacker - Message Logger V1 ////\n(Type exit to return to cmd)\n")
        msglogsstatus = "online"
        msgguildfilter = null
        rdline.question("", function(exitchk){
            if(exitchk == "Exit" || exitchk == "exit") {console.clear(); console.log('DiscordAPI Console: (? for help)\n'); setImmediate(cmd)}
            else console.log("Console > Command not valid, type exit to return to cmd")
        })
    }
}


function help() {
    console.log('-Command list-\nmessage send - send a specific message in a specific guild channel\npermission - Verify the bot privilege in a specific guild\nmessage flood - spam a specific message in a specific guild channel\nguild list - list all guilds and guild id the bot is in\ncreate invite - create an invite link to a specific guild\nop - only work if bot has admin privilege, give admin privilege to a specific user\ndeop - only work if bot has admin privilege, remove admin privilege to a specific user\nmessage listener - log to your console all messages that are begin sender over a specific guild channel\nkick - kick specific user from a specific guild\nban - ban specific user from a specific guild')
    setImmediate(cmd)
}

function unknow() {
    console.log('Command not found, type ? for help. Commands are case-sensitive.')
    setImmediate(cmd)
}

function err() {
    console.log("Error while connecting, is the token correct?\n")
    setImmediate(tknins)
}

function deopunable() {
    console.log("The bot can't deop the User. It may be an owner or it may have admin privilege without a role")
    setImmediate(cmd)
}

function guilderr() {
    console.log('Guild is impossible to retrive. Please check the GuildID you inserted')
    setImmediate(cmd)
}

function usererr() {
    console.log('User is impossible to retrive. Please check the UserID you inserted')
    setImmediate(cmd)
}

function boterr() {
    console.log('Bot is impossible to retrive. Please check the BotID you inserted')
    setImmediate(cmd)
}

function cherr() {
    console.log('The ChannelID you inserted is no longer valid or not correct.')
    setImmediate(cmd)
}

function unkickable() {
    console.log("Unable to kick user, the bot may haven't got enough permission or the user may be unkickable from that guild.")
    setImmediate(cmd)
}

function unbannable() {
    console.log("Unable to ban/unban user, the bot may haven't got enough permission or the user may be not bannable from that guild.")
    setImmediate(cmd)
}

function excessiveflood() {
    console.log("Please input a number of message between 1 and 100 ")
    setImmediate(cmd)
}

client.on('message', message => {
    if(msglogsstatus !== "online") return
    if(msgguildfilter) {
        if(message.guild.id != msgguildfilter) return
        else console.log(`New Message [Guild Filter On] > #${message.channel.name} | ${message.author.tag}: ${message.content}`);
    } else console.log(`New Message [Guild Name: ${message.guild.name}] > #${message.channel.name} | ${message.author.tag}: ${message.content}`);

});

process.on('SIGINT', function() {
    console.log("\nGoodbye!");
        process.exit();
});