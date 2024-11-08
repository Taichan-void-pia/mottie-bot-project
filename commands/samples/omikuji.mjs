import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("omikuji")
  .setDescription("今日の運勢を判断するぜ！");

export async function execute(interaction) {
  const arr = ["||「大吉」||だぞ。","||「大吉」||あげるぞ！","||「大吉」||らしいぞ！", "||「中吉」||だぞ。",
               "...||「中吉」||", "||「小吉」||だぞ。","||「小吉」||なのか？", "||「吉」||だぞ。",
               "こちらも||「吉」||だぞ！", "||「末吉」||だぞ。","とりあえず||「末吉」||", "||「凶」||だぞ。乙w。",
               "今日は||「凶」||かな。乙w。","||「大凶」||だぞ。乙w。","たぶん||「大凶」||やな。乙w。","||「なんかすいません」||おめでとう。","ごめんてー"];
  const weight = [20, 1, 1, 9, 1, 12, 1, 23, 1, 14, 1, 8, 1, 4, 1, 1, 1];
  let result = "";

  let totalWeight = 0;
  for (let i = 0; i < weight.length; i++) {
    totalWeight += weight[i];
  }
  let random = Math.floor(Math.random() * totalWeight);
  
  for (let i = 0; i < weight.length; i++) {
    if (random < weight[i]) {
      result = arr[i];
      break;
    } else {
      random -= weight[i];
    }
  }

  await interaction.reply(`${result} 今日も頑張れ！`);
}
