const {SlashCommandBuilder} = require('@discordjs/builders');

const elements = [
    {value: 'rock', win: 'scissors', lose: 'paper'},
    {value: 'scissors', win: 'paper', lose: 'rock'},
    {value: 'paper', win: 'rock', lose: 'scissors'}
];

function test(a, b) {
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
                .setRequired(true)),
    async execute(interaction) {
        // const args = message.content
        const playerChoice = elements.find((obj) => {
            if (obj.value === interaction.options.getString('string').toLowerCase()) return obj;
            return null
        });
        console.log(interaction.options.getString('string').toLowerCase());
        if (interaction.options.getString('string').toLowerCase() !== 'rock' && interaction.options.getString('string').toLowerCase() !== 'paper' && interaction.options.getString('string').toLowerCase() !== 'scissor' && interaction.options.getString('string').toLowerCase() !== 'scissors') {
            return interaction.reply('you done fucked upppppppp and choose a non existent option: ' + interaction.options.getString('string').toLowerCase())
        }
        const botChoice = elements[Math.floor(Math.random() * 3)];

        return interaction.reply('you ' + test(playerChoice, botChoice) + ' bot choose ' + botChoice.value)
    },
};