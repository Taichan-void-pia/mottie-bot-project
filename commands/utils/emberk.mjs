import { SlashCommandBuilder,EmbedBuilder } from 'discord.js';

import {colorcode} from '/app/main.mjs';

import axios from 'axios';

export const data = new SlashCommandBuilder()

  .setName('embark')

  .setDescription('モッチーさんがCombatAnalyticsIntelligence(通称:C.A.I)からデータを取得します。')

  .addStringOption(option =>

    option

      .setName('mode')

      .setDescription('C.A.Iのモードを選べ！')

      .setRequired(true)

      .addChoices(

    { name: 'SearchMCID', value: 'search' },

    { name: 'ReadCode', value: 'read' })

  )

  .addStringOption(option =>　option

      .setName('mcid')

      .setDescription('searchモードの場合、mcidをくれ。')

      .setRequired(false))

  .addStringOption(option =>　option

      .setName('code')

      .setDescription('readモードの場合、認証コードをくれ。')

      .setRequired(false));

export async function execute(interaction){

  const mode = interaction.options.getString('mode');

  if(mode === 'search'){

    const mcid = interaction.options.getString('mcid');

    //mcidからuuidを取る

    let res = ""

    try{

      res = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${mcid}`)

    }catch(e){//存在しない場合returnして処理を終了する

      await interaction.reply("嘘のmcidを言うんじゃねぇ！")

      return;

    }

    const uuid_no_hyphen = res.data.id

    // 正規表現でハイフンを挿入

    const uuid = uuid_no_hyphen.replace(/^([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})$/,"$1-$2-$3-$4-$5");

    //embedで送信

    const embed =　new EmbedBuilder()

    .setTitle(mcid+"の情報")

    .setURL(`https://ja.namemc.com/profile/${mcid}`)

    .setDescription("MCID 》"+mcid+"\n"+"UUID 》"+uuid)

    .setImage(`https://visage.surgeplay.com/full/${mcid}`)

    .setThumbnail(interaction.user.displayAvatarURL({dynamic:true,size:256}))

    .setFooter({text:String(`Requested by ${mcid}`),iconURL:`https://visage.surgeplay.com/face/${mcid}`})

    .setColor(colorcode)

    .setTimestamp();

    await interaction.reply({content:"C.A.Iにデータを出力させてやったぜ！",embeds:[embed]})

  }else if(mode === 'read'){

    //コードを保存する

    const code = interaction.options.getString('code');

    const code_array = code.split(":")

    

    // コードから圧縮情報を取り出す

    let mcver = code_array[0]

    const mapver = code_array[1]

    const time_h = code_array[2]

    const time_m = code_array[3]

    const time = code_array[4]

    const gametime = code_array[5]

    const depth_level = code_array[6]

    const trimmed_uuid = String((parseInt(code_array[7]) >>> 0).toString(16))+String((parseInt(code_array[8]) >>> 0).toString(16))+String((parseInt(code_array[9]) >>> 0).toString(16))+String((parseInt(code_array[10]) >>> 0).toString(16))

    const res = await axios.get(`https://api.minecraftservices.com/minecraft/profile/lookup/${trimmed_uuid}`)

    const mcid = res.data.name

    const uuid = trimmed_uuid.replace(/^([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})$/,"$1-$2-$3-$4-$5");

    if(mcver === "3700"){

      mcver = "1.20.4"

    }

    const gametime_fix = Math.round(gametime/20)

    const gametime_h = Math.floor(gametime_fix/3600)

    const gametime_m = Math.floor(gametime_fix/60)%60

    const gametime_s = gametime_fix%60

    

    //embedの送信

    const embed =　new EmbedBuilder()

    .setTitle(mcid+"の認証情報")

    .setURL(`https://ja.namemc.com/profile/${mcid}`)

    .setDescription("**サーバー 》**"+interaction.guild.name+"\n"+"**名前 》**"+interaction.user.tag+"\n"+"**識別子 》**"+interaction.user.id+"\n"+"**Discordアカウント作成日 》**"+interaction.user.createdAt+"\n"+"**MCver 》**"+mcver+"\n"+"**MCID 》**"+mcid+"\n"+"**UUID 》**"+uuid+"\n"+"**コード発行時刻 》**"+time_h+":"+time_m+":"+time+" JST(GMT+0900)"+"\n"+"**プレイ時間 》**"+gametime_h+"時間"+gametime_m+"分"+gametime_s+"秒"+"\n"+"**権限レベル 》**"+depth_level)

    .setImage(`https://visage.surgeplay.com/full/${mcid}`)

    .setThumbnail(interaction.user.displayAvatarURL({dynamic:true,size:256}))

    .setFooter({text:String(`Requested by ${mcid}`),iconURL:`https://visage.surgeplay.com/face/${mcid}`})

    .setColor(colorcode)

    .setTimestamp();

    await interaction.reply({content:"C.A.Iからデータを転送してもらったぜ！",embeds:[embed]});

  }

}