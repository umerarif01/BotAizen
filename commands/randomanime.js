const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animequote')
        .setDescription('Get a random quote from any anime character'),
    async execute(interaction) {
        let getQuote = async() => {
            let response = await axios.get('https://animechan.vercel.app/api/random');
            let animename = response.data.anime,
                character = response.data.character,
                quote = response.data.quote;

            return { animename, character, quote };
        };
        let data = await getQuote();

        // console.log(data.animename);
        await interaction.reply(`Anime: ${data.animename}` +
            `\nCharacter: ${data.character}` + `\nQuote: ${data.quote}`);
    },
};

// node deploy-commands.js