const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Slowmode')
		.addNumberOption(option => option.setName('seconds').setDescription('How many seconds does the slowmode need').setRequired(true)),		
	execute(interaction, client) {
		const seconds = interaction.options.getNumber('seconds');
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.staffRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });
		console.log(seconds);
		if (seconds === 0) {
			const kicked = new MessageEmbed()
				.setTitle(`⌛ | Slowmode`)
				.setDescription(`\n You **DISABLED** the slowmode\n`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})


				const log = new MessageEmbed()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **DISALBED**\n`)
					.addField(`Slowmode`, `${seconds} seconds`)
					.addField(`Moderator`, `${interaction.member}`)
					.addField(`Channel`, `${interaction.channel}`)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
				
			let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
			channel.send({ embeds: [log] });							
			interaction.channel.setRateLimitPerUser(seconds)
			return interaction.reply({ embeds: [kicked]});
		} else {
				const kicked = new MessageEmbed()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **ENABLED**\n`)
					.addField(`Slowmode`, ` **${seconds}** seconds `)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

				const log = new MessageEmbed()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **ENABLED**\n`)
					.addField(`Slowmode`, `${seconds} seconds`)
					.addField(`Moderator`, `${interaction.member}`)
					.addField(`Channel`, `${interaction.channel}`)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})					
					
				let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
				channel.send({ embeds: [log] });						
				interaction.channel.setRateLimitPerUser(seconds)
				return interaction.reply({ embeds: [kicked]});			
			}
	},
};