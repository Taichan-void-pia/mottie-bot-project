import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('base64')
  .setDescription('base64形式に暗号化、復号化します。')
  .addStringOption(option => option
      .setName('type')
      .setDescription('タイプを選択しろ！')
      .setRequired(true)
      .addChoices(
    { name: 'Encode', value: 'encode' },
    { name: 'Decode', value: 'decode' },)
                  )
  .addStringOption(option2 => option2
      .setName('text')
      .setDescription('変更したいテキストを入力しろ！')
      .setRequired(true)
                  )
export async function execute(interaction){
  const type =　interaction.options.getString('type')
  const text =　interaction.options.getString('text')
  try{
    if(type === "encode"){
      const ans = btoa(text);
      await interaction.reply("結果:\n"+"```"+ans+"```");
    }else if(type === "decode"){
      const ans = atob(text);
      await interaction.reply("結果:\n"+"```"+ans+"```");
    }
  }catch(err){
    await interaction.reply("アルファベットしか使えないぞ！");
    console.log(err)
  }
}