const { EmbedBuilder } = require('discord.js');

module.exports = {
	id: 'example_button',
	permissions: [],
	run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setTitle("Button works!")
        .setDescription("You have successfully clicked the button.")

        interaction.reply({ embeds: [embed], ephemeral: true })
	}
};
