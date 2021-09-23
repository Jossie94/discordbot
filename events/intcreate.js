const mysql = require('mysql');
const Utils = require('../utils/usefull_functions');
const {host,user,password,database} = require('../config.json')
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        let time = Date.now();
        Utils.upsertUser(interaction.user, interaction.guild.id);//create or update caster in the database
        switch (interaction.commandName) {
            case 'purge':
                let description = (interaction.options.getString('description') === null) ? 'No description' : interaction.options.getString('description')
                con.query(`INSERT INTO log (command, caster, timestamp)
                           VALUES ("${interaction.user.username} deleted ${interaction.options.getInteger('input')} messeges with the reason '${description}'",
                                   ${interaction.user.id}, ${time})`, function (err) {
                    if (err) throw err;
                });
                console.log(`${interaction.user.tag} ran command ${interaction.commandName} in channel #${interaction.channel.name} deleting ${interaction.options.getInteger('input')} messages`);
                break;
            case 'role':
                let options = interaction.options;
                let role = options._hoistedOptions[0].value;
                Utils.upsertUser(options._hoistedOptions[1].user, interaction.guild.id);//creates or updates target of command
                con.query(`INSERT INTO log (command, caster, target, timestamp)
                           VALUES ("${interaction.user.username} Tried to give role: ${role} to user: ${options._hoistedOptions[1].user.username}",
                                   ${interaction.user.id},
                                   ${options._hoistedOptions[1].user.id}, ${time})`, function (err) {
                    if (err) throw err;
                });
                break;
        }
    },
};