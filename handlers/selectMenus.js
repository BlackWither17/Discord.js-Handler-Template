import fs from "fs";
import chalk from "chalk";
import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable();
table.setHeading("Select Menus", "Stats").setBorder("|", "=", "0", "0");

export default async (client) => {
  const files = fs.readdirSync("./selectMenus/").filter((file) => file.endsWith(".js"));
  for (const file of files) {
    const { default: selectMenus } = await import(`../selectMenus/${file}`);
    client.selectMenus.set(selectMenus.id, selectMenus);
    table.addRow(selectMenus.id, "✅");
  }
  logger.log(chalk.grey(table.toString()));
};
