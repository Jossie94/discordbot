//const {AntiSpam} = require('discord-anti-spam');
const {Client, Intents, Collection} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
require('dotenv').config();

//client.login(process.env.TOKEN);

//require('index');
client.on('Anti-spam ready', () => console.log(`${client.user.tag} has logged.`));

const usersMap = new Map();
const LIMIT = 10;
const TIME = 10000;
const DIFF = 2000;

/*
'id' => {
msgCount: 0,
lastMessage: 'message',
timer: fn()
}
 */

client.on('message', message => {
    if (message.author.bot)
        return;
    if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const {lastMessage, timer} = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);
        if(difference > DIFF)
        {
            clearTimeout(timer);
            console.log('Cleared timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            //userData.timer =
        }







        if (parseInt(msgCount) === 5) {
            const role = message.guild.roles.cache.get('881868541329027082');
            message.member.roles.add(role);
            message.channel.send('You have been muted');

        } else {
            msgCount++;
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
        }
    } else {
        usersMap.set(message.author.id,
            {
                msgCount: 1,
                lastMessage: message,
                timer: null
            });
        setTimeout(() => {
    usersMap.delete(message.author.id);
console.log('Removed from map.');
    }, 5000);

    }
});






