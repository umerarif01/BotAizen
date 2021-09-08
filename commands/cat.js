const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const apiKey = "7e2da1a6-c154-43c2-92c6-63b31bf65f5b";
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get a random picture of a cat(in production)'),
    execute: async(interaction) => {
        try {
            await interaction.deferReply().catch(_ => {});

            const fetchAPI = async() => {
                const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
                    method: "GET",
                    headers: { "x-api-key": apiKey }
                })

                const jsonresp = await response.json();
                return await jsonresp[0].url;
            }

            const embed = new MessageEmbed()
                .setTitle('🐱  Meow!  🐱')
                .setTimestamp()
                .setColor("WHITE");


            embed.setImage(await fetchAPI())
            await interaction.editReply({ embeds: [embed] })

        } catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    },
};

// node deploy-commands.js