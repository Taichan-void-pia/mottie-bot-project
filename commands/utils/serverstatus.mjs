import { SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import axios from 'axios';

export const data = new SlashCommandBuilder()
  .setName('serverstatus')
  .setDescription('モッチーさんがマイクラのサーバー状態を検索します。「修正不可のバグにより、時間を開けて使用してください。」by taichan_')
  .addStringOption(option =>
    option
      .setName('ip')
      .setDescription('ipくれよ〜')
      .setRequired(true)
  );

export async function execute(interaction){
  let getip = (interaction.options.getString("ip"));  
  let getResult =　`https://api.mcsrvstat.us/3/${getip}`
  const response = await axios.get(getResult)
    //interaction.reply(response.data)
  if (response.data.online) {
			await interaction.reply({content:("サーバーIP:"+(getip)+"はオンラインです。\nhttps://api.mcsrvstat.us/icon/" +(getip)+ "\n```🟢"+(response.data.players.online)+"/"+(response.data.players.max)+"人が接続中。\nVersion:"+(response.data.version)+"\nDescription:"+(response.data.motd.clean)+"```")});      
    } else {
			await interaction.reply({ content: ("サーバーIP:"+(getip)+"はオフラインです。")});
		  }　
    }
  