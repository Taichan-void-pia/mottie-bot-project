import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("gacha")
  .setDescription("モチオガチャを引くよ～");

export async function execute(interaction) {
  const arr = ["SSR 金のお餅さん💫", "SR 銀のモッチー🥈", "R 銅のモッチー🥉", "N ただのモチ🤔"];
  const weight = [1, 4, 9, 16];
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

  await interaction.reply(`${result} が当選しました！`);
}
