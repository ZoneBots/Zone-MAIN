const { MessageEmbed } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		if (settings.verifyED === true) {
            member.roles.add(settings.memberRoleID);
		}else if (!settings.verifyED === true){
            member.roles.add(settings.verifyRoleID);
        }
	},
};