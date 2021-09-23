const mysql = require('mysql');
const Utils = require('../utils/usefull_functions');
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
        //todo finish using new function for query instead
        let test = await Utils.advancedSelect('*','user',"serverid = ?",[`${interaction.guild.id}`])
        console.log(test)

        // con.query(`SELECT *
        //            FROM \`user\`
        //                     INNER JOIN leaderboard ON user.userToken = leaderboard.u_token
        //            WHERE serverid = ? `, [`${interaction.guild.id}`], (err, result) => {
        //     result.forEach(function (result) {
        //         test += (test.length > 1) ? `\n${i}. place:${result.username} points: ${result.points}` : `${i}. place:${result.username} points: ${result.points}`;
        //         i++;
        //     });
        //
        //     interaction.user.send(test);
        // });
    },
};