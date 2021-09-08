const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('purges a given number of chat messeges'),
    async execute(interaction,message,args)
    {
        var purgeamnt = args[0];
        var purgelimit = Number(purgeamnt) + 1;
        message.channel.messages.fetch({ limit: purgelimit }).then(messages => {
            message.channel.bulkDelete(messages);
            message.reply("deleted " + messages.array().length + " messages, including deletion command.");
        }).catch(err => {
            message.channel.send("Failed to delete messages. This may be caused by attempting to delete messages that are over 2 weeks old.");
        });
    },
};