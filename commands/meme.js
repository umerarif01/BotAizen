const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const apiKey = "7e2da1a6-c154-43c2-92c6-63b31bf65f5b";
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random Meme'),
    execute: async(interaction) => {
        try {
            await interaction.deferReply().catch(_ => {});

            const fetchAPI = async() => {
                const response = await fetch(`https://some-random-api.ml/meme`, {
                    method: "GET"
                })

                const jsonresp = await response.json();
                return await jsonresp.image;
            }

            const embed = new MessageEmbed()
                .setTitle('😂 Random Meme 😂')
                .setTimestamp()
                .setColor("ORANGE");


            embed.setImage(await fetchAPI())
            await interaction.editReply({ embeds: [embed] })

        } catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    },
};

// node deploy-commands.js