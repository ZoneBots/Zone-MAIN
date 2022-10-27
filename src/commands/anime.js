const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Anime pictures / gifs')
		.addSubcommand(subcommand =>
			subcommand
				.setName('wink')
				.setDescription('Wink at someone')
                .addUserOption(option => option.setName('wink_user').setDescription('Enter the user that u wanna wink at').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('pat')
				.setDescription('Pat someone')
                .addUserOption(option => option.setName('pat_user').setDescription('Enter the user that u wanna pat').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('hug')
				.setDescription('Hug someone')
                .addUserOption(option => option.setName('hug_user').setDescription('Enter the user that u wanna hug').setRequired(true))
        ),     	        	        	        	        	        																		
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'wink') {
            const user = interaction.options.getUser('wink_user');	
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animu/wink";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`😉 | Wink`)
                .setDescription(`\n ${interaction.user} winked at ${user}`)
                .setImage(image.link)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'pat') {
            const user = interaction.options.getUser('pat_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animu/pat";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🤏 | Pat`)
                .setDescription(`\n ${interaction.user} patted ${user}`)
                .setImage(image.link)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'hug') {
            const user = interaction.options.getUser('hug_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animu/hug";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🤗 | Hug`)
                .setDescription(`\n ${interaction.user} hugged ${user}`)
                .setImage(image.link)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}                                        
    },
};