const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Unlock channel'),
	async execute(interaction, client) {
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.staffRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });

		const ping = new MessageEmbed()
			.setTitle(`🔓 | Locked`)
			.setDescription(`\n This channel has been locked!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
					
		const log = new MessageEmbed()
			.setTitle(`🔓| Channel unlocked`)
			.addField(`__Channel__`, `${interaction.channel}`)
			.addField(`__Moderator__`, `${interaction.member}`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.channel.permissionOverwrites.edit(settings.memberRoleID, {
			SEND_MESSAGES: true,
			READ_MESSAGE_HISTORY: true,
			ATTACH_FILES: true
		});			
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [log] });		
		return interaction.reply({ embeds: [ping] });
	},
};