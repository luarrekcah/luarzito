const sequelizeService = require("./shared/services/sequelize.service");

(async () => {
  await sequelizeService.init();
})();

require("./bot");
require("./website");
