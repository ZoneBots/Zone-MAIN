const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const settings = require('../config.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        
        if (interaction.customId === `saymodal`) {

            const vraag1 = interaction.fields.getTextInputValue('title');
            const vraag2 = interaction.fields.getTextInputValue('description');
            const vraag3 = interaction.fields.getTextInputValue('color');

            const confirmed = new MessageEmbed()
                .setTitle(`✅ | Say`)
                .setDescription(`Ur message has been sent!`)
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
            const say = new MessageEmbed()
                .setTitle(`${vraag1}`)
                .setDescription(`${vraag2}`)
                .setColor(`#${vraag3}`)
                .setTimestamp()
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
    
            interaction.reply({ embeds: [confirmed], ephemeral: true})
            interaction.channel.send({ embeds: [say] })
        }
    },
}
                                            