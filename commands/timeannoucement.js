const {SlashCommandBuilder} = require('@discordjs/builders');
const Utils = require('../utils/usefull_functions');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('timedannounce')
        .setDescription('User types in announcement message').addStringOption(option =>
            option.setName('message')
                .setDescription('the message')
                .setRequired(true)).addIntegerOption(options =>
            options.setName('hours')
                .setDescription('choose time')
                .setRequired(true)).addChannelOption(options =>
        options.setName('channel')
            .setDescription('Choose channel')
            .setRequired(true)),

    async execute(interaction) {

        const userinput = interaction.options.getString('message');
        const inputhours = interaction.options.getInteger('hours');
        const channelinput = interaction.options.getChannel('channel');
        interaction.reply('Sent commando');
        await Utils.wait(inputhours);
        channelinput.send(userinput);

    },
};





