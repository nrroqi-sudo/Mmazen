const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Get information about the server",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        const guild = interaction.guild;

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setTitle(`${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addField("Owner", `<@${guild.ownerId}>`, true)
            .addField("Members", `${guild.memberCount}`, true)
            .addField("Channels", `${guild.channels.cache.size}`, true)
            .addField("Roles", `${guild.roles.cache.size}`, true)
            .addField("Created", `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, true)
            .addField("Boost Level", `${guild.premiumTier}`, true)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
