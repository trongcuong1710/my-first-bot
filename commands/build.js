const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const embedUtil = require('../utils/embed.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('build')
        .setDescription('Hướg Dẫn Build Nhân Vật')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Tên Nhân Vật')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Xem Chi Tiết Từng Danh Mục Build')
                .setRequired(true)
                .addChoice('Thánh Di Vật', 'artifacts')
                .addChoice('Vũ Khí', 'weapons')
                .addChoice('Cung Mệnh', 'constellations')
                .addChoice('Team', 'teams')),

    async execute(interaction) {
        try {
            const name = interaction.options.getString('name');
            const category = interaction.options.getString('category');
            const file = `./assets/${name.toLowerCase()}/${category}.json`

            if (!fs.existsSync(file)) {
                interaction.reply({ content: `nhân vật ${name} chưa được hỗ trợ`, ephemeral: true });
                return;
            }

            msg = embedUtil.jsonFileToEmbed(file);

            if (!msg) {
                await interaction.reply({ content: 'nội dung này hiện đang bị lỗi', ephemeral: true })
            }

            await interaction.reply({ embeds: [msg], ephemeral: false });
        } catch (e) {
            interaction.reply('đã xảy ra lỗi khi thực thi lệnh này.')
            console.log(e);
        }
    },
};