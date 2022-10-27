const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong 🏓'),
	execute(interaction, client) {
		const ping = new MessageEmbed()
			.setTitle(`Pong!`)
			.addField("The bot latency is", `\`\`${interaction.createdTimestamp - Date.now()}ms\`\``)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: true});
	},
};