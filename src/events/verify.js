const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'verify') {
            let channel = interaction.guild.channels.cache.get(settings.auditChannelID);

            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const verifed = new MessageEmbed()
                .setTitle(`✅ | User Verifed`)
                .setDescription(`${user} has verified.`)
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                .setTimestamp()
            const ticketdeleting = new MessageEmbed()
                .setTitle(`✅ | Verify`)
                .setDescription("You have been verified!")
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                                
            interaction.reply({ embeds: [ticketdeleting], ephemeral: true })
            channel.send({ embeds: [verifed] })
            interaction.member.roles.add(settings.memberRoleID);
            interaction.member.roles.remove(settings.verifyRoleID);
            //interaction.reply({ embeds: [verify], ephemeral: true })        
        }     
    },
}
                                            