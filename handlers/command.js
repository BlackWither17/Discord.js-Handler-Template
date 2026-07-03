import chalk from "chalk";
import fs from "fs";
import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable();
table.setHeading("Commands", "Stats").setBorder("|", "=", "0", "0");

export default async (client) => {
  for (const dir of fs.readdirSync("./commands/")) {
    const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    if(!files || files.length <= 0) {logger.log(chalk.red("Commands - 0"));}
    for (const file of files) {
      const { default: command } = await import(`../commands/${dir}/${file}`);
      if(command) {
        client.commands.set(command.name, command);
        if(command.aliases && Array.isArray(command.aliases)) {
          command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
          });
        }
        table.addRow(command.name, "✅");
      } else {
        table.addRow(file, "⛔");
      }
    }
  }
  logger.log(chalk.blue(table.toString()));
};
