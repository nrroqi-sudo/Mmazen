const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "timeout",
    description: "Timeout a member",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user to timeout",
            type: "USER",
            required: true
        },
        {
            name: "duration",
            description: "Duration in minutes",
            type: "INTEGER",
            required: true,
            minValue: 1,
            maxValue: 40320
        },
        {
            name: "reason",
            description: "Reason for the timeout",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("MODERATE_MEMBERS")) {
            return interaction.reply({ content: "You don't have permission to timeout members!", ephemeral: true });
        }

        const user = interaction.options.getUser("user");
        const duration = interaction.options.getInteger("duration");
        const reason = interaction.options.getString("reason") || "No reason provided";
        
        let member;
        try {
            member = await interaction.guild.members.fetch(user.id);
        } catch (error) {
            return interaction.reply({ content: "User not found in this server!", ephemeral: true });
        }

        if (!member.moderatable) {
            return interaction.reply({ content: "I cannot timeout this user!", ephemeral: true });
        }

        await member.timeout(duration * 60 * 1000, reason);

        const embed = new MessageEmbed()
            .setColor("#ffcc00")
            .setTitle("Member Timed Out")
            .addField("User", user.tag, true)
            .addField("Duration", `${duration} minutes`, true)
            .addField("Moderator", interaction.user.tag, true)
            .addField("Reason", reason)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
