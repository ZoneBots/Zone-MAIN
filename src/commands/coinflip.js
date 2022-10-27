const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin'),
	execute(interaction, client) {
		const n = Math.floor(Math.random() * 2);
		let result;
		if (n === 1) result = 'Heads';
		else result = 'Tails';		
		const ping = new MessageEmbed()
			.setTitle(`🪙 | Coinflip!`)
			.setDescription(`\n You flipped a coin and got \`\`${result}\`\``)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: false});
	},
};