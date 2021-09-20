module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        // console.log(interaction)
        let name = (interaction.user.id == 881868541329027082) ? 'Josefine' : 'Jesper'
        switch (interaction.commandName) {

            case 'purge':
                console.log(`${interaction.user.tag} ran command ${interaction.commandName} in channel #${interaction.channel.name} deleting ${interaction.options.getInteger('input')} messages`);
                break;
            case 'ping':
                console.log(`okay u be pissin me off at this point ${name}`);
                break;
            case 'beep':
                console.log(`FUCK OFF ${name}`)
                break;

        }
    },
};