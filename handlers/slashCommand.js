import fs from "fs";
import chalk from "chalk";
import "dotenv/config";

import { PermissionsBitField } from "discord.js";
import { Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";

import AsciiTable from "ascii-table";
import logger from "../functions/logger.js";

const table = new AsciiTable().setHeading("Slash Commands", "Stats").setBorder("|", "=", "0", "0");

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

export default async (client) => {
  const slashCommands = [];

  for (const dir of fs.readdirSync("./slashCommands/")) {
    const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));


    for(const file of files) {
      const { default: slashCommand } = await import(`../slashCommands/${dir}/${file}`);

      client.allCommands.push({
        category: dir,
        name: slashCommand.name,
        description: slashCommand.description,
      });
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null,
      });


      if(slashCommand.name) {
        client.slashCommands.set(slashCommand.name, slashCommand);
        table.addRow(file.split(".js")[0], "✅");
      } else {
        table.addRow(file.split(".js")[0], "⛔");
      }
    }

  }
  logger.log(chalk.red(table.toString()));

  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: slashCommands },
    );
    logger.success("Slash Commands • Registered");
  } catch (error) {
    logger.error(error);
  }
};
