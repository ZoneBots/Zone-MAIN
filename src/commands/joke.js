const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Sent a random joke'),
	async execute(interaction, client) {
		const error = new MessageEmbed()
			.setTitle(`⛔ | Error`)
			.setDescription(`\n There was an error while getting the joke! \nThe API might be down!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
		const url = "https://some-random-api.ml/joke";
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		const embed = new MessageEmbed()
			.setTitle(`😂 | Joke`)
			.setDescription(`\n ${image.joke}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.reply({ embeds: [embed], ephemeral: false});
	},
};