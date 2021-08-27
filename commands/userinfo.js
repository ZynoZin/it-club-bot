const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const api = require('../api/index.js')
const getTime = (seconds) => {
    const time = new Date((seconds+3600) * 1000).toISOString().substr(11, 8)
    return time
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Returns user info from codeforces')
		.addStringOption(option => option.setName('handle').setDescription('Provide the handler of the user').setRequired(true)),
    async execute(interaction) {
        const string = interaction.options.getString('handle');
        await interaction.deferReply()
        let userEmbeds = []
        try {
            const response = await api.getUserInfo(string, interaction)
            await sleep(1000)
            if (!response) return;
            if (response.data.result.length > 5) {
                await interaction.editReply('You can get the info of a max of 5 users per command.')
                return
            }
            for (userData of response.data.result) {
                userData.rank = userData.rank ? userData.rank : 'unranked'
                userData.rating = userData.rating ? userData.rating : 'unrated'
                userData.fullName = userData.firstName ? userData.firstName + ' ' + userData.lastName : 'Not provided!'
                let avatarURL = interaction.user.avatarURL() ? interaction.user.avatarURL() : 'https://i.imgur.com/AfFp7pu.png'
                let userEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${userData.handle}`)
                    .setURL(`https://codeforces.com/profile/${userData.handle}`)
                    .setAuthor(`${userData.handle}'s Codeforces Info`)
                    .setDescription(`Last logged in: ${getTime(userData.lastOnlineTimeSeconds)}`)
                    .setThumbnail(`${userData.avatar}`)
                    .addFields(
                        { name: 'Full Name', value: `${userData.fullName}`, inline: true },
                        { name: 'Rating', value: `${userData.rating}`, inline: true },
                        { name: 'Rank', value: `${userData.rank}`, inline: true },
                    )
                    .setTimestamp()
                    .setFooter(`Requested by ${interaction.user.username}`, `${avatarURL}`);
                userEmbeds.push(userEmbed);
            }
            await interaction.editReply({ embeds: userEmbeds });  
            
        }
        catch(err) {
            await interaction.editReply('handle is not valid or semicolon ";" was not used between handles! Try again')
            return
        }},
       
	}
