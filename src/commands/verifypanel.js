const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verifypanel')
		.setDefaultMemberPermissions(2000)
		.setDescription('Developer Command | Verify Panel'),
	async execute(interaction, client) {
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.adminRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });
		
		const verify = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('verify')
				.setLabel('Verify')
				.setEmoji('✅')
				.setStyle('SUCCESS'),
			);	

		const ping = new MessageEmbed()
			.setTitle(`✅ | Verify`)
			.setDescription(`\n Click the button below to verify!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.channel.send({ embeds: [ping], components: [verify] });
	},
};