const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
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

        const embed = new MessageEmbed()
            .setTitle(`✨Anime: ${data.animename}✨` + `\n\nCharacter: ${data.character}`)
            .setDescription(`Quote: ${data.quote}`)
            .setColor("PURPLE");
        // console.log(data.animename);

        await interaction.reply({ embeds: [embed] })
    },
};

// node deploy-commands.js