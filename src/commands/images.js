const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('images')
		.setDescription('Get a other versoion of the profile picture of a user')
		.addSubcommand(subcommand =>
			subcommand
				.setName('bisexual')
				.setDescription('Get a bisexual version of the profile picture of a user')
                .addUserOption(option => option.setName('bi_user').setDescription('Enter the user that u wanna make bisexual').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('blur')
				.setDescription('Get a blurred version of the profile picture of a user')
                .addUserOption(option => option.setName('blur_user').setDescription('Enter the user that u wanna make blurry').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('horny')
				.setDescription('Get a horny version of the profile picture of a user')
                .addUserOption(option => option.setName('horny_user').setDescription('Enter the user that u wanna make horny 😜').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('itssostupid')
				.setDescription('Get a its so stupid version of the profile picture of a user')
                .addUserOption(option => option.setName('itssostupid_user').setDescription('Enter the user that u wanna make stupid').setRequired(true))
        ) 
        .addSubcommand(subcommand =>
			subcommand
				.setName('jpg')
				.setDescription('Get a JPG version of the profile picture of a user')
                .addUserOption(option => option.setName('jpg_user').setDescription('Enter the user that u wanna make JPG').setRequired(true))
        )  
        .addSubcommand(subcommand =>
			subcommand
				.setName('lesbian')
				.setDescription('Get a lesbian version of the profile picture of a user')
                .addUserOption(option => option.setName('lesbian_user').setDescription('Enter the user that u wanna make lesbian').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('lgbt')
				.setDescription('Get a LGBT version of the profile picture of a user')
                .addUserOption(option => option.setName('lgbt_user').setDescription('Enter the user that u wanna make LGBT').setRequired(true))
        )    
        .addSubcommand(subcommand =>
			subcommand
				.setName('lolice')
				.setDescription('Get a lolice version of the profile picture of a user')
                .addUserOption(option => option.setName('lolice_user').setDescription('Enter the user that u wanna put in JAIL').setRequired(true))
        )   
        .addSubcommand(subcommand =>
			subcommand
				.setName('nonbinary')
				.setDescription('Get a non binary version of the profile picture of a user')
                .addUserOption(option => option.setName('nonbinary_user').setDescription('Enter the user that u wanna make non binary').setRequired(true))
        )  
        .addSubcommand(subcommand =>
			subcommand
				.setName('oogway')
				.setDescription('Make oogway say something')
                .addStringOption(option => option.setName('oogway_string').setDescription('Enter what oogway needs to say').setRequired(true))
        )  
        .addSubcommand(subcommand =>
			subcommand
				.setName('oogway2')
				.setDescription('Make oogway say something')
                .addStringOption(option => option.setName('oogway2_string').setDescription('Enter what oogway needs to say').setRequired(true))
        )   
        .addSubcommand(subcommand =>
			subcommand
				.setName('pansexual')
				.setDescription('Get a pansexual version of the profile picture of a user')
                .addUserOption(option => option.setName('pansexual_user').setDescription('Enter the user that u wanna make pan sexual').setRequired(true))
        ) 
        .addSubcommand(subcommand =>
			subcommand
				.setName('pixelate')
				.setDescription('Get a pixelated version of the profile picture of a user')
                .addUserOption(option => option.setName('pixelate_user').setDescription('Enter the user that u wanna make pixelated').setRequired(true))
        )      
        .addSubcommand(subcommand =>
			subcommand
				.setName('simp')
				.setDescription('Get a simp version of the profile picture of a user')
                .addUserOption(option => option.setName('simp_user').setDescription('Enter the user that u wanna make a simp').setRequired(true))                
        )                                                                            	        	        	        	        			
        .addSubcommand(subcommand =>
			subcommand
				.setName('spin')
				.setDescription('Get a spinned version of the profile picture of a user')
                .addUserOption(option => option.setName('spin_user').setDescription('Enter the user that u wanna make spin').setRequired(true))
        ) 
        .addSubcommand(subcommand =>
			subcommand
				.setName('transgender')
				.setDescription('Get a transgender version of the profile picture of a user')
                .addUserOption(option => option.setName('transgender_user').setDescription('Enter the user that u wanna make a transgender').setRequired(true))
        ),           															
	execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'bisexual') {
            const user = interaction.options.getUser('bi_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳️‍🌈 | Bisexual`)
                .setImage(`https://some-random-api.ml/canvas/bisexual?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'blur') {
            const user = interaction.options.getUser('blur_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🔍 | Blur`)
                .setImage(`https://some-random-api.ml/canvas/blur?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'horny') {
            const user = interaction.options.getUser('horny_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`😜 | Horny`)
                .setImage(`https://some-random-api.ml/canvas/horny?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}       
		if (interaction.options.getSubcommand() === 'itssostupid') {
            const user = interaction.options.getUser('itssostupid_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🤦‍♂️ | It's so stupid`)
                .setImage(`https://some-random-api.ml/canvas/its-so-stupid?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}         
		if (interaction.options.getSubcommand() === 'jpg') {
            const user = interaction.options.getUser('jpg_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`📷 | JPG`)
                .setImage(`https://some-random-api.ml/canvas/jpg?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
		if (interaction.options.getSubcommand() === 'lesbian') {
            const user = interaction.options.getUser('lesbian_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳‍🌈 | Lesbian`)	
                .setImage(`https://some-random-api.ml/canvas/lesbian?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}     
		if (interaction.options.getSubcommand() === 'lgbt') {
            const user = interaction.options.getUser('lgbt_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳‍🌈 | LGBT`)	
                .setImage(`https://some-random-api.ml/canvas/lgbt?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
		if (interaction.options.getSubcommand() === 'lolice') {
            const user = interaction.options.getUser('lolice_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`👨‍⚖️ | Lolice`)		
                .setImage(`https://some-random-api.ml/canvas/lolice?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (interaction.options.getSubcommand() === 'nonbinary') {
            const user = interaction.options.getUser('nonbinary_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳‍🌈 | Nonbinary`)	
                .setImage(`https://some-random-api.ml/canvas/nonbinary?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
        if (interaction.options.getSubcommand() === 'oogway') {
            const string = interaction.options.getString('oogway_string');
            var replaced = string.split(' ').join('+');   
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🐢 | Oogway`)	
                .setImage(`https://some-random-api.ml/canvas/oogway?quote=${replaced}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}       
        if (interaction.options.getSubcommand() === 'oogway2') {
            const string = interaction.options.getString('oogway2_string');
            var replaced = string.split(' ').join('+');   
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🐢 | Oogway`)	
                .setImage(`https://some-random-api.ml/canvas/oogway2?quote=${replaced}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		} 
		if (interaction.options.getSubcommand() === 'pansexual') {
            const user = interaction.options.getUser('pansexual_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳‍🌈 | Pansexual`)	
                .setImage(`https://some-random-api.ml/canvas/pansexual?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
		if (interaction.options.getSubcommand() === 'pixelate') {
            const user = interaction.options.getUser('pixelate_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`📷 | Pixelate`)	
                .setImage(`https://some-random-api.ml/canvas/pixelate?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}  
		if (interaction.options.getSubcommand() === 'simp') {
            const user = interaction.options.getUser('simp_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🤡 | Simp`)
                .setImage(`https://some-random-api.ml/canvas/simp?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		} 
		if (interaction.options.getSubcommand() === 'spin') {
            const user = interaction.options.getUser('spin_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🌀 | Spin`)
                .setImage(`https://some-random-api.ml/canvas/spin?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}   
		if (interaction.options.getSubcommand() === 'transgender') {
            const user = interaction.options.getUser('transgender_user');
            const error = new MessageEmbed()
                .setTitle(`⛔ | Error`)
                .setDescription(`\n There was an error while getting the image! \nThe API might be down!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            

			const embed = new MessageEmbed()
				.setTitle(`🏳‍🌈 | Transgender`)
                .setImage(`https://some-random-api.ml/canvas/transgender?avatar=${user.avatarURL({ format: 'png' })}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
        }                                                                                                                                         
    },
};