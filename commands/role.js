// noinspection EqualityComparisonWithCoercionJS

const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('gives chosen user a rank').addRoleOption(option =>
            option.setName('role')
                .setDescription('role to give user')
                .setRequired(true)).addUserOption(option =>
            option.setName('target')
                .setDescription('user to give role')
                .setRequired(true)),
    async execute(interaction) {
        let user = await interaction.options.getUser('target');
        let guild = await interaction.guild.fetch(interaction.guild_id)
        let member = await guild.members.cache.get(user.id);
        if (guild.owner || !member.roles.cache.some(role => role.name === 'test' || role.name === 'Admin')) {
            return interaction.reply('you do not have high enough permissions')
        }
        let role = interaction.options.getRole('role');
        // noinspection EqualityComparisonWithCoercionJS
        // role = await guild.roles.cache.find(r => r.name == role.name);
        if (!role) {
            return interaction.reply("the role doesn't exist");
        }
        if (!member) {
            return interaction.reply("the user doesn't exist");
        }
        for (let i = 0; i < member._roles.length; i++) {
            if (role.id == member._roles[i]) {
                await member.roles.remove(role);
                return interaction.reply(`role: ${role} has been removed from ${member}`);
            }
        }
        await member.roles.add(role);
        return interaction.reply('role: ' + role.name + ' has been added to user: ' + user.username)
    },
};