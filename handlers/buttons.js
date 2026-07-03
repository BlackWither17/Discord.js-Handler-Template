const fs = require("fs");
const chalk = require("chalk");
const AsciiTable = require("ascii-table");
const logger = require("../functions/logger");
const table = new AsciiTable();
table.setHeading("Buttons", "Stats").setBorder("|", "=", "0", "0");

module.exports = (client) => {
  fs.readdirSync("./buttons/").filter((file) => file.endsWith(".js")).forEach((file) => {
    const button = require(`../buttons/${file}`);
    client.buttons.set(button.id, button);
    table.addRow(button.id, "✅");
  });
  logger.log(chalk.cyanBright(table.toString()));
};
