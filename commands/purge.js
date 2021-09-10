const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('purges a given number of chat messeges').addIntegerOption(option =>
            option.setName('input')
                .setDescription('The amount of messages to delete')
                .setRequired(true)),
    async execute(interaction) {
        // const args = message.content
        const amount = interaction.options.getInteger('input');

        if (isNaN(amount)) {
            return interaction.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return interaction.reply('you need to input a number between 2 and 99.');
        }

        interaction.channel.bulkDelete(amount, true)
        return interaction.reply('messages has ben dead\'ed')

    },
};