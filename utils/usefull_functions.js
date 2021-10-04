const mysql = require('mysql');
const {host, user, password, database} = require('../config.json')
const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

/**
 * @param {User} member (discord user element usualy gotten from interaction.user)
 * @param {string|number|number} guildID (the id of the guild calling the upsert usualy gotten from interaction.guild.id)
 * creates or updates the users information depending if he already exists or not
 */
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
/**
 * @param {User} member (discord user element usualy gotten from interaction.user)
 * @param {string} guildID (the id of the guild calling the upsert usualy gotten from interaction.guild.id)
 * @param {SVGPointList|string} points
 * creates or updates the users points on the leaderboard depending if he played before or is returning player
 */
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
}

/**
 * @param {string} select (example: "id, points")
 * @param {string} table (example: "leaderboard")
 * @param {string} where (example: "u_server = ? && u_token = ?")
 * @param {array} prepared (example: [interaction.guild.id, interaction.user.token])
 * @return mixed returns the query result or throws error
 * full example: await Utils.advancedSelect('*','user',"serverid = ?",[`${interaction.guild.id}`])
 */
module.exports.advancedSelect = function advancedSelect(select, table, where, prepared) {
    return new Promise((resolve) => {
        con.query(`SELECT ${select}
                   FROM ${table}
                   WHERE ${where}`, prepared, function (err, result) {
            resolve(result);
        });
    });
}


/**
 * @param {string} message
 * @param {integer} caster (user_id that did the command)
 * @param {null|integer} target
 * logs a message for you in the database
 */
module.exports.log = function log(message, caster, target = null) {
    if (target === null) {
        con.query(`INSERT INTO log (command, caster, timestamp)
                   VALUES ("${message}", ${caster}, ${Date.now()})`, function (err) {
            if (err) throw err;
        });
    } else {
        con.query(`INSERT INTO log (command, caster, timestamp, target)
                   VALUES ("${message}", ${caster}, ${Date.now()}, ${target})`, function (err) {
            if (err) throw err;
        });
    }
}
/**
 * @param {int} hours
 * wait a specified amount of hours
 * use: await Utils.wait(hours);
 */
module.exports.wait = function wait(hours) {
    return new Promise((resolve) => {
        for (let i = 0; i <= hours; i++) {
            setTimeout(resolve, 5000);
        }
    });
}
