const { SlashCommandBuilder } = require('@discordjs/builders');
const needle = require('needle');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrgen')
		.setDescription('Replies with a Generated QR Code!')
        .addStringOption(option => option.setName('query')
            .setDescription('*Enter data (plain text or url)!')
            .setRequired(true))
        .addBooleanOption(option => option.setName('urlselect')
            .setDescription('Set this to true if you want to encode a URL'))
        .addStringOption(option => option.setName('size')
            .setDescription('Select a size for your qr code.')
            .addChoice('50px by 50px', '50x50')
            .addChoice('100px by 100px', '100x100')
            .addChoice('250px by 250px', '250x150')
            .addChoice('500px by 500px', '500x500')
            .addChoice('750px by 750px', '750x750')
            .addChoice('1000px by 1000px', '1000x1000')),

	execute(interaction) {
        const qrQuery = interaction.options.getString('query');
        const qrSize = interaction.options.getString('size')
        const urlSelect = interaction.options.getBoolean('urlselect')
        const defaultSize = '120x120' 
        
        let encodedQuery;
        if (urlSelect) encodedQuery = encodeURI(qrQuery)

        getQr(encodedQuery || qrQuery, qrSize || defaultSize).then(async res => {
            console.log(res.body)
            await interaction.reply({files : [res.body]})
        });
	},
};

const getQr = async (query, size) => {
    let paramsObj = {
        data : query,
        size : size,
        margin : 7
    };
    let searchParams = new URLSearchParams(paramsObj);
    let params = searchParams.toString();

    return await needle('post', `http://api.qrserver.com/v1/create-qr-code/?charset-source=UTF-8&${params}`)
}