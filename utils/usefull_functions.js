const mysql = require('mysql');
const con = mysql.createConnection({
    host: "projectfritid.com",
    user: "Skole",
    password: "Skole123",
    database: "discordbot"
});

module.exports.upsertUser = function upsertUser(member, guildID) {
    let is_dev = 0;
    if (member.id === '881868384709517323' || member.id === '142754322734776320' || member.id ==='881868541329027082') is_dev = 1;
    con.query(`SELECT * FROM user WHERE userToken = ?`,[`${member.id}`],function (err,result){
        if (err) throw err;
        if (!result.length > 0) {
            con.query("INSERT INTO user (userToken, username, serverid,first_seen,is_dev) VALUES (?, ?, ?, ?, ?)", [`${member.id}`, member.username +'#'+ member.discriminator, guildID,Date.now(),is_dev]);
        } else {
            con.query(`UPDATE user SET username = '${member.username}' WHERE id = ${member.id}`)
        }
    })
    return true;
}

