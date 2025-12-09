const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a member from the server",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Reason for the kick",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply({ content: "You don't have permission to kick members!", ephemeral: true });
        }

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided";
        
        let member;
        try {
            member = await interaction.guild.members.fetch(user.id);
        } catch (error) {
            return interaction.reply({ content: "User not found in this server!", ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: "I cannot kick this user!", ephemeral: true });
        }

        await member.kick(reason);

        const embed = new MessageEmbed()
            .setColor("#ff9900")
            .setTitle("Member Kicked")
            .addField("User", user.tag, true)
            .addField("Moderator", interaction.user.tag, true)
            .addField("Reason", reason)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
