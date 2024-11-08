import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('search')
  .setDescription('モッチーさんがwikiを検索します。')
  .addStringOption(option =>
    option
      .setName('word')
      .setDescription('おい！言葉書け！')
      .setRequired(true)
  );

export async function execute(interaction){
  await interaction.reply({content: ('https://ja.m.wikipedia.org/wiki/' + String(interaction.options.getString('word')))});
  
  }