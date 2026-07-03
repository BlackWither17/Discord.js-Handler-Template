const fs = require("fs");
const chalk = require("chalk");
const AsciiTable = require("ascii-table");
const logger = require("../functions/logger");
const table = new AsciiTable();
table.setHeading("Select Menus", "Stats").setBorder("|", "=", "0", "0");

module.exports = (client) => {
  fs.readdirSync("./selectMenus/").filter((file) => file.endsWith(".js")).forEach((file) => {
    const selectMenus = require(`../selectMenus/${file}`);
    client.selectMenus.set(selectMenus.id, selectMenus);
    table.addRow(selectMenus.id, "✅");
  });
  logger.log(chalk.grey(table.toString()));
};
