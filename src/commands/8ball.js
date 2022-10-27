const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
const answers = [
	'It is certain.',
	'It is decidedly so.',
	'Without a doubt.',
	'Yes - definitely.',
	'You may rely on it.',
	'As I see it, yes.',
	'Most likely.',
	'Outlook good.',
	'Yes.',
	'Signs point to yes.',
	'Reply hazy, try again.',
	'Ask again later.',
	'Better not tell you now.',
	'Cannot predict now.',
	'Concentrate and ask again.',
	'Don\'t count on it.',
	'My reply is no.',
	'My sources say no.',
	'Outlook not so good.',
	'Very doubtful.'
  ];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic 8ball a question')
		.addStringOption(option => option.setName('question').setDescription('The question for magic 8ball').setRequired(true)
	),
	async execute(interaction, client) {
		const question = interaction.options.getString('question');	
		const ping = new MessageEmbed()
			.setTitle(`🎱 | Magic 8-Ball`)
			.addField(`__Question__`, `${question}`)
			.addField(`__Answer__`, `${answers[Math.floor(Math.random() * answers.length)]}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: false});
	},
};