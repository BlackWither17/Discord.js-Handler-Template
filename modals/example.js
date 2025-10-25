const { EmbedBuilder } = require ("discord.js")

module.exports = {
	id: 'example_modal',
	permissions: [],
	run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setTitle("Modal works!")
        .setDescription("You have successfully submitted the modal.")

        interaction.reply({ embeds: [embed], ephemeral: true })
	}
};
