const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Get the lyrics of a song')
		.addStringOption(option => option.setName('song').setDescription('The song you want to get the lyrics of').setRequired(true)),
	async execute(interaction, client) {
		const error = new MessageEmbed()
			.setTitle(`⛔ | Error`)
			.setDescription(`\n There was an error while getting the lyrics! \nYou might have entered an invalid song!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
		const song = interaction.options.getString('song');    
		var replaced = song.split(' ').join('_');   
		console.log(replaced);
		const url = `https://some-random-api.ml/lyrics?title=${replaced}`;
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			console.log(e);	
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		try {
			const embed = new MessageEmbed()
				.setTitle(`🎵 | Lyrics | ${image.title}`)
				.setDescription(`\n ${image.lyrics} \n \n [Click Here](${image.links.genius}) to view the lyrics on Genius!`)
				.setAuthor({ name: `${image.author}`, iconURL: `${image.thumbnail.genius}`})
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			return interaction.reply({ embeds: [embed], ephemeral: false});
		} catch (e) {
			console.log(e);
			return interaction.reply({ embeds: [error], ephemeral: true });
		}
	},
};