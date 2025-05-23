import {EmbedBuilder} from "discord.js";
import axios from 'axios';

export default async(reaction, user) => {
  const message =　reaction.message;
  const member = await message.guild.members.fetch(user);
  if (user.bot) return;
  
  if(reaction.emoji.name === "❤️"){
    message.react("❤️")
  }
  if (reaction.emoji.name === "🔍") {
    message.reply(`https://ja.wikipedia.org/wiki/${message}`);
  }

  if (reaction.emoji.name === "🌈") {
    message.reply(`https://www.colordic.org/colorsample/${message}`);
  }
  //翻訳機能
  if (reaction.emoji.name === "🇺🇸"){
  const url =　`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${message}&source=&target=en`
    try {
    const response = await axios.get(url)
    message.reply(response.data)
  } catch (error) {
    console.error(error)
  }}
  if (reaction.emoji.name === "🇯🇵"){
  const url =　`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${message}&source=&target=ja`
    try {
    const response = await axios.get(url)
    message.reply(response.data)
  } catch (error) {
    console.error(error)
  }}
  if (reaction.emoji.name === "🇨🇳"){
  const url =　`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${message}&source=&target=zh`
    try {
    const response = await axios.get(url)
    message.reply(response.data)
  } catch (error) {
    console.error(error)
  }}
  };
                       
