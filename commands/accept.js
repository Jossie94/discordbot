const {SlashCommandBuilder} = require("@discordjs/builders");
const { Client, Intents, message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('gives user a rank').addStringOption(option =>
            option.setName('input')
                .setDescription('rank')
                .setRequired(true)),
    async execute(interaction) {
        let guild = await client.guilds.fetch(interaction.guild_id)
        let member = guild.members.cache.get(interaction.member.user.id);
        let role = guild.roles.cache.find(r => r.name === interaction.options.getString('string').toLowerCase());
        if (!role)
            return console.log("the role doesn't exist");
        await member.roles.add(role);
        return interaction.reply('role: '+interaction.options.getString('string').toLowerCase()+' has been added to user: '+interaction.user.name)

    },
};