const { SlashCommandBuilder } = require('@discordjs/builders');
const needle = require('needle');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrgen')
		.setDescription('Replies with a Generated QR Code!')
        .addStringOption(option => option.setName('query').setDescription('Enter a query!')),
	execute(interaction) {
        const qrQuery = interaction.options.getString('query');
        console.log(typeof(qrQuery),qrQuery)
        const encodedQuery = encodeURI(qrQuery)
        console.log(encodedQuery)
        getQr(encodedQuery).then(async res => {
            console.log(res.body)
            await interaction.reply({files : [res.body]})
        })
		;
	},
};

const getQr = async (query) => {
    return await needle('post', `http://api.qrserver.com/v1/create-qr-code/?data=${query}&charset-source=UTF-8`)
}