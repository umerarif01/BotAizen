const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Get a random dog pic'),
    execute: async(interaction) => {
        try {
            await interaction.deferReply().catch(_ => {});

            const fetchAPI = async() => {
                const response = await fetch(`https://dog.ceo/api/breeds/image/random`, {
                    method: "GET"
                })

                const jsonresp = await response.json();
                return await jsonresp.message;
            }

            const embed = new MessageEmbed()
                .setTitle('🐕‍🦺Random Dog🐕‍🦺')
                .setTimestamp()
                .setColor("GREEN");


            embed.setImage(await fetchAPI())
            await interaction.editReply({ embeds: [embed] })

        } catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    },
};

// node deploy-commands.js