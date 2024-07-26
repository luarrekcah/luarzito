const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
const path = require('path');
const config = require('../../website/config');
require('dotenv').config();

const commands = [];
let count = 0;

const commandsPath = path.join(__dirname, '..', 'commands');
fs.readdirSync(commandsPath).forEach((dir) => {
	const commandFiles = fs.readdirSync(path.join(commandsPath, dir)).filter((file) => file.endsWith('.js') && dir !== 'dev');
	console.log(commandFiles);
	for (const file of commandFiles) {
		const command = require(path.join(commandsPath, dir, file));
		commands.push(command.data.toJSON());
		count++;
	}
});

const rest = new REST({ version: '9' }).setToken(config.bot.token);

rest.put(Routes.applicationCommands(config.bot.client_id), { body: commands })
	.then(() => console.log(`[GLOBAL] ${count} Comandos Registrados com Sucesso`))
	.catch(console.error);