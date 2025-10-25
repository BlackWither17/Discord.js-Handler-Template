const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
require('dotenv').config();

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		if (!button) return;

		try {
			if(button.permissions) {
				if(!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
					const perms = new EmbedBuilder()
					.setDescription(process.env.NO_PERMISSIONS_MESSAGE.replace('<permissions>', button.permissions).replace('<user>', interaction.user))
					.setColor('Red')
					return interaction.reply({ embeds: [perms], ephemeral: true })
				}
			}
			return await button.run(client, interaction);
		} catch (error) {
			console.log(error);
		}
	} else if (interaction.isModalSubmit()) {
		const modal = client.modals.get(interaction.customId);
		if (!modal) return;

		try {
			if(modal.permissions) {
				if(!interaction.memberPermissions.has(PermissionsBitField.resolve(modal.permissions || []))) {
					const perms = new EmbedBuilder()
					.setDescription(process.env.NO_PERMISSIONS_MESSAGE.replace('<permissions>', modal.permissions).replace('<user>', interaction.user))
					.setColor('Red')
					return interaction.reply({ embeds: [perms], ephemeral: true })
				}
			}
			return await modal.run(client, interaction);
		} catch (error) {
			console.log(error);
		}
	} else if (interaction.isAnySelectMenu()) {
		const selectMenus = client.selectMenus.get(interaction.customId);
		if (!selectMenus) return;

		try {
			if(selectMenus.permissions) {
				if(!interaction.memberPermissions.has(PermissionsBitField.resolve(selectMenus.permissions || []))) {
					const perms = new EmbedBuilder()
					.setDescription(process.env.NO_PERMISSIONS_MESSAGE.replace('<permissions>', selectMenus.permissions).replace('<user>', interaction.user))
					.setColor('Red')
					return interaction.reply({ embeds: [perms], ephemeral: true })
				}
			}
			return await selectMenus.run(client, interaction);
		} catch (error) {
			console.log(error);
		}
	}

	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown && typeof interaction.deferred !== 'undefined') {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: process.env.COOLDOWN_MESSAGE.replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(process.env.NO_PERMISSIONS_MESSAGE.replace('<permissions>', slashCommand.userPerms).replace('<user>', interaction.user))
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if((slashCommand.userPerms || slashCommand.botPerms) && typeof interaction.deferred !== 'undefined') {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(process.env.NO_PERMISSIONS_MESSAGE.replace('<permissions>', slashCommand.userPerms).replace('<user>', interaction.user))
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}
					await slashCommand.run(client, interaction);
			}
		} catch (error) {
				console.log(error);
		}
});