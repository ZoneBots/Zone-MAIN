const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
const { create } = require('discord-timestamps');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Unban')
		.addUserOption(option => option.setName('user').setDescription('Enter the user that u wanna unban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Enter the reason for the unban').setRequired(true)),		
	execute(interaction) {
		const user2 = interaction.options.getUser('user');
		const user = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.staffRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });
		const banned = new MessageEmbed()
			.setTitle(`🔨 | Unbanned`)
			.setDescription(`\n ${user2} has been unbanned!`)
			.addField(`__User__`, `${user2}`)
			.addField(`__Moderator__`, `${interaction.user}`)
			.addField(`__Reason__`, `${reason}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()					
		const banneduser = new MessageEmbed()
			.setTitle(`🔨 | Unbanned`)
			.setDescription(`\n You have been unbanned from **${interaction.guild.name}**! \n Invite link: ${settings.inviteURL}`)
			.addField(`__User__`, `${user2}`)
			.addField(`__Moderator__`, `${interaction.user}`)
			.addField(`__Reason__`, `${reason}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.guild.members.unban(user2);
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [banned] });
		return interaction.reply({ embeds: [banned]});		
	},
};