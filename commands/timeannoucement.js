const {SlashCommandBuilder} = require('@discordjs/builders');
const Utils = require('../utils/usefull_functions');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('timedannounce')
        .setDescription('User types in announcement message').addStringOption(option =>
            option.setName('message')
                .setDescription('the message')
                .setRequired(true))/*.addIntegerOption(options =>
            options.setName('hours')
                .setDescription('choose time')
                .setRequired(true))*/,
    async execute(interaction) {

        const userinput = interaction.options.getString('message');
        //let inputhours = interaction.options.getInteger('hours');
        await Utils.wait(1);
        //const channelinput =
        interaction.reply(userinput);
    },
};





