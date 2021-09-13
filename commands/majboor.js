const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unclemajboor')
        .setDescription('Uncle Majboor will tweet something random XD'),
    // .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {
        // const user = interaction.options.getUser('target');
        // if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');

            // Declare a base size of the font
            let fontSize = 70;

            do {
                // Assign the font to the context and decrement it so it can be measured again
                context.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (context.measureText(text).width > canvas.width - 300);

            // Return the result to use in the actual canvas
            return context.font;
        };
        const data = [
            'Please Mujay chor doh',
            'Mujhe Phir Shayari Agayi',
            'Aapko bohat bohat maza aye gah',
            'Garmi bohat Char gayi aa yaar',
        ]
        const canvas = Canvas.createCanvas(1500, 750);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./data/unclebanner.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        const index = Math.floor(Math.random() * data.length);
        context.font = applyText(canvas, `${data[index]}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${data[index]}!`, canvas.width / 20.0, canvas.height / 3.0);


        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        interaction.reply({ files: [attachment] });



    },
};