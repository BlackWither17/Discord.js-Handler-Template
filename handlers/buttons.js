import fs from "fs";
import chalk from "chalk";
import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable();
table.setHeading("Buttons", "Stats").setBorder("|", "=", "0", "0");

export default async (client) => {
  const files = fs.readdirSync("./buttons/").filter((file) => file.endsWith(".js"));
  for (const file of files) {
    const { default: button } = await import(`../buttons/${file}`);
    client.buttons.set(button.id, button);
    table.addRow(button.id, "✅");
  }
  logger.log(chalk.cyanBright(table.toString()));
};
