const mysql = require('mysql');
const {host, user, password, database} = require('../config.json')
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

module.exports.upsertUser = function upsertUser(member, guildID) {
    let is_dev = 0;
    if (member.id === '881868384709517323' || member.id === '142754322734776320' || member.id === '881868541329027082') is_dev = 1;
    con.query(`SELECT *
               FROM user
               WHERE userToken = ?`, [`${member.id}`], function (err, result) {
        if (err) throw err;
        if (!result.length > 0) {
            con.query("INSERT INTO user (userToken, username, serverid,first_seen,is_dev) VALUES (?, ?, ?, ?, ?)", [`${member.id}`, member.username + '#' + member.discriminator, guildID, Date.now(), is_dev]);
        } else {
            con.query(`UPDATE user
                       SET username = '${member.username}'
                       WHERE id = ${member.id}`)
        }
    })
    return true;
}
module.exports.upsertLeaderBoard = function upsertLeaderBoard(member, guildID, points) {
    con.query(`SELECT *
               FROM leaderboard
               WHERE u_token = ?`, [`${member.id}`], function (err, result) {
        if (err) throw err;
        if (!result.length > 0) {
            console.log('add')
            con.query("INSERT INTO leaderboard (points, u_token, u_server) VALUES (?, ?, ?)", [points, `${member.id}`, guildID]);
        } else {
            console.log('update')
            con.query(`UPDATE leaderboard
                       SET points = ${points}
                       WHERE u_token = ${member.id}`)
        }
    })
    return true;
}

