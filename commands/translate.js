const { SlashCommandBuilder } = require('@discordjs/builders');
const { Translate } = require('@google-cloud/translate').v2;
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

// Instantiates a client
const clientID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const translate = new Translate({ clientID });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Dịch Từ Nhiều Ngôn Ngữ Khác Nhau')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Nội Dung Cần Dịch')
                .setRequired(true)),


    async execute(interaction) {
        try {
            const content = interaction.options.getString('content');
            const [translation] = await translate.translate(content, 'vi');

            const embed = new MessageEmbed()
                .setTitle('Dịch Bừa')
                .addField('Từ', content)
                .addField('Sang', translation);

            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    },
};