const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collector } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('react')
        .setDescription('Test Reaction')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Chọn 1 emoji')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const emoji = interaction.options.getString('emoji');
            message = await interaction.reply({ content: `react ${emoji} vào message này`, fetchReply: true });
            await message.react(emoji);

            const filter = (reaction, user) => { return reaction.emoji.name === emoji && !user.bot };
            const collector = message.createReactionCollector({ filter, time: 600000 });
            collector.on('collect', (reaction, user) => {
                message.reply(`${user.username} react with ${reaction.emoji}`);
            })
        } catch (e) {
            console.log(e);
        }
    },
};