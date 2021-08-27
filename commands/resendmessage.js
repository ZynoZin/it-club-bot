const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resendmessage')
		.setDescription('Resends your message!')
		.addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true)),
    async execute(interaction) {
        const string = interaction.options.getString('input');
		await interaction.reply(string)
	},
};