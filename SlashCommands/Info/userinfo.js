const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Get information about a user",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user to get info from",
            type: "USER",
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setTitle(`${user.username}'s Info`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField("Username", user.tag, true)
            .addField("ID", user.id, true)
            .addField("Account Created", `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, true)
            .addField("Joined Server", member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : "N/A", true)
            .addField("Roles", member ? `${member.roles.cache.size - 1}` : "N/A", true)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
