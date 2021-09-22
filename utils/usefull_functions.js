const mysql = require('mysql');
const con = mysql.createConnection({
    host: "projectfritid.com",
    user: "Skole",
    password: "Skole123",
    database: "discordbot"
});

module.exports.upsertUser = function upsertUser(member, guildID) {
    con.query(`SELECT * FROM user WHERE id = ${member.id}`,function (err,result,fields){
        if (err) throw err;
        if (!result.length > 0) {
            con.query("INSERT INTO user (id, username, serverid,first_seen) VALUES (?, ?, ?,?)", [`${member.id}`, member.username +'#'+ member.discriminator, guildID,Date.now()]);
        } else {
            con.query(`UPDATE user SET username = '${member.username}' WHERE id = ${member.id}`)
        }
    })

    return true;
}

