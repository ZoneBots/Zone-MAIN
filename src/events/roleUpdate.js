	const { MessageEmbed } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'roleUpdate',
		async execute(oldRole, newRole) {

		let auditchannel = newRole.guild.channels.cache.get(settings.auditChannelID);
		const fetchedLogs = await newRole.guild.fetchAuditLogs({
			limit: 1,
			type: 'ROLE_UPDATE',
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
	
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return console.log(`Audit log not found.`);
	
		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things
		let newPerms = newRole.permissions.toArray()
		let oldPerms = oldRole.permissions.toArray()
		 
		let addedPerms = newPerms
			.filter(p => !oldPerms.includes(p));
			if (addedPerms.length > 0) {
				addedPerms = "None"
			}
		let removedPerms = oldPerms
			.filter(p => !newPerms.includes(p));
			if (removedPerms.length > 0) {
				removedPerms = "None"
			}
		 
		console.log(removedPerms)
		console.log(addedPerms)
		const { executor, target } = deletionLog;
		var messagedeleted = new MessageEmbed()
			.setTitle(`👜 | Role Deleted`)
			.setColor(`${settings.warningColor}`)
			.addField("__User__", `<@${executor.id}>`, false)
			.addField("__Old RoleName__", `@${oldRole.name}`, true) 
			.addField("__New RoleName__", `@${newRole.name}`, true)
			.addField("__Old RoleColor__", `#${oldRole.color}`, true)	
			.addField("__New RoleColor__", `#${newRole.color}`, true)
			.addField("__Added Permissions__", `${addedPerms}`, true)
			.addField("__Removed Permissions__", `${removedPerms}`, true)
			.setTimestamp()
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		auditchannel.send({ embeds: [messagedeleted] });

	},
};