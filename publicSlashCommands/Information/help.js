const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	description: "Shows you all commands of the bot",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	options: [],
    permissions: [],
    botPerms: [],
	run: async (client, interaction) => {
        const options = [];
        for(let command of client.allCommands){
            let included = false
            for(let option of options){
                if(option?.data.label == command.category){
                    included = true
                }}
                if(included == false) {
            options.push(
                new StringSelectMenuOptionBuilder()
                .setLabel(command.category)
                .setEmoji("⭐")
                .setValue(`help_${command.category}_menuOption`)
                
            )}
        }
        const embed = new EmbedBuilder()
        .setTitle("❔ » **__HELP__**")
        .setDescription("Here you can find all commands of the bot. Select a category from the menu below to see the commands.")
        
        const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('help_menu')
					.setPlaceholder('📌 » Command overview')
					.addOptions(options)
            )
        
        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }
};
