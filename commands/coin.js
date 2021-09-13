const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cryptocoin')
        .setDescription('Price of any coin')
        .addStringOption(option => option.setName('coin').setDescription('Enter Name of the coin')),
    async execute(interaction) {
        const value = interaction.options.getString('coin');
        if (value) return
        let getBtc = async() => {
            let response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=usd`);
            let data = response.data.value.usd;
            return data;
        };
        let BtcValue = await getBtc();
        console.log(BtcValue);
        await interaction.reply(`The Price of ${value} is $ ${BtcValue}`);
        return interaction.reply('No option was provided!');
    },

};