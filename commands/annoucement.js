const Utils = require('../utils/usefull_functions');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announcement').addStringOption(option =>
			option.setName('message')
				.setDescription('write your message')
				.setRequired(true)).addChannelOption(option =>
		option.setName('channel')
			.setDescription('type in channel')
			.setRequired(true)),
	async execute(interaction) {
				const message = interaction.options.getString('message');
				const channel = interaction.options.getChannel('channel');
				await interaction.reply('Sent to channel '+ channel.name);
				channel.send(message);

		//let channel = interaction.channel.getString('input');

	},
};