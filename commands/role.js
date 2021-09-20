const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('gives chosen user a rank').addStringOption(option =>
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
        let roleName = await interaction.options.getString('role');
        let role = await guild.roles.cache.find(r => r.name == roleName);
        if (!role) {
            return interaction.reply("the role doesn't exist");
        }
        if (!member) {
            return interaction.reply("the user doesn't exist");
        }
        for (let i = 0; i < member._roles.length; i++) {
            if (role.id == member._roles[i]) {
                return interaction.reply(user.username + " har allerade rollen " + role.name);
            }
        }
        await member.roles.add(role);
        return interaction.reply('role: ' + roleName + ' has been added to user: ' + user.username)
    },
};