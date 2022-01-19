module.exports = {
    data: {
        name: 'clear',
        description: 'Clears messages!'
    },
    async execute(message, args) {
        if (!args[0]) return message.reply("Please enter the amount of messages you want to clear!")
        if (isNaN(args[0])) return message.reply("Please enter a valid number!")
        if (args[0] > 100) return message.reply("Maximum of messages to clear is 100!")
        if (args[0] < 1) return message.reply("Not a valid number!")
        let adminRole = message.guild.roles.cache.find(r=> r.name === "Piloting Team");
        if (message.member.roles.cache.has(adminRole.id)){
            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages)
            })
        } else {
             return message.reply("You aren't allowed to use this command.")
        }
    }
}