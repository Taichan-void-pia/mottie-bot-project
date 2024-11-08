import { SlashCommandBuilder,EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('embark')
  .setDescription('モッチーさんがmcidから検索します。')
  .addStringOption(option =>
    option
      .setName('mcid')
      .setDescription('idくれ。')
      .setRequired(true)
  );

export async function execute(interaction){
  const embed =　new EmbedBuilder()
  .setDescription()
  await interaction.reply({content: ('https://ja.namemc.com/profile/' + String(interaction.options.getString('mcid')))});
  
  }