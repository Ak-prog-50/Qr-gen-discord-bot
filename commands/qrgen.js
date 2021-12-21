const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrgen')
		.setDescription('Replies with a Generated QR Code!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
        const qrQuery = interaction.options.getString('input');
		await interaction.reply(qrQuery);
	},
};