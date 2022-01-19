const {MessageEmbed} = require('discord.js')
module.exports = {
    data: {
        name: 'reactionrole',
        description: 'Sets up a reaction role message!'
    },
    async execute(message, args, client) {
        const channel = "882764089858875433"

        const itContentRole = message.guild.roles.cache.find(role => role.name === "IT Content")
        const liveCodingRole = message.guild.roles.cache.find(role => role.name === "Live Coding")
        const firstYear = message.guild.roles.cache.find(role => role.name === "1A")
        const secondYear = message.guild.roles.cache.find(role => role.name === "2A")
        const thirdYear = message.guild.roles.cache.find(role => role.name === "3A")
        const graduate = message.guild.roles.cache.find(role => role.name === "Graduate")

        const itContentEmoji = '📹'
        const liveCodingEmoji = '💻'
        const firstYearEmoji = "1️⃣"
        const secondYearEmoji = "2️⃣"
        const thirdYearEmoji = "3️⃣"
        const graduateEmoji = "4️⃣"
        let embed = new MessageEmbed()
            .setColor("#0BC4FF")
            .setTitle("React to proper roles!")
            .setDescription("Once you react to a role, it will be assigned to you, choose your prefered roles so as to be notified whenever new things happen in the server.\n\n"
                + `${itContentEmoji} To get notifications about the latest IT related content.\n`
                + `${liveCodingEmoji} To get notifications about any live coding session organized.\n`
                + `${firstYearEmoji} If you are a first year student.\n`
                + `${secondYearEmoji} If you are a second year student.\n`
            + `${thirdYearEmoji} If you are a third year student.\n`
            + `${graduateEmoji} If you are a graduate.\n`)
        
        
        let messageEmbed = await message.channel.send({ embeds: [embed] })
        
        messageEmbed.react(itContentEmoji)
        messageEmbed.react(liveCodingEmoji)
        messageEmbed.react(firstYearEmoji)
        messageEmbed.react(secondYearEmoji)
        messageEmbed.react(thirdYearEmoji)
        messageEmbed.react(graduateEmoji)

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return
            
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === liveCodingEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(liveCodingRole)
                }
                if (reaction.emoji.name === itContentEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(itContentRole)
                }
                 if (reaction.emoji.name === firstYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(firstYear)
                }
                 if (reaction.emoji.name === secondYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(secondYear)
                }
                 if (reaction.emoji.name === thirdYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(thirdYear)
                }
                 if (reaction.emoji.name === graduateEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(graduate)
                }
            } else {
                return
            }
         })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return
            
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === liveCodingEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(liveCodingRole)
                }
                if (reaction.emoji.name === itContentEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(itContentRole)
                }
                if (reaction.emoji.name === firstYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(firstYear)
                }
                 if (reaction.emoji.name === secondYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(secondYear)
                }
                 if (reaction.emoji.name === thirdYearEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(thirdYear)
                }
                 if (reaction.emoji.name === graduateEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(graduate)
                }
            } else {
                return
            }
         })
    }

}