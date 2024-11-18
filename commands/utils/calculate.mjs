import { SlashCommandBuilder } from 'discord.js';
import nerdamer from 'nerdamer-prime/all.min.js';
export const data = new SlashCommandBuilder()
  .setName('calculate')
  .setDescription('モッチーさんが計算します。')
  .addStringOption(option =>option
      .setName('type')
      .setDescription('タイプを選択しろ！')
      .setRequired(true)
      .addChoices(
    { name: 'Expand', value: 'expand' },
    { name: 'Solve', value: 'solve' },
    { name: 'Factor', value: 'factor' },
    { name: 'Default', value: 'default'},)
                  )
  .addStringOption(option2 =>　option2
      .setName('formula')
      .setDescription('数式を入力しろ！')
      .setRequired(true))
  .addStringOption(option3 =>　option3
      .setName('algebra')
      .setDescription('方程式で解く文字を入力しろ！(任意)')
      .setRequired(false));

export async function execute(interaction){
  const type =　interaction.options.getString('type')
  const formula = interaction.options.getString('formula')
  const algebra = interaction.options.getString('algebra')
  try{
    if(type === "expand"){
      await interaction.deferReply()
      const ans = nerdamer.expand(formula);
      await interaction.editReply(formula+"を展開してやったぜ。\n計算結果:\n"+"```"+ans.text()+"```");
    }
    else if(type === "solve"){
      await interaction.deferReply()
      if (algebra === "") return interaction.editReply("文字が無いってw")
      const ans = nerdamer.solveEquations(formula,algebra);
      await interaction.editReply(formula+"の方程式を"+algebra+"について解いてやったぜ。\n計算結果:\n"+"```"+ans.toString().replaceAll("*","")+"```");
    }
    else if(type === "factor"){
      await interaction.deferReply()
      const ans = nerdamer.factor(formula);
      await interaction.editReply(formula+"を因数分解してやったぜ。\n計算結果:\n"+"```"+ans.text()+"```");
    }
    else if(type === "default"){
      await interaction.deferReply()
      const ans = String(nerdamer(formula).symbol.multiplier.num.value);
      await interaction.editReply(formula+"を計算してやったぜ。\n計算結果:\n"+"```"+ans+"```");
    }
  }catch(error){
    console.error(error)
  }
}