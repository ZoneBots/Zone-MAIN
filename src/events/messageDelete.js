	const { MessageEmbed } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'messageDelete',
		execute(message) {

		let channel = message.guild.channels.cache.get(settings.auditChannelID);
		if (message.author.bot) return;
		if (message.channel.id === settings.suggestionChannelID) return;
		if (message.content.length > 1020) return;
		if (message.content.length = 0) return;
		if (message.attachments.size > 0) return;

		var messagedeleted = new MessageEmbed()
			.setTitle(`💬 | Message Deleted`)
			.setColor(`${settings.warningColor}`)
			.setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ size: 4096 })}`})
			.addField("__User__", `<@${message.author.id}>`, true)
			.addField("__Channel__", `${message.channel}`, true) 
			.addField("__Message__",  ` \`\`\`${message}\`\`\` `)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		channel.send({ embeds: [messagedeleted] });

		console.log(`\u001b[1;36m[LOGGER]` + `\u001b[0m Message Content: "${message}" Message author: @${message.author.tag} Channel: #${message.channel.name}`);        
	},
};