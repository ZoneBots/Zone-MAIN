const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {

		let channel = oldMessage.guild.channels.cache.get(settings.auditChannelID);
		if (oldMessage.author.bot) return;
		if (oldMessage.content.length > 1020) return;
		if (oldMessage.content.length = 0) return;
		if (newMessage.content.length > 1020) return;
		if (newMessage.content.length = 0) return;		
		if (oldMessage.attachments.size > 0) return;

		var messagedeleted = new MessageEmbed()
			.setTitle(`💬 | Message Edited`)
			.setColor(`${settings.warningColor}`)
			.setAuthor({ name: `${oldMessage.author.tag}`, iconURL: `${oldMessage.author.avatarURL({ size: 4096 })}`})
			.addField("__User__", `<@${oldMessage.author.id}>`, true)
			.addField("__Channel__", `${oldMessage.channel}`, true)
			.addField("__Jump to Message__", `[Click Here](${newMessage.url})`, true)
			.addField("__Old Message__",  ` \`\`\`${oldMessage}\`\`\` `)
			.addField("__New Message__",  ` \`\`\`${newMessage}\`\`\` `)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		channel.send({ embeds: [messagedeleted] });        
	},
};