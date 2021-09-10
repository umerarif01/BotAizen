const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memev2')
        .setDescription('Get a random meme'),
    execute: async(interaction) => {
        try {
            await interaction.deferReply().catch(_ => {});

            const fetchAPI = async() => {
                const response = await fetch(`https://meme-api.herokuapp.com/gimme`, {
                    method: "GET"
                })

                const jsonresp = await response.json();
                return await jsonresp.url;
            }

            const embed = new MessageEmbed()
                .setTitle('😂Random Meme😂')
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