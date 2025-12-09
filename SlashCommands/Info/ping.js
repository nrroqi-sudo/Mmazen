const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Check the bot's latency",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Pong!")
            .addField("Bot Latency", `${Date.now() - interaction.createdTimestamp}ms`, true)
            .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
