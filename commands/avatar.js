const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { evaluate, string } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Xem Avatar Của Một User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Người Bạn Muốn Xem Avatar')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            console.log(user.displayAvatarURL({ dynamic: true }));
            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s Avatar`)
                .setImage(user.displayAvatarURL({ dynamic: true }));
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            interaction.reply('đã xảy ra lỗi khi thực thi lệnh này.')
            console.log(e);
        }
    },
};