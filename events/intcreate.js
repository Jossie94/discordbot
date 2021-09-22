const mysql = require('mysql');
const Utils = require('../utils/usefull_functions');
const con = mysql.createConnection({
    host: "projectfritid.com",
    user: "Skole",
    password: "Skole123",
    database: "discordbot"
});

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        // console.log(interaction)
        // const list = client.guilds.cache.get("720352141709148200");
        // list.members.forEach(member => {
        //     console.log(member)
        // });

        switch (interaction.commandName) {
            case 'purge':
                console.log(`${interaction.user.tag} ran command ${interaction.commandName} in channel #${interaction.channel.name} deleting ${interaction.options.getInteger('input')} messages`);
                break;
            case 'role':
                let options = interaction.options;
                let role = options._hoistedOptions[0].value;
                let time = Date.now();
                Utils.upsertUser(interaction.user, interaction.guild.id);
                Utils.upsertUser(options._hoistedOptions[1].user, interaction.guild.id);
                con.query(`INSERT INTO log (command, caster, target,timestamp )
                            VALUES ("Given role: ${role}", ${interaction.user.id},
                                    ${options._hoistedOptions[1].user.id},${time})`, function (err, result, fields) {
                     if (err) throw err;

                 });
                break;
        }
    },
};