const { ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Check the bot's latency",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    permissions: [PermissionFlagsBits.Administrator],
    botPerms: [],
	run: async (client, interaction) => {
		interaction.reply({ content: `🏓 Pong! Latency: **${Math.round(client.ws.ping)} ms**` })
	}
};