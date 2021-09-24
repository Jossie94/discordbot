const mysql = require('mysql');
const Utils = require('../utils/usefull_functions');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        Utils.upsertUser(interaction.user, interaction.guild.id);//create or update caster in the database
        switch (interaction.commandName) {
            case 'purge':
                let description = (interaction.options.getString('description') === null) ? 'No description' : interaction.options.getString('description')
                Utils.log(`${interaction.user.username} deleted ${interaction.options.getInteger('input')} messeges with the reason '${description}'`,interaction.user.id);
                break;
            case 'role':
                let options = interaction.options;
                let role = options._hoistedOptions[0].value;
                Utils.upsertUser(options._hoistedOptions[1].user, interaction.guild.id);//creates or updates target of command
                Utils.log(`${interaction.user.username} Tried to give role: ${role} to user: ${options._hoistedOptions[1].user.username}`,interaction.user.id,options._hoistedOptions[1].user.id);
                break;
        }
    },
};