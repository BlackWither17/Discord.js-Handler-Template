const { EmbedBuilder, ApplicationCommandType, version } = require('discord.js');
const botJSON = require('../../package.json')

module.exports = {
	name: 'bot-info',
	description: "Shows you some information about the bot",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	options: [],
    permissions: [],
    botPerms: [],
	run: async (client, interaction) => {               
        const embed = new EmbedBuilder()
        .setTitle("🤖 » **__BOT INFO__**")
        .setDescription("Here you can find some information about the bot.")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Bot Version:", value: botJSON.version, inline: true },
            { name: "Discord.js Version:", value: version, inline: true }
        )
        
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
