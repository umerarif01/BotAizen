const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hey')
        .setDescription('Lord Aizen Replies!'),
    async execute(interaction) {

        await interaction.reply('Aizen at your service!');
    },
};