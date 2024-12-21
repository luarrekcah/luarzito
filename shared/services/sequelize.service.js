const { Sequelize } = require('sequelize');
const databaseConfig = require("../config/database");
const fs = require("fs");

const modelFiles = fs
    .readdirSync(__dirname + "/../database/models/")
    .filter((file) => file.endsWith(".js"));

const sequelizeService = {
    init: async () => {
        try {
            // Criando a conexão com o Sequelize
            const connection = new Sequelize(databaseConfig);

            /*
              Carregando os modelos automaticamente
            */
            for (const file of modelFiles) {
                const model = await import(`../database/models/${file}`);
                if (model.default && typeof model.default.init === 'function') {
                    model.default.init(connection);  // Aqui passamos a instância do Sequelize
                } else {
                    console.error(`Model ${file} does not have an init method.`);
                }
            }

            modelFiles.map(async (file) => {
                const model = await import(`../database/models/${file}`);
                model.default.associate && model.default.associate(connection.models);
            });

            console.log("[DB] Modelos Inicializados");
        } catch (error) {
            console.log("[DB] Error during database service initialization");
            throw error;
        }
    },
};

module.exports = sequelizeService;