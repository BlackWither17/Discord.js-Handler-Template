const { ButtonBuilder, ActionRowBuilder, ModalBuilder, LabelBuilder, TextInputBuilder } = require('@discordjs/builders');
const { ApplicationCommandType, PermissionFlagsBits, TextInputStyle, TextDisplayBuilder } = require('discord.js');

module.exports = {
	name: 'examples',
	description: "Shows you example interactions like modals and buttons",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	options: [
        {
            name: 'interaction',
            description: 'The example interaction',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'modal',
                    value: 'modal'
                },
                {
                    name: 'button',
                    value: 'button'
                }
            ]
        }
    ],
    permissions: [PermissionFlagsBits.ManageChannels],
    botPerms: [],
	run: async (client, interaction) => {
        const chosenInteraction = interaction.options.getString('interaction');
        if(chosenInteraction === 'modal'){
            const modal = new ModalBuilder()
            .setCustomId('example_modal')
            .setTitle('Example Modal');

            const exampleInput = new TextInputBuilder()
            .setCustomId('example_input')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Type something here...');

            const exampleLabel = new LabelBuilder()
            .setLabel("Example Input")
            .setDescription("Please enter something short.")
            .setTextInputComponent(exampleInput);

            modal.addLabelComponents(exampleLabel);
            interaction.showModal(modal);
        } else if(chosenInteraction === 'button'){
            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('example_button')
                    .setLabel('Click me!')
                    .setStyle('Primary')
            );

            interaction.reply({
                content: 'You have chosen the button interaction!',
                components: [buttons],
                ephemeral: true
            })
        }
    }
};
