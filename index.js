const { port, clientId, clientSecret, url } = require('./config.json');
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', async ({ query }, response) => {
	const { code } = query;
	console.log(code);
	if (code) {
		try {
			console.log('Fetching oauth result');
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://${url}:${port}`,
					scope: 'guilds.join bot applications.commands',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			console.log('oAuth JSON Obj: ');
			const oauthData = await oauthResult.json();
			console.log(oauthData);
			console.log('Check access_toke: ');
			console.log(console.log(oauthData.access_token));
			console.log('Check token_type: ');
			console.log(console.log(oauthData.token_type));
			console.log('fetching user results: ');
			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});
			console.log(userResult);
			console.log(await userResult.json());
		} catch (error) {
			console.error(error);
		}
	}
	// Send to index.html looking in root directory

	return response.sendFile('index.html', { root: '.' });
});
app.listen(port, () => console.log(`App listening at http://${url}:${port}`));