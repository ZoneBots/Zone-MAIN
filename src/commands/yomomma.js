const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
const axios = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('yomomma')
		.setDescription('Yo Momma joke 😐'),
	async execute(interaction, client) {
		const error = new MessageEmbed()
		.setTitle(`⛔ | Error`)
		.setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
		.setColor(`#ff001e`)
		.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
		const url = "https://api.yomomma.info";
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		const ping = new MessageEmbed()
			.setTitle(`👱‍♀️ | Yo Momma`)
			.setDescription(`\n ${image.joke}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: false});
	},
};