const Utils = require('../utils/usefull_functions');
module.exports = {
    name: 'messageDelete',
    execute(message) {
        Utils.log(`Message: '${message.content}' Has been deleted`, message.interaction.user.id, message.author.id);
    },
};