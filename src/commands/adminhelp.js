const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('adminhelp')
		.setDefaultMemberPermissions(8)
		.setDescription('Admin | Information about the bot (PLEASE READ)'),
	async execute(interaction, client) {
		const ping = new MessageEmbed()
			.setTitle(`♥ | Admin Information`)
			.setDescription(`Hello ${interaction.user}, \n I have some information about the ZONE bot... \n If you setup all the settings with **/settings** then you good to go. \n But you saw probbely a message when you setted ur staffrole. \n The reason why you add that permission to the role is because, \n all the slashcommands that are ONLY for moderators cannot been seen by any normal user. \n If you wanna have CUSTOM permission for each command. \n Please contact <@411556214741401602> with that you wanna have custom commands. \n I do it free and i will say how you do it by ur self. \n \n If you have more questions, please contact <@411556214741401602> \n \n Thanks for using ZONE!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: true});
	},
};