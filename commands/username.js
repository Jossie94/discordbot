const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with username'),
    async execute(interaction)
    {
        await interaction.reply(`Your username: ${interaction.user.username}\nYour id: ${interaction.user.id}`);
    }
}