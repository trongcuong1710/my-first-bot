// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require('dotenv').config()

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`missing implementation for command:${interaction.commandName}`);
        interaction.reply({ content: 'Chức năng này chưa được xây dựng.', ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(`executing ${interaction.commandName} failed with error: ${e}`);
        interaction.reply({ content: `Có lỗi xảy ra khi thực thi chức năng ${interaction.commandName}. Lỗi: ${e}`, ephemeral: true });
    }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);