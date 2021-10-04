// const Utils = require('../utils/usefull_functions');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announcement').addStringOption(option =>
			option.setName('string')
				.setDescription('write your message')
				.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('input');
		await interaction.reply(message);
	},
};