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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('(Optional) Ngôn Ngữ Muốn Dịch Sang. Mặc Định Sẽ Dịch Sang Tiếng Việt')
                .addChoice('Tiếng Việt', 'vi')
                .addChoice('English', 'en')
                .addChoice('French', 'fr')
                .addChoice('Japanese', 'jp')
                .addChoice('Spanish', 'es')),

    async execute(interaction) {
        try {
            const content = interaction.options.getString('content');
            const target = interaction.options.getString('to') === null
                ? 'vi' : interaction.options.getString('to');
            const [translation] = await translate.translate(content, target);

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