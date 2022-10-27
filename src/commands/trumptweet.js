const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('trumptweet')
		.setDescription('Make Donald Trump tweet something')
		.addStringOption(option => option.setName('message').setDescription('The message that Trump is gonna tweet').setRequired(true)),
	async execute(interaction, client) {
		const error = new MessageEmbed()
			.setTitle(`⛔ | Error`)
			.setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
		const message = interaction.options.getString('message');    
		var replaced = message.split(' ').join('+');   
		const url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${replaced}`;
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		const embed = new MessageEmbed()
			.setTitle(`:flag_us: | Trump Tweet`)
            .setImage(image.message)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.reply({ embeds: [embed], ephemeral: false});
	},
};