const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        if(settings.suggestionsED === true) {
            if(message.author.bot) return;

            if (message.channel.id === settings.suggestionChannelID) {
                message.delete()
                                        
                    
                const suggestie = new MessageEmbed()
                    .setTitle(`💡 | Suggestion`)
                    .setDescription(`\n\n ${message}`)
                    .setColor(`${settings.warningColor}`)
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}`})
                
                message.channel.send({ embeds: [suggestie]})
                    .then(function (message) {
                        message.react("👍")
                        message.react("👎")
                    })
            }
        }
	},
};