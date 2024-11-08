import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('color')
  .setDescription('モッチーさんがcolorcodeから検索します。')
  .addStringOption(option =>
    option
      .setName('colorcode')
      .setDescription('colorcode書けよ!')
      .setRequired(true)
  );

export async function execute(interaction){
  await interaction.reply({content: ('https://www.colordic.org/colorsample/' + String(interaction.options.getString('colorcode')))});
  
  }