
module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with pong'
    },
    async execute(message, args) {
        message.channel.send('pong!')
    }

}