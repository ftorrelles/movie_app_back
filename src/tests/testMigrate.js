const sequelize = require("../utils/connection");
require("../models");
require("../models/Actor");

const main = async () => {
    try {
        await sequelize.sync({ force: true });
        // funciones de create...

        process.exit();
    } catch (error) {
        console.log(error);
    }
};

main();
