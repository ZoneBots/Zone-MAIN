const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Clear Mesages')
		.addNumberOption(option => option.setName('messages').setDescription(`Enter the ammount messages that you wanna delete.`).setRequired(true)),
	async execute(interaction) {
		const number = interaction.options.getNumber('messages');
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.staffRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });

		const ping = new MessageEmbed()
			.setTitle(`📦 | Clear`)
			.setDescription(`\n ${number} messages have been deleted!`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
	
		interaction.channel.bulkDelete(number)
		return interaction.reply({ embeds: [ping] });
	},
};