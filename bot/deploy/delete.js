const { REST, Routes } = require('discord.js');
const config = require('../../website/config');

const rest = new REST({ version: '9' }).setToken(config.bot.token);

rest.put(Routes.applicationCommands(config.bot.client_id), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);