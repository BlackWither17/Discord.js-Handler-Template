import fs from "fs";
import chalk from "chalk";
import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable();
table.setHeading("Events", "Stats").setBorder("|", "=", "0", "0");

export default async () => {
  const files = fs.readdirSync("./events/").filter((file) => file.endsWith(".js"));
  for (const event of files) {
    await import(`../events/${event}`);
    table.addRow(event.split(".js")[0], "✅");
  }
  logger.log(chalk.greenBright(table.toString()));
};
