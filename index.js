const { Client, Collection, Intents, MessageEmbed, Guild } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { token } = require('./token.json');
const settings = require('./src/config.json');
const { clientId, guildId } = require('./config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES /// <= Don't miss this :)
    ]
});

//############################################################################################
//    
//                                      EVENTS
//
//############################################################################################
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//############################################################################################
//    
//                                      COMMANDS
//
//############################################################################################
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.data.name, command);
}

const commands = [
    new SlashCommandBuilder()
        .setName('settings')
		.setDefaultMemberPermissions(2000)
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
				.setDescription('Admin | Change the ticketlog channel')
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
				.setDescription('Admin |  Change the verify role (TO DISABLE THIS ENTER THE MEMBER ROLE)')
				.addRoleOption(option => option.setName('verify_role').setDescription('Enter the verify role').setRequired(true))
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
	new SlashCommandBuilder()
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
	new SlashCommandBuilder()
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
	new SlashCommandBuilder()
		.setName('trumptweet')
		.setDescription('Make Donald Trump tweet something')
		.addStringOption(option => option.setName('message').setDescription('The message that Trump is gonna tweet').setRequired(true)),		
	new SlashCommandBuilder()
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
	new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Get the lyrics of a song')
		.addStringOption(option => option.setName('song').setDescription('The song you want to get the lyrics of').setRequired(true)),		
	new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic 8ball a question')
		.addStringOption(option => option.setName('question').setDescription('The question for magic 8ball').setRequired(true)
	),		
	new SlashCommandBuilder()
		.setName('emojify')
		.setDescription('Emojify a text')
		.addStringOption(option => option.setName('message').setDescription('The message that needs to be emojify').setRequired(true)
	),	
	new SlashCommandBuilder().setName('adminhelp').setDefaultMemberPermissions(8).setDescription('Admin | Information about the bot (PLEASE READ)'),	
	new SlashCommandBuilder().setName('joke').setDescription('Get a random joke'),		
	new SlashCommandBuilder().setName('yomomma').setDescription('Get a random yo momma joke 😐'),		
	new SlashCommandBuilder().setName('coinflip').setDescription('Flip a coin'),			
    new SlashCommandBuilder().setName('ping').setDescription('Pong 🏓'),
    new SlashCommandBuilder().setName('botinfo').setDescription('Botinfo'),
    new SlashCommandBuilder().setName('verifyannounce').setDescription('Developer Command | Verifyannounce').setDefaultMemberPermissions(2000),
    new SlashCommandBuilder().setName('verifypanel').setDescription('Developer Command | Verify Panel').setDefaultMemberPermissions(2000),
    new SlashCommandBuilder().setName('lock').setDescription('Staff Command | Lock channel').setDefaultMemberPermissions(2000),
    new SlashCommandBuilder().setName('unlock').setDescription('Staff Command | Unlock channel').setDefaultMemberPermissions(2000),
    new SlashCommandBuilder().setName('members').setDescription('Show the members count'),
    new SlashCommandBuilder().setName('kick').setDescription('Staff Command | Kick user').setDefaultMemberPermissions(2000).addUserOption(option => option.setName('member').setDescription('Enter the user that you wanna kick').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Enter the reason for the kick').setRequired(true)),
    new SlashCommandBuilder().setName('ban').setDescription('Staff Command | Ban user').setDefaultMemberPermissions(2000).addUserOption(option => option.setName('user').setDescription('Enter the user that u wanna ban').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Enter the reason for the ban').setRequired(true)),
    new SlashCommandBuilder().setName('unban').setDescription('Staff Command | Unban user').setDefaultMemberPermissions(2000).addUserOption(option => option.setName('user').setDescription('Enter the user that u wanna unban').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Enter the reason for the unban').setRequired(true)),
	new SlashCommandBuilder().setName('clear').setDescription('Staff Command | Clear messages').setDefaultMemberPermissions(2000).addNumberOption(option => option.setName('messages').setDescription('Enter the ammount messages that you wanna delete.')),
    new SlashCommandBuilder().setName('say').setDescription('Staff Command | Say').setDefaultMemberPermissions(2000),		
    new SlashCommandBuilder().setName('slowmode').setDescription('Staff Command | SlowMode').setDefaultMemberPermissions(2000).addNumberOption(option => option.setName('seconds').setDescription('How many seconds does the slowmode need').setRequired(true)),
    new SlashCommandBuilder()
    	.setName('giveaway')
		.setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Giveaway')
		.addStringOption(option => option.setName('tijd').setDescription('Hoelang de giveaway moet duren').setRequired(true))
		.addStringOption(option => option.setName('prijs').setDescription('Wat je kan winnen').setRequired(true))
		.addIntegerOption(option => option.setName('winnaars').setDescription('Hoeveel mensen er kunnen winnen').setRequired(true)),		

]
    .map(command => command.toJSON());  

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands("1029743266784092231", "1029743449848696884"), { body: commands })
	.then(() => console.log(`\u001b[1;34m[DEBUG]` + `\u001b[0m Successfully registered application commands.`))
    .catch(console.error);
//##### REMOVE ALL COMMANDS #####
//rest.get(Routes.applicationGuildCommands("1029743266784092231", "1029743449848696884"))
//.then(data => {
//    const promises = [];
//    for (const command of data) {
//        const deleteUrl = `${Routes.applicationGuildCommands("1029743266784092231", "1029743449848696884")}/${command.id}`;
//        promises.push(rest.delete(deleteUrl));
//    }
//    return Promise.all(promises);
//});
//############################################################################################
//    
//                                  INTERACTION CREATE
//
//############################################################################################    
client.on('interactionCreate', async (interaction, message, channel) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, message, channel);
	} catch (error) {
		console.error(error);
    const errorembed = new MessageEmbed()
      .setTitle(`⛔ | Error`)
      .setDescription('There was an error while executing this command!')
      .setColor(`#ff001e`)
      .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
   
		await interaction.reply({ embeds: [errorembed], ephemeral: true });
	}
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        const help = new MessageEmbed()
            .setTitle(`👋 | Hello!`)
            .setDescription(`Hello ${message.author}, How can i help you? \n Type **/** to see all the ZONE commands!`)
            .setColor(`${settings.defaultColor}`)
            .setFooter({ text: `${settings.footerText} • Made By @Sven.#1879`, iconURL: settings.footerIcon})
        
        message.reply({ embeds: [help] });
    }
});
    
client.login(token);    
