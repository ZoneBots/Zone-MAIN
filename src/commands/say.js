const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Say'),
	execute(interaction, client) { 
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | No Permissions`)
			.setDescription(`\n You don't have the required permissions to use this command!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
							
		if (!interaction.member.roles.cache.some(role => role.name === settings.adminRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });
		const modal = new Modal()
			.setCustomId(`saymodal`)
			.setTitle(`Make a message`)

		const titel = new TextInputComponent()
			.setCustomId('title')
			.setLabel("Title of the message")
			.setStyle(`SHORT`);
		
		const beschrijving = new TextInputComponent()
			.setCustomId("description")
			.setLabel("The description of the message")
			.setStyle(`PARAGRAPH`);

		const color = new TextInputComponent()
			.setCustomId('color')
			.setLabel("The HEX color of the embed EX: FF0000")
			.setStyle(`SHORT`);
					
 
		const vraag1 = new MessageActionRow().addComponents(titel);
		const vraag2 = new MessageActionRow().addComponents(beschrijving);
		const vraag3 = new MessageActionRow().addComponents(color);

		modal.addComponents(vraag1, vraag2, vraag3);

		interaction.showModal(modal);
	},
};