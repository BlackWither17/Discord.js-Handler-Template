const { EmbedBuilder } = require ("discord.js")

module.exports = {
	id: 'help_menu',
	permissions: [],
	run: async (client, interaction) => {
        const categorys = new Array();
        for(let command of client.allCommands){
            let category = categorys.find(c => c.category === command.category)
            if(category) {                
                category.commands.push(command);
            }
            else if(!category){
                let name = command.category;
                categorys.push({
                    category: name,
                    commands: [
                        command
                    ]
                })
                
            }
        }
        
        var parts = interaction.values[0].split("_");
        var mittelteil = parts[1];
        
        let category = categorys.find(c => c.category === mittelteil)
        
        function getEmbed(category) {
            let commands = "";
            for(let cmd of category.commands) {
                commands = commands + `</${cmd.name}:1>\n> ${cmd.description}\n`;
            }
            let hEmbed = new EmbedBuilder()
            .setTitle(`❔ » **HELP** » **__${category.category.toUpperCase()}__**`)
            .setDescription(commands)
            
            return hEmbed;
        }
     
        if(!category) return;
        else if(category) {
            let hEmbed = getEmbed(category)
            interaction.update({ embeds: [hEmbed] })
        }
	}
};
