const fs = require('fs');
const { token } = require('./config.json');
const  { Client, Collection, Intents } = require('discord.js');

const myIntents = new Intents(32767);

const client = new Client({ intents: myIntents, partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const prefix = '-'

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('IT CLub bot is Online!');
})

client.on('guildMemberAdd', guildMember => {
	let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member')
	
	guildMember.roles.add(welcomeRole)

	guildMember.guild.channels.cache.get('882760587673743450').send(`Welcome <@${guildMember.user.id}> to the IT Club family🥳. Please change your nickname to your full name and enjoy your stay!🤗 Happy coding 😎.`)
})

client.on('messageCreate', async (message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return
	const args = message.content.slice(prefix.length).split(' ')
	let command = args.shift().toLowerCase()
	command = client.commands.get(command);
	if(!command) return
	try {
		await command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		await message.channel.send({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});







client.login(token)