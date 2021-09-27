const {SlashCommandBuilder} = require('@discordjs/builders');
const Utils = require('../utils/usefull_functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('purges a given number of chat messages').addIntegerOption(option =>
            option.setName('input')
                .setDescription('The amount of messages to delete MAX: 100')
                .setRequired(true)).addStringOption(option =>
            option.setName('description')
                .setDescription('Why did u choose to purge channel')
                .setRequired(true)),
    async execute(interaction) {
        // const args = message.content
        const amount = interaction.options.getInteger('input');
        let guild = await interaction.guild.fetch(interaction.guild_id)
        let member = await guild.members.cache.get(interaction.user.id);
        const { Permissions } = require('discord.js');
        if (!member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            interaction.reply('you do not have enough permissions')
            return console.log(`This member: ${member}does not have permissions`);
        }
        if (isNaN(amount)) {
            return interaction.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return interaction.reply('you need to input a number between 2 and 99.');
        }

        interaction.channel.bulkDelete(amount, true).then(messages => {
            messages.forEach((m)=>{Utils.log(`Message: '${m.content}' Has been deleted`, interaction.user.id, m.author.id);});
        }).catch(console.error);
        return interaction.reply('messages has ben purged')

    },
};