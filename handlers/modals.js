import fs from "fs";
import chalk from "chalk";
import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable();
table.setHeading("Modals", "Stats").setBorder("|", "=", "0", "0");

export default async (client) => {
  const files = fs.readdirSync("./modals/").filter((file) => file.endsWith(".js"));
  for (const file of files) {
    const { default: modal } = await import(`../modals/${file}`);
    client.modals.set(modal.id, modal);
    table.addRow(modal.id, "✅");
  }
  logger.log(chalk.yellow(table.toString()));
};
