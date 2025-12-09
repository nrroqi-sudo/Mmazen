const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Show all available commands",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Bot Commands")
            .setDescription("Here are all available slash commands:")
            .addField("Info Commands", "`/ping` `/avatar` `/userinfo` `/serverinfo`", false)
            .addField("Admin Commands", "`/ban` `/kick` `/clear` `/timeout`", false)
            .addField("General Commands", "`/help` `/say`", false)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
