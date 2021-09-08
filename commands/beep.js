const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beep')
        .setDescription('Replies with boop'),
    async execute(interaction)
    {
        console.log('hit');
        await interaction.reply('Boop!');
    },
};
