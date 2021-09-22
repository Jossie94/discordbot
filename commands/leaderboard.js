const mysql = require('mysql');
const Utils = require('../utils/usefull_functions');
const {host,user,password,database} = require('../config.json')
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('shows u top 10 players'),
    async execute(interaction) {
        con.query(`SELECT points, u_token
                              FROM leaderboard
                              WHERE u_server = ? ORDER BY points LIMIT 0,10 `, [`${interaction.guild.id}`], function (err, result) {
                return interaction.reply("first place:"+result[0].u_token +
                    "\n2nd place:"+result[1].u_token +
                    "\n3rd place:"+result[2].u_token +
                    "\n4th place:"+result[3].u_token +
                    "\n5th place:"+result[4].u_token +
                    "\n6th place:"+result[5].u_token +
                    "\n7th place:"+result[6].u_token +
                    "\n8th place:"+result[7].u_token +
                    "\n9th place:"+result[8].u_token +
                    "\n10th place:"+result[9].u_token
                );
        })
    },
};