const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('animals')
		.setDescription('Get a random picture of a animal')
		.addSubcommand(subcommand =>
			subcommand
				.setName('dog')
				.setDescription('Get a random picture of a dog')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('cat')
				.setDescription('Get a random picture of a cat')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('panda')
				.setDescription('Get a random picture of a panda')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('fox')
				.setDescription('Get a random picture of a fox')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('redpanda')
				.setDescription('Get a random picture of a red panda')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('koala')
				.setDescription('Get a random picture of a koala')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('bird')
				.setDescription('Get a random picture of a bird')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('raccoon')
				.setDescription('Get a random picture of a raccoon')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('kangaroo')
				.setDescription('Get a random picture of a kangaroo')
        ),	        	        	        	        	        	        																		
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'dog') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/img/dog";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐶 | Dog`)
                .setImage(image.link)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'cat') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/img/cat";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐱 | Cat`)
                .setImage(image.link)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'panda') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/panda";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐼 | Panda`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'fox') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/fox";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🦊 | Fox`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}          
		if (interaction.options.getSubcommand() === 'koala') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/koala";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐨 | Koala`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}      
		if (interaction.options.getSubcommand() === 'redpanda') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/red_panda";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐼 | Red Panda`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}   
		if (interaction.options.getSubcommand() === 'bird') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/bird";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🐦 | Bird`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		} 
		if (interaction.options.getSubcommand() === 'raccoon') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/raccoon";
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🦝 | Raccoon`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
		if (interaction.options.getSubcommand() === 'kangaroo') {
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
            const url = "https://some-random-api.ml/animal/kangaroo";   
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
    
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }

			const embed = new MessageEmbed()
				.setTitle(`🦘 | Kangaroo`)
                .setImage(image.image)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}                                          
    },
};