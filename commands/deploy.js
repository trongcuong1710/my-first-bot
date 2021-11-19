const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const deployCommands = require('../deploy-commands');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy')
        .setDescription('Deploy Command Mới Lên Discord. Chỉ Dùng Khi Thêm Mới Hoặc Thay Đổi Thông Số Của Command.'),

    async execute(interaction) {
        try {
            const hasManageGuildPermission = interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD);
            const hasAsministratorPermission = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
            if (!hasManageGuildPermission && !hasAsministratorPermission) {
                await interaction.reply({ content: 'bạn không có quyền để thực hiện lệnh này', ephemeral: true });
                return;
            }

            deployCommands.deploy();

            await interaction.reply({ content: 'deploy thành công', ephemeral: true });
        } catch (e) {
            interaction.reply('đã xảy ra lỗi khi thực thi lệnh này.');
            console.log(e);
        }
    },
};