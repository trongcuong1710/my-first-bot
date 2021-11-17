const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { evaluate, string } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Thực Hiện Phép Tính Toán Hoặc Chuyển Đổi')
        .addStringOption(option =>
            option.setName('expression')
                .setDescription('Nhập Phép Tính Hoặc Câu Lệnh Chuyển Đổi Vào Đây')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const expression = interaction.options.getString('expression');
            const result = string(evaluate(expression));
            const embed = new MessageEmbed()
                .setTitle("Kết Quả Của Bạn Là")
                .addField('Câu Hỏi', expression)
                .addField('Câu Trả Lời', result);
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            interaction.reply('đã xảy ra lỗi khi thực thi lệnh này.')
            console.log(e);
        }
    },
};