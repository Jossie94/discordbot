const {SlashCommandBuilder} = require('@discordjs/builders');
const Utils = require('../utils/usefull_functions');

module.exports.wait = function wait(hours) {
    return new Promise((resolve) => {
        for (let i = 0; i <= hours; i++) {
            setTimeout(resolve, 3600000);
        }
    });
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timedannounce')
        .setDescription('User types in announcement message').addStringOption(option =>
            option.setName('input')
                .setDescription('the message')
                .setRequired(true)).addIntegerOption(option =>
            option.setName('hours')
                .setDescription('choose time')
                .setRequired(true)),
    async execute(interaction) {
        const userinput = interaction.options.getString('input');
        let inputhours = interaction.options.getInteger('hours');
        //const channelinput =
        await interaction.reply(userinput,' ' + inputhours);
    },
};





