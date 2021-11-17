const { MessageEmbed } = require('discord.js');
const fs = require('fs');

function jsonFileToEmbed(filePath) {
    const data = fs.readFileSync(filePath);
    const obj = JSON.parse(data);
    const embed = obj.embed;

    if (!embed) {
        return;
    }

    let message = new MessageEmbed();

    if (embed.color) {
        message = message.setColor(embed.color);
    }

    if (embed.description) {
        message = message.setDescription(embed.description);
    }

    if (embed.timestamp) {
        message = message.setTimestamp(embed.timestamp);
    }

    if (embed.url) {
        message = message.setURL(embed.url);
    }

    if (embed.title) {
        message = message.setTitle(embed.title);
    }

    if (embed.author) {
        message = message.setAuthor(
            embed.author.name,
            embed.author.icon_url,
            embed.author.url
        );
    }

    if (embed.image) {
        message = message.setImage(embed.image.url);
    }

    if (embed.thumbnail) {
        message = message.setThumbnail(embed.thumbnail.url);
    }

    if (embed.footer) {
        message = message.setFooter(embed.footer.text, embed.footer.icon_url);
    }

    for (field of embed.fields) {
        message = message.addField(field.name, field.value);
    }

    return message
}

module.exports = {
    jsonFileToEmbed,
}