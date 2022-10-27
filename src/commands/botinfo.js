const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('BotInfo'),
	async execute(interaction, client) {
		const { totalMemMb, usedMemMb } = await mem.info();
		const ping = new MessageEmbed()
			.setTitle(`🛠️ | Bot Info!`)
			.addField("__Ping:__", ` \`\`\`${interaction.createdTimestamp - Date.now()}ms\`\`\` `, true)
			.addField("__LocalTime__", ` \`\`\`${moment().format('MMMM Do YYYY, h:mm:ss a')}         \`\`\` `, true)
			.addField("__OS__", ` \`\`\`${os.type()}\`\`\` `, false)
			.addField("__Cores:__", ` \`\`\`${cpu.count()}\`\`\` `, true)
			.addField("__CPU:__", ` \`\`\`${cpu.model()}\`\`\` `, false)
			.addField("__CPU Usage:__", ` \`\`\`${await cpu.usage()}%\`\`\` `, true)
			.addField("__RAM:__", ` \`\`\`${totalMemMb} MB\`\`\` `, false)
			.addField("__RAM Usage:__", ` \`\`\`${usedMemMb} MB\`\`\` `, true)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: true});
	},
};