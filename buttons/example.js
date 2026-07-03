import { EmbedBuilder } from "discord.js";

export default {
  id: "example_button",
  permissions: [],
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Button works!")
      .setDescription("You have successfully clicked the button.");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
