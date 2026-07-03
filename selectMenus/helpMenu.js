const { EmbedBuilder } = require ("discord.js");

module.exports = {
  id: "help_menu",
  permissions: [],
  run: async (client, interaction) => {
    const categorys = new Array();
    for(const command of client.allCommands){
      const category = categorys.find(c => c.category === command.category);
      if(category) {
        category.commands.push(command);
      }
      else if(!category){
        const name = command.category;
        categorys.push({
          category: name,
          commands: [
            command,
          ],
        });

      }
    }

    const parts = interaction.values[0].split("_");
    const mittelteil = parts[1];

    const category = categorys.find(c => c.category === mittelteil);

    function getEmbed(category) {
      let commands = "";
      for(const cmd of category.commands) {
        commands = commands + `</${cmd.name}:1>\n> ${cmd.description}\n`;
      }
      const hEmbed = new EmbedBuilder()
        .setTitle(`❔ » **HELP** » **__${category.category.toUpperCase()}__**`)
        .setDescription(commands);

      return hEmbed;
    }

    if(!category) {return;}
    else if(category) {
      const hEmbed = getEmbed(category);
      interaction.update({ embeds: [hEmbed] });
    }
  },
};
