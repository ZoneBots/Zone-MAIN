const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Lock channel'),
	async execute(interaction, client) {
		const ping = new MessageEmbed()
			.setTitle(`🔒 | Locked`)
			.setDescription(`\n This channel has been locked!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
					
		const log = new MessageEmbed()
			.setTitle(`🔒 | Channel locked`)
			.addField(`__Channel__`, `${interaction.channel}`)
			.addField(`__Moderator__`, `${interaction.member}`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.channel.permissionOverwrites.edit(`${settings.memberRoleID}`, {
			SEND_MESSAGES: false,
			READ_MESSAGE_HISTORY: true,
			ATTACH_FILES: false
		});			
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [log] });		
		return interaction.reply({ embeds: [ping] });
	},
};