const Utils = require('../utils/usefull_functions');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        Utils.upsertUser(interaction.user, interaction.guild.id);
        switch (interaction.commandName) {
            case 'purge':
                let description = (interaction.options.getString('description') === null) ? 'No description' : interaction.options.getString('description')
                Utils.log(`${interaction.user.username}#${interaction.user.delimiter} deleted ${interaction.options.getInteger('input')} messages with the reason '${description}'`,interaction.user.id);
                break;
            case 'role':
                let options = interaction.options;
                let role = options._hoistedOptions[0].value;
                Utils.upsertUser(options._hoistedOptions[1].user, interaction.guild.id);
                Utils.log(`${interaction.user.username}#${interaction.user.delimiter} Tried to give role: ${role} to user: ${options._hoistedOptions[1].user.username}`,interaction.user.id,options._hoistedOptions[1].user.id);
                break;
            case 'announcement':
                //let options = interaction.options;
                Utils.log(`${interaction.user.username}#${interaction.user.delimiter} Sent announcement in: ${interaction.options.getChannel('channel')} with the message: ${interaction.options.getString('message')}`, interaction.user.id);
                break;
            case 'timedannounce':
                Utils.log(`${interaction.user.username}#${interaction.user.delimiter} Sent timed announcement in: ${interaction.options.getChannel('channel')} in ${interaction.options.getInteger('hours')} hours with the message ${interaction.options.getString('message')}`, interaction.user.id);
                break;

        }
    },
};