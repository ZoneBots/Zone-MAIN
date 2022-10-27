const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		if (settings.welcomeMessageED === true) {
			let channel = member.guild.channels.cache.get(settings.WelcomeMessageChannelID);

			var messagedeleted = new MessageEmbed()
				.setTitle(`👋 | Welcome!`)
				.setDescription(`Hello ${member}! Welcome to ${member.guild.name}!`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			channel.send({ embeds: [messagedeleted] });        
		}
	},
};