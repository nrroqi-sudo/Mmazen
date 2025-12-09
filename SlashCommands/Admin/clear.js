const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clear messages from the channel",
    type: "CHAT_INPUT",
    options: [
        {
            name: "amount",
            description: "Number of messages to delete (1-100)",
            type: "INTEGER",
            required: true,
            minValue: 1,
            maxValue: 100
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "You don't have permission to manage messages!", ephemeral: true });
        }

        const amount = interaction.options.getInteger("amount");

        await interaction.channel.bulkDelete(amount, true);

        const embed = new MessageEmbed()
            .setColor("#00ff00")
            .setTitle("Messages Cleared")
            .setDescription(`Successfully deleted ${amount} messages.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
