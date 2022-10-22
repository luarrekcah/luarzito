const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config.json');
require('dotenv').config();

const rest = new REST({ version: '9' }).setToken(config.botConfig.development ? process.env.DEVELOPMENT_TOKEN : process.env.TOKEN);

rest.delete(Routes.applicationCommand(config.botConfig.development ? config.botConfig.devClientId : config.botConfig.clientId, '1033183603275874426'))
.then(() => console.log('Comando deletado globalmente'))
.catch(console.error);

