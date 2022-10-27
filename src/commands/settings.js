const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const settings = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDefaultMemberPermissions(8)
		.setDescription('Admin | Change the settings of the bot')
		.addSubcommand(subcommand =>
			subcommand
				.setName('auditlog')
				.setDescription('Admin | Change the auditlog channel')
				.addChannelOption(option => option.setName('audit_channel').setDescription('The channel to set as auditlog').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('modlog')
				.setDescription('Admin | Change the modlog channel')
				.addChannelOption(option => option.setName('mod_channel').setDescription('The channel to set as modlogs').setRequired(true))
		)		
		.addSubcommand(subcommand =>
			subcommand
				.setName('ticketlog')
				.setDescription('Admin | Change the ticketlog channel')
				.addChannelOption(option => option.setName('ticket_channel').setDescription('The channel to set as ticketlog').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('defaultembedcolor')
				.setDescription('Admin | Change the default embed color')
				.addStringOption(option => option.setName('hexcolor').setDescription('Enter the HEX color for the default embed color').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('dangerembedcolor')
				.setDescription('Admin | Change the danger embed color')
				.addStringOption(option => option.setName('hexcolor_danger').setDescription('Enter the HEX color for the danger embed color').setRequired(true))
		)			
		.addSubcommand(subcommand =>
			subcommand
				.setName('warningembedcolor')
				.setDescription('Admin | Change the warning embed color')
				.addStringOption(option => option.setName('hexcolor_warning').setDescription('Enter the HEX color for the warning embed color').setRequired(true))
		)		
		.addSubcommand(subcommand =>
			subcommand
				.setName('staffrole')
				.setDescription('Admin |  Change the staff role')
				.addRoleOption(option => option.setName('staff_role').setDescription('Enter the staff role').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('adminrole')
				.setDescription('Admin |  Change the admin role')
				.addRoleOption(option => option.setName('admin_role').setDescription('Enter the admin role').setRequired(true))
		)	
		.addSubcommand(subcommand =>
			subcommand
				.setName('memberrole')
				.setDescription('Admin |  Change the member role')
				.addRoleOption(option => option.setName('member_role').setDescription('Enter the member role').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('verifyrole')
				.setDescription('Admin |  Change the verify role')
				.addRoleOption(option => option.setName('verify_role').setDescription('Enter the verify role').setRequired(true))
		)	
		.addSubcommand(subcommand =>
			subcommand
				.setName('verify_ed')
				.setDescription('Admin | Do you wanna use the verify system?')
				.addStringOption(option =>
					option.setName('enable_disable_verify')
						.setDescription('Enable or disable the verfiy system')
						.setRequired(true)				
						.addChoices(
							{ name: '✅ • Enable', value: 'verify_yes' },
							{ name: '❌ • Disable', value: 'verify_no' },
						)
				)
		)				
		.addSubcommand(subcommand =>
			subcommand
				.setName('footertext')
				.setDescription('Admin | Change the text in the footer of the embeds')
				.addStringOption(option => option.setName('footer_text').setDescription('Enter the footer text').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('footericon')
				.setDescription('Admin | Change the icon in the footer of the embeds')
				.addStringOption(option => option.setName('footer_icon').setDescription('Enter the footer icon URL').setRequired(true))
		)	
		.addSubcommand(subcommand =>
			subcommand
				.setName('welcomemessage')
				.setDescription('Admin | Do you want a welcome message?')
				.addStringOption(option =>
					option.setName('enable_disable_welcomemessage')
						.setDescription('Enable or disable the welcome message')
						.setRequired(true)				
						.addChoices(
							{ name: '✅ • Enable', value: 'welcomeM_yes' },
							{ name: '❌ • Disable', value: 'welcomeM_no' },
						)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('welcomemessagechannel')
				.setDescription('Admin | Change the welcome message channel')
				.addChannelOption(option => option.setName('welcomemessage_channel').setDescription('Enter the channel').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('suggestions')
				.setDescription('Admin | Do you wanna use suggestions?')
				.addStringOption(option =>
					option.setName('enable_disable_suggestions')
						.setDescription('Enable or disable the suggestions')
						.setRequired(true)				
						.addChoices(
							{ name: '✅ • Enable', value: 'suggestions_yes' },
							{ name: '❌ • Disable', value: 'suggestions_no' },
						)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('suggestionchannel')
				.setDescription('Admin | Change the suggestions channel')
				.addChannelOption(option => option.setName('suggestions_channel').setDescription('Enter the channel').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('invitelink')
				.setDescription('Admin | Change the invite link')
				.addStringOption(option => option.setName('invite_link').setDescription('Enter the invite url').setRequired(true))
		),																				
	execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'auditlog') {
			const auditchannel = interaction.options.getChannel('audit_channel');	
			//settings[auditChannelID] = channel.id
			//var config = JSON.parse(fs.readFileSync('./config.json'));
			settings.auditChannelID = auditchannel.id;
			//config.auditChannelID = auditchannel.id;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The auditlog channel has been set to ${auditchannel}`)
				.addField("New Channel", ` ${auditchannel} `)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const channelsetted = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.setDescription(`This channel is **now** the auditlog channel`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()

			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Channel__", `${auditchannel}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });				
			auditchannel.send({ embeds: [channelsetted] });
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}
		if (interaction.options.getSubcommand() === 'modlog') {
			const modchannel = interaction.options.getChannel('mod_channel');
			//settings[auditChannelID] = channel.id
			//var config = JSON.parse(fs.readFileSync('./config.json'));
			settings.modchannelId = modchannel.id;
			//config.auditChannelID = auditchannel.id;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The modlog channel has been set to ${modchannel}`)
				.addField("New Channel", ` ${modchannel} `)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			const channelsetted = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.setDescription(`This channel is **now** the modlog channel`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()
					
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Channel__", `${modchannel}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });
			modchannel.send({ embeds: [channelsetted] });
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}		
		if (interaction.options.getSubcommand() === 'ticketlog') {
			const ticketchannel = interaction.options.getChannel('ticket_channel');	
			settings.ticketChannelID = ticketchannel.id;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The ticket log channel has been set to ${ticketchannel}`)
				.addField("New Channel", ` ${ticketchannel} `)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const channelsetted = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.setDescription(`This channel is **now** the ticket log channel`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()

			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Channel__", `${ticketchannel}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			ticketchannel.send({ embeds: [channelsetted] });
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}		
		if (interaction.options.getSubcommand() === 'defaultembedcolor') {
			const hexcolor = interaction.options.getString('hexcolor');	
			settings.defaultColor = `#${hexcolor}`;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The default embed color has been changed to ${hexcolor}`)
				.addField("Color is", ` #${hexcolor} `)
				.setColor(`#${hexcolor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Color__", `#${hexcolor}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}			
		if (interaction.options.getSubcommand() === 'dangerembedcolor') {
			const hexcolordanger = interaction.options.getString('hexcolor_danger');
			settings.dangerColor = `#${hexcolordanger}`;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The danger embed color has been changed to ${hexcolordanger}`)
				.addField("Color is", ` #${hexcolordanger} `)
				.setColor(`#${hexcolordanger}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Color__", `#${hexcolordanger}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}			
		if (interaction.options.getSubcommand() === 'warningembedcolor') {
			const hexcolorwarning = interaction.options.getString('hexcolor_warning');
			settings.warningColor = `#${hexcolorwarning}`;

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The warning embed color has been changed to ${hexcolorwarning}`)
				.addField("Color is", ` #${hexcolorwarning} `)
				.setColor(`#${hexcolorwarning}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Color__", `#${hexcolorwarning}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}			
		if (interaction.options.getSubcommand() === 'staffrole') {
			const staffrole = interaction.options.getRole('staff_role');	
			settings.staffRole = staffrole.name
			settings.staffRoleID = staffrole.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The staff role has been changed to ${staffrole} \n\n **NOTE:** Please give the ${staffrole} the **MANAGE_MESSAGES** permission to use the moderation commands.`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Role__", `${staffrole}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			
			
			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}
		if (interaction.options.getSubcommand() === 'adminrole') {
			const adminrole = interaction.options.getRole('admin_role');
			settings.adminRole = adminrole.name
			settings.adminRoleId = adminrole.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The staff role has been changed to ${adminrole}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Role__", `${adminrole}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}
		if (interaction.options.getSubcommand() === 'memberrole') {
			const memberrole = interaction.options.getRole('member_role');
			settings.memberRole = memberrole.name
			settings.memberRoleID = memberrole.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The member role has been changed to ${memberrole}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Role__", `${memberrole}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}	
		if (interaction.options.getSubcommand() === 'verifyrole') {
			const verifyrole = interaction.options.getRole('verify_role');	
			settings.verifyRole = verifyrole.name
			settings.verifyRoleID = verifyrole.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The verify role has been changed to ${verifyrole}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Role__", `${verifyrole}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}					
		if (interaction.options.getSubcommand() === 'footertext') {
			const footertext = interaction.options.getString('footer_text');	
			settings.footerText = footertext

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The footer text has been changed to`)
				.addField("Footer:", ` \`\`\`${footertext}\`\`\` `)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Text__", `${footertext}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));						
		}		
		if (interaction.options.getSubcommand() === 'footericon') {
			const footericon = interaction.options.getString('footer_icon');	
			settings.footerIcon = footericon

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The footer icon has been changed to`)
				.addField("Footer Icon:", ` \`\`\`${footericon}\`\`\` `)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.setThumbnail(`${footericon}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}										
		if (interaction.options.getSubcommand() === 'welcomemessage') {
			const welcomemessageED = interaction.options.getString('enable_disable_welcomemessage');
			console.log(welcomemessageED);
			if (welcomemessageED === 'welcomeM_yes') {
				settings.welcomeMessageED = true
	
				const embed = new MessageEmbed()
					.setTitle(`✅ | Settings Updated!`)
					.setDescription(`The welcome message is now \n \n **ENABLED**`)
					.setColor(`#4abd3a`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
				console.log(settings);
				interaction.reply({ embeds: [embed], ephemeral: true});
				fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
			}else if (welcomemessageED === 'welcomeM_no') {
				settings.welcomeMessageED = false
	
				const embed = new MessageEmbed()
					.setTitle(`✅ | Settings Updated!`)
					.setDescription(`The welcome message is now \n \n **DISABLED**`)
					.setColor(`#4abd3a`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
				console.log(settings);
				interaction.reply({ embeds: [embed], ephemeral: true});
				fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
			}
		}
		if (interaction.options.getSubcommand() === 'welcomemessagechannel') {
			const welcomemessageChannel = interaction.options.getChannel('welcomemessage_channel');interaction.reply({ embeds: [embed], ephemeral: true});
			settings.WelcomeMessageChannelID = welcomemessageChannel.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The welcome message channel has been changed to ${welcomemessageChannel}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

				
			const channelsetted = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.setDescription(`This channel is **now** the welcome message channel`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()
				
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Channel__", `${welcomemessageChannel}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			welcomemessageChannel.send({ embeds: [channelsetted] });				
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}
		if (interaction.options.getSubcommand() === 'suggestions') {
			const suggestionsED = interaction.options.getString('enable_disable_suggestions');
			console.log(suggestionsED);
			if (suggestionsED === 'suggestions_yes') {
				settings.suggestionsED = true
	
				const embed = new MessageEmbed()
					.setTitle(`✅ | Settings Updated!`)
					.setDescription(`The suggestions are now \n \n **ENABLED**`)
					.setColor(`#4abd3a`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
				console.log(settings);
				interaction.reply({ embeds: [embed], ephemeral: true});
				fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
			}else if (suggestionsED === 'suggestions_no') {
				settings.suggestionsED = false
	
				const embed = new MessageEmbed()
					.setTitle(`✅ | Settings Updated!`)
					.setDescription(`The suggestions are now \n \n **DISABLED**`)
					.setColor(`#4abd3a`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
				console.log(settings);
				interaction.reply({ embeds: [embed], ephemeral: true});
				fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
			}
		}
		if (interaction.options.getSubcommand() === 'suggestionchannel') {
			const suggestionchannel = interaction.options.getChannel('suggestions_channel');
			settings.suggestionChannelID = suggestionchannel.id

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The suggestion channel has been changed to ${suggestionchannel}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

				
			const channelsetted = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.setDescription(`This channel is **now** the suggestion channel`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()
				
			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__Channel__", `${suggestionchannel}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			suggestionchannel.send({ embeds: [channelsetted] });				
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}		
		if (interaction.options.getSubcommand() === 'invitelink') {
			const inviteURL = interaction.options.getString('invite_link');
			settings.inviteURL = inviteURL

			const embed = new MessageEmbed()
				.setTitle(`✅ | Settings Updated!`)
				.setDescription(`The invite url has been changed to ${inviteURL}`)
				.setColor(`#4abd3a`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			const modlog = new MessageEmbed()
				.setTitle(`✅ | Setting Updated!`)
				.addField("__Setting__", `${interaction.options.getSubcommand()}`)
				.addField("__User__", `<@${interaction.user.id}>`)
				.addField("__URL__", `${inviteURL}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				.setTimestamp()			

			let modlogCHANNEL = interaction.guild.channels.cache.get(settings.modchannelId);			
			modlogCHANNEL.send({ embeds: [modlog] });						
			console.log(settings);
			interaction.reply({ embeds: [embed], ephemeral: true});
			fs.writeFileSync('./src/config.json', JSON.stringify(settings, null, 2));			
		}											
	},
};