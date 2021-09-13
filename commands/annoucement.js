const {SlashCommandBuilder} = require('@discordjs/builders');
//const mentionable = interaction.options.getMentionable('mentionable');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('announce')
        //.addMentionableOption(option =>option.setName('mentionable').setDescription('Announce'))
        .setDescription('Replies with announcement'),

    async execute(interaction)
    {
        await interaction.reply('Hej @everyone there is an announcement');

    }

    }

//Automatically @everyone