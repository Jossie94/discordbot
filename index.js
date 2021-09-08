// Require the necessary discord.js classes
 const fetch = require('node-fetch')
const { Client, Intents, Collection } = require('discord.js');
const express = require('express');
const { port, clientId, clientSecret } = require('./config.json');
const { token } = require('./config.json');
const fs = require('fs');
const { request, response } = require('express');

// oAuth
const app = express();

app.get('/', async ({ query }, response) => {
	const { code } = query;

	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();

			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}
	// Send to index.html looking in root directory
	return response.sendFile('index.html', { root: '.' });
});
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
//
// for (const file of eventFiles) {
// 	const event = require(`./events/${file}`);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args));
// 	}
// 	else {
// 		client.on(event.name, (...args) => event.execute(...args));
// 	}
// }
//
// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;
//
// 	const command = client.commands.get(interaction.commandName);
//
// 	if (!command) return;
//
// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		return interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
// 	}
// });


//
// // Create a new client instance
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
//
// client.commands = new Collection();
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//
// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	client.commands.set(command.data.name, command);
// }
//
// // When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });
//
// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;
//
// 	const command = client.commands.get(interaction.commandName);
//
// 	if (!command) return;
//
// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		return interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
// 	}
//
// });
// // Login to Discord with your client's token
// client.login(token);
