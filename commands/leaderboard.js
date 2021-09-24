const mysql = require('mysql');
const {host, user, password, database} = require('../config.json')
const {SlashCommandBuilder} = require('@discordjs/builders');
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('shows u top 10 players'),
    async execute(interaction) {
        let scoreboard = '';
        let i = 0;

        con.query(`SELECT *
                   FROM \`user\`
                            INNER JOIN leaderboard ON user.userToken = leaderboard.u_token
                   WHERE serverid = ? `, [`${interaction.guild.id}`], (err, result) => {
            result.forEach(function (result) {
                scoreboard += (scoreboard.length > 1) ? `\n${i+1}. place: ${result.username}\t points: ${result.points}` : `${i+1}. place: ${result.username}\t points: ${result.points}`;
                i++;
            });

            interaction.user.send(scoreboard);
        });
    },
};