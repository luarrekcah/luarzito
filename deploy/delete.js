const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config.json');
require('dotenv').config();

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.delete(Routes.applicationCommand(config.botConfig.clientId, '1001531907084927087'))
.then(() => console.log('Comando deletado globalmente'))
.catch(console.error);

