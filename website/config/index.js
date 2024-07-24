const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const logger = require("../../shared/config/logger");

switch (process.env.NODE_ENV) {
  case "production":
    // logger.info("INICIANDO EM PRODUÇÃO");
    dotenv.config({ path: path.join(__dirname, "../../.env.production") });
    break;
  default:
    // logger.info("INICIANDO EM DESENVOLVIMENTO");
    dotenv.config({ path: path.join(__dirname, "../../.env.development") });
    break;
}

const envVarsSchema = Joi.object()
  .keys({
    // NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  firebaseConfig: {
    apiKey: envVars.apiKey,
    authDomain: envVars.authDomain,
    projectId: envVars.projectId,
    storageBucket: envVars.storageBucket,
    messagingSenderId: envVars.messagingSenderId,
    appId: envVars.appId,
  },
  bot: {
    token: envVars.TOKEN
  }
};
