const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
const { create } = require('discord-timestamps');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Staff Command | Ban')
		.setDefaultMemberPermissions(2000)
		.addUserOption(option => option.setName('user').setDescription('Enter the user that u wanna ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Enter the reason for the ban').setRequired(true)),		
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
			.setTitle(`🔨 | Banned`)
			.setDescription(`\n ${user} has been banned!`)
			.addField(`__User__`, `${user}`)
			.addField(`__Moderator__`, `${interaction.user}`)
			.addField(`__Reason__`, `${reason}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()					
		const banneduser = new MessageEmbed()
			.setTitle(`🔨 | Banned`)
			.setDescription(`\n You have been banned from **${interaction.guild.name}**!`)
			.addField(`__User__`, `${user}`)
			.addField(`__Moderator__`, `${interaction.user}`)
			.addField(`__Reason__`, `${reason}`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.guild.members.ban(user2);
		console.log(`\u001b[1;31m[BANNED] ` + `\u001b[0m${user.tag} is gebanned in ${interaction.guild.name}`);
		user.send({ embeds: [banneduser]}).catch(async err => {
			console.log(err);

			const cannotdm = new MessageEmbed()
				.setTitle(`⛔ | Cannot DM`)
				.setDescription(`\n I cannot DM this ${user}!`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
			interaction.channel.send({ embeds: [cannotdm]});
		});
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [banned] });
		return interaction.reply({ embeds: [banned]});		
	},
};