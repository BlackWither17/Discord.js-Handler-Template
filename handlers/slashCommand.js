const fs = require('fs');
const chalk = require('chalk');
require('dotenv').config();

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('|', '=', "0", "0")

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

module.exports = (client) => {
	const slashCommands = [];

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));
        

		for(const file of files) {
				const slashCommand = require(`../slashCommands/${dir}/${file}`);
           
                client.allCommands.push({
                    category: dir,
                    name: slashCommand.name,
                    description: slashCommand.description
                });
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
            
			
				if(slashCommand.name) {
                             client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '✅')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
		}
		
	});
	console.log(chalk.red(table.toString()));

	(async () => {
			try {
                await rest.put(
					Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
					{ body: slashCommands }
				);
				console.log(chalk.yellow('Slash Commands • Registered'))
			} catch (error) {
				console.log(error);
			}
	})();
};
