	const { MessageEmbed } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'channelCreate',
		async execute(channel) {

		let auditchannel = channel.guild.channels.cache.get(settings.auditChannelID);
		const fetchedLogs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: 'CHANNEL_CREATE',
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
	
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return console.log(`Audit log not found.`);
	
		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things
		const { executor, target } = deletionLog;
		var messagedeleted = new MessageEmbed()
			.setTitle(`🗃 | Channel Created`)
			.setColor(`${settings.warningColor}`)
			.addField("__User__", `<@${executor.id}>`, true)
			.addField("__Channel__", `${channel}`, true) 
			.addField("__Type__",  ` \`\`\`${channel.type}\`\`\` `)
			.setTimestamp()
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		auditchannel.send({ embeds: [messagedeleted] });

	},
};