const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a member from the server",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Reason for the ban",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({ content: "You don't have permission to ban members!", ephemeral: true });
        }

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided";
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: "User not found in this server!", ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: "I cannot ban this user!", ephemeral: true });
        }

        await member.ban({ reason });

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Member Banned")
            .addField("User", user.tag, true)
            .addField("Moderator", interaction.user.tag, true)
            .addField("Reason", reason)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
