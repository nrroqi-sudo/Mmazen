const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get user's avatar",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user to get avatar from",
            type: "USER",
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user") || interaction.user;
        
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
