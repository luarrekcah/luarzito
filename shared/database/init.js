const { initializeApp } = require("@firebase/app");
const logger = require("../config/logger");
const config = require("../../website/config");

try {
  initializeApp(config.firebaseConfig);
  logger.info("Conectado ao banco de dados");
} catch (error) {
  logger.error(error);
}
