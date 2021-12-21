const { SlashCommandBuilder } = require('@discordjs/builders');
const needle = require('needle');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrgen')
		.setDescription('Replies with a Generated QR Code!')
        .addStringOption(option => option.setName('query').setDescription('Enter a query!')),
	execute(interaction) {
        const qrQuery = interaction.options.getString('input');
        getQr(qrQuery).then(async res => {
            console.log(res.body)
            await interaction.reply(res.body.toString())
        })
		;
	},
};

const getQr = async (query) => {
    return await needle('get', 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=Hello')
}