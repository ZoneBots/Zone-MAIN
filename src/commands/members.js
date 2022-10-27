const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('members')
		.setDescription('Show the members count'),
	async execute(interaction, client) {
		const members = interaction.guild.roles.cache.get(settings.MemberRoleID).members.size;	
		const ping = new MessageEmbed()
			.setTitle(`📊 | Member Count`)
			.setDescription(`\n There are currently \`${members}\` members in the server!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.reply({ embeds: [ping] });
	},
};