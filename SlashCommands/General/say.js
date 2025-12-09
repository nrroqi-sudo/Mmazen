module.exports = {
    name: "say",
    description: "Make the bot say something",
    type: "CHAT_INPUT",
    options: [
        {
            name: "message",
            description: "The message to say",
            type: "STRING",
            required: true
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "You don't have permission to use this command!", ephemeral: true });
        }

        const message = interaction.options.getString("message");
        
        await interaction.reply({ content: "Message sent!", ephemeral: true });
        await interaction.channel.send(message);
    }
};
