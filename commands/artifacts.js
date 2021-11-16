const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('artifacts')
        .setDescription('Xem các thánh di vật được đề xuất cho nhân vật.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('tên nhân vật muốn xem thánh di vật')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const name = interaction.options.getString('name');
            const file = `./assets/${name.toLowerCase()}/artifacts.png`

            if (!fs.existsSync(file)) {
                interaction.reply({ content: 'nhân vật này chưa được hỗ trợ', ephemeral: false });
                return;
            }

            const attachment = new MessageAttachment(file);
            const msg = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Bảng so sánh thánh di vật cho ${name}`)
                .setImage(`attachment://artifacts.png`);

            await interaction.reply({ embeds: [msg], files: [attachment], ephemeral: true });
        } catch (e) {
            console.log(e);
        }
    },
};