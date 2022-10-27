const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verifyannounce')
        .setDefaultMemberPermissions(2000)
		.setDescription('Staff Command | Verifyannounce'),
	execute(interaction, client) {
		const noperms = new MessageEmbed()
			.setTitle(`⛔ | Error`)
			.setDescription(`\n Je hebt **geen** permissies voor dit command `)
			.setColor(`#ff001e`)
			.setFooter({ text: "CoralValley", iconURL: FooterIMG})
				
        let channel = interaction.guild.channels.cache.get(987275358648815646);

        const reminder = new MessageEmbed()
        .setTitle(`✅ | Verify`)
        .setDescription(`\n **Hallo,**\n\nIk zag dat u nog niet geverifieerd bent in de **CoralValley discord**. \nJe kan in <#987275358648815646> op het knopje __Verifieer__ klikken om toegang te krijgen tot de discord server. `)
        .setFooter({ text: "CoralValley", iconURL: FooterIMG})
		if (!interaction.member.roles.cache.some(role => role.name === staffRole)) return interaction.reply({ embeds: [noperms], ephemeral: true });
        const role = interaction.guild.roles.cache.find(role => role.name === 'Please Verify');

        try{
            
            role.members.each(user => user.send({ embeds: [reminder] })
                .catch(() => interaction.channel.send(`${user} kan ik niet dmen`)));
            role.members.each(user => console.log(user.name));
        }catch {
            console.log(error)
        }
        interaction.reply("Iedereen is gedmed!")
        //console.log(test)   
        //test.send(`test`)
	},
};