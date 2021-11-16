const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),

    async execute(interaction) {
        try {
            await interaction.reply('Pong!');
        } catch (e) {
            console.log(e);
        }
    },
};