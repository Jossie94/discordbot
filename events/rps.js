// const { MessageActionRow, MessageButton, Client, Intents} = require('discord.js');
// const client = new Client({intents: [Intents.FLAGS.GUILDS]});
//
// client.on('interactionCreate', async interaction => {
//     if (!interaction.isCommand()) return;
//
//     if (interaction.commandName === 'rps') {
//         const row = new MessageActionRow()
//             .addComponents(
//                 new MessageButton()
//                     .setCustomId('primary')
//                     .setLabel('Primary')
//                     .setStyle('PRIMARY'),
//             );
//
//         await interaction.reply({ content: 'Pong!', components: [row] });
//     }
// });