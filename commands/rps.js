const Utils = require('../utils/usefull_functions');
const {SlashCommandBuilder} = require('@discordjs/builders');
const elements = [
    {value: 'rock', win: 'scissors', lose: 'paper'},
    {value: 'scissors', win: 'paper', lose: 'rock'},
    {value: 'paper', win: 'rock', lose: 'scissors'}
];

function calculateResult(a, b) {
    if (a.win === b.value) return 'win';
    if (a.lose === b.value) return 'loose';
    return 'draw';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('rock paper scissors').addStringOption(option =>
            option.setName('string')
                .setDescription('which option to choose')
                .setRequired(true).addChoice("rock", "rock").addChoice("paper", "paper").addChoice("scissors", "scissors")),
    async execute(interaction) {
        const playerChoice = elements.find((obj) => {
            if (obj.value === interaction.options.getString('string').toLowerCase()) return obj;
            return null
        });
        const botChoice = elements[Math.floor(Math.random() * 3)];

        let result = await Utils.advancedSelect("points","leaderboard","u_token = ?",[`${interaction.user.id}`])

        let points = result[0].points;
        if (result === []){
            points = 0;
        }
        if (calculateResult(playerChoice, botChoice) === 'win') points = points + 2;
        if (calculateResult(playerChoice, botChoice) === 'draw') points = points + 1;
        if (calculateResult(playerChoice, botChoice) === 'loose') points = points - 3;
        if (points < 1) points = 0;

        Utils.upsertLeaderBoard(interaction.user, interaction.guild.id, points);
        return interaction.reply('you ' + calculateResult(playerChoice, botChoice) + ' bot choose ' + botChoice.value)
    },
};