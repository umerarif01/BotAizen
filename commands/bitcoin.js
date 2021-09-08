const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bitcoin')
        .setDescription('Get the Current Price of Bitcoin'),
    async execute(interaction) {
        let getBtc = async() => {
            let response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            let data = response.data.bitcoin.usd;
            return data;
        };
        let BtcValue = await getBtc();
        console.log(BtcValue);
        await interaction.reply(`The Price of Bitcoin is $ ${BtcValue}`);
    },
};