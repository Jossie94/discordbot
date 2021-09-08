// Require the necessary discord.js classes
const {Client, Intents, Collection} = require('discord.js');
const {token} = require('./config.json');
const fs = require('fs');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({content: 'There was an error while executing this command', ephemeral: true});
    }

    /* if(commandName === 'ping')
     {
         await interaction.reply('Pong!');
     }
     else if(commandName === 'beep')
     {
         await interaction.reply('Boop!');
     }
    /* else if (commandName === 'server')
     {
         await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
     }


     else if (commandName === 'user')
     {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
     }*/
});
// Login to Discord with your client's token
client.login(token);
