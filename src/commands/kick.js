const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Kick')
		.addUserOption(option => option.setName('member').setDescription('Enter the user that you wanna kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Enter the reason for the kick').setRequired(true)),		
	execute(interaction) {
		const user2 = interaction.options.getUser('member');
		const user = interaction.options.getMember('member');
		const reason = interaction.options.getString('reason');

		const kicked = new MessageEmbed()
			.setTitle(`📤 | Kicked`)
			.setDescription(`\n ${user2} has been kicked!`)
			.addField(`User:`, user2.tag)
			.addField(`Moderator:`, interaction.user.tag)
			.addField(`Reason:`, `${reason}`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		const kickeduser = new MessageEmbed()
			.setTitle(`📤 | Kicked`)
			.setDescription(`\n You have been kicked from ${interaction.guild.name}!`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		user.kick();
		console.log(`\u001b[1;31m[KICKED] ` + `\u001b[0m${user2.tag} is gekicked in ${interaction.guild.name}`);
		user.send({ embeds: [kickeduser]}).catch(async err => {
			console.log(err);

			const cannotdm = new MessageEmbed()
				.setTitle(`⛔ | Cannot DM`)
				.setDescription(`\n I cannot DM this ${user}!`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
			interaction.channel.send({ embeds: [cannotdm]});
		});
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [kicked] });
		return interaction.reply({ embeds: [kicked]});		
	},
};