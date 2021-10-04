const Utils = require('../utils/usefull_functions');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Announcement').addStringOption(option =>
            option.setName('string')
                .setDescription('which option to choose')
                .setRequired(true).addChoice("rock", "rock").addChoice("paper", "paper").addChoice("scissors", "scissors")),
    async execute(interaction) {
const message = interaction.options.getString('input');



    },
};