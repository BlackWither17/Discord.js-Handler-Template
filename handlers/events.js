const fs = require("fs");
const chalk = require("chalk");
const AsciiTable = require("ascii-table");
const logger = require("../functions/logger");
const table = new AsciiTable();
table.setHeading("Events", "Stats").setBorder("|", "=", "0", "0");

module.exports = () => {
  fs.readdirSync("./events/").filter((file) => file.endsWith(".js")).forEach((event) => {
      	require(`../events/${event}`);
    table.addRow(event.split(".js")[0], "✅");
  });
  logger.log(chalk.greenBright(table.toString()));
};
