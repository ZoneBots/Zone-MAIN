	const { MessageEmbed } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'channelUpdate',
		async execute(oldChannel, newChannel) {

		let auditchannel = newChannel.guild.channels.cache.get(settings.auditChannelID);
		const fetchedLogs = await newChannel.guild.fetchAuditLogs({
			limit: 1,
			type: 'CHANNEL_UPDATE',
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
	
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return console.log(`Audit log not found.`);
	
		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things

		const { executor, target } = deletionLog;
		var messagedeleted = new MessageEmbed()
			.setTitle(`🗃 | Channel Changed`)
			.setColor(`${settings.warningColor}`)
			.addField("__User__", `<@${executor.id}>`, false)
			.addField("__Old Channel Name__", `**#${oldChannel.name}**`, true)
			.addField("__New Channel Name__", `**#${newChannel.name}**`, true)  
			.addField("__Old Topic__",  ` \`\`\`${oldChannel.topic}\`\`\` `)
			.addField("__New Topic__",  ` \`\`\`${newChannel.topic}\`\`\` `)
			.setTimestamp()
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		auditchannel.send({ embeds: [messagedeleted] });

	},
};