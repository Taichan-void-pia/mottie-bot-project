import fs from "fs";
import path from "path";
import express from "express";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ChannelType,
  PermissionsBitField,
  ButtonStyle,
  Partials,
} from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  entersState, 
  AudioPlayerStatus,  
  StreamType,
} from "@discordjs/voice";

import CommandsRegister from "./regist-commands.mjs";
//import Notification from "./models/notification.mjs";
//import YoutubeFeeds from "./models/youtubeFeeds.mjs";
//import YoutubeNotifications from "./models/youtubeNotifications.mjs";

import Sequelize from "sequelize";
import Parser from "rss-parser";
const parser = new Parser();
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//import { Client as Youtubei, MusicClient } from "youtubei";
//const youtubei = new Youtubei();

let postCount = 0;
const app = express();
app.listen(3000);
app.post("/", function (req, res) {
  console.log(`Received POST request.`);

  postCount++;
  if (postCount == 10) {
    trigger();
    postCount = 0;
  }

  res.send("POST response by glitch");
});
app.get("/", function (req, res) {
  //app.use("/",express.static('statics'))
  //res.set('Content-Type', 'text/html');
  res.send('<a href="https://note.com/exteoi/n/n0ea64e258797"に解説があります。');
});

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials:[
    Partials.Channel,
  ],
});

client.commands = new Collection();

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.rest.on('rateLimited', (info) => {
  console.warn(`Rate limit hit: ${JSON.stringify(info)}`);
});


const categoryFoldersPath = path.join(process.cwd(), "commands");
const commandFolders = fs.readdirSync(categoryFoldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(categoryFoldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".mjs"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    import(filePath).then((module) => {
      client.commands.set(module.data.name, module);
    });
  }
}

const handlers = new Map();

const handlersPath = path.join(process.cwd(), "handlers");
const handlerFiles = fs
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(".mjs"));

for (const file of handlerFiles) {
  const filePath = path.join(handlersPath, file);
  import(filePath).then((module) => {
    handlers.set(file.slice(0, -4), module);
  });
}
export const colorcode = "#c39143"
client.on("interactionCreate", async (interaction) => {
  //メッセージ消去
  if (interaction.customId === "deletelog"){
    interaction.reply("我既破壊壁。")
    interaction.message.delete()
  };
  if (interaction.customId === "delete"){
    interaction.message.delete()
  };
  //チャンネル消去
  if (interaction.customId === "deletech"){
    if(interaction.user.id === "558964198994870272"||(interaction.memberPermissions.has("ADMINISTRATOR"))){
      interaction.channel.delete()
    }else{
      interaction.reply("権限なんてねぇよ。正しいのは俺。")
    }
  };
  //twitterAPI
  if (interaction.customId === "heart"){
    const messageLink = get_tweet_id(interaction.message.content)
    twitterAPI(interaction,"like",messageLink)
  };
  if (interaction.customId === "reply"){
    const messageLink = get_tweet_id(interaction.message.content)
    interaction.reply({content:"[ここをクリック！]("+`https://x.com/intent/post?in_reply_to=${messageLink}`+")",ephemeral:true})
  };
  if (interaction.customId === "retweet"){
    const messageLink = get_tweet_id(interaction.message.content)
    twitterAPI(interaction,"retweet",messageLink)
  };
  function get_tweet_id(text){
    let messageLink = text.replace("https://fxtwitter.com/","")
    messageLink = messageLink.match(/(\d{17,20})/)
    return messageLink[0];
  }
  function twitterAPI(i,type,tweet_id){
    i.reply({content:"[ここをクリック！]("+`https://x.com/intent/${type}?tweet_id=${tweet_id}`+")",ephemeral:true})
  }
  //チケットツール
  if (interaction.customId === "return") {
    await interaction.reply({
      content: "チャンネル作成中です。しばらくお待ちください。",
      ephemeral: true,
    });
    const interactionUser = await interaction.guild.members.fetch(
      interaction.user.id
    );
    const userName = interactionUser.user.tag.replace(/#\d+/g, "");
    const channelname = interaction.guild.channels.cache.find((channel) =>
      channel.name.match(interaction.user.id)
    );
    if (channelname > 0) {
      await interaction.followUp({
        content:"個別相談・通報チャンネルは1人につき1つまでです。\n<#" +channelname +">",
        ephemeral: true,
      });
    } else {
      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('deletech')
					.setLabel('チャンネルを削除')
					.setStyle(ButtonStyle.Danger),
			);
      await interaction.guild.channels.create({
          name:("意見" + userName + interaction.user.id),　
          type:ChannelType.GuildText,
          parent: interaction.channel.parent,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
            },
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
              type: "member",
            },
            {
              id: "1133402650306678856",
              allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
              type: "role",
            },
            {
              id: "754312460508463267",
              allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
              type: "member",
            },
          ],
        })
        .then((ch) => {
          ch.send({
            content:"<@" +
              interaction.user.id +
              ">" +
              "\nこちらに相談・通報したいことを投稿してください。勝手にチャンネル削除を押さないで下さい。",components:[row]}
          );
        }),
        await interaction.followUp({
          content: "個別相談・通報チャンネルを作成しました。",
          ephemeral: true,
        });
    }
  }
  if (interaction.customId === "role1") {
    const guild = await interaction.guild.fetch();
    const member = await guild.members.fetch(interaction.member.user.id, {
      force: true,
    });
    const rolesToAdd = ["ラナヒロ一等兵","ラナヒロ二等兵","ラナヒロ三等兵",];
    const rolesToAddIDs = [];
    for (const roleName of rolesToAdd) {
      const role = interaction.guild.roles.cache.find((role) => role.name === roleName);
      if (!role) {
        await interaction.reply({
          content: `ロール "${roleName}" はないらしい！w`,
          ephemeral: true,
        });
        return;
      }
      rolesToAddIDs.push(role.id);
    }
    try {
      await member.roles.add(rolesToAddIDs);
      await interaction.reply({
        content: "すべての基本ロールを付与したぜ！",
        ephemeral: true,
      });
    } catch (error) {
      console.error("ロールの付与中にエラーが発生しました:", error);
      await interaction.reply({
        content: "なんかできなかった！w",
        ephemeral: true,
      });
    }
  }
  if (interaction.customId === "role2") {
    const guild = await interaction.guild.fetch();
    const member = await guild.members.fetch(interaction.member.user.id, {
      force: true,
    });
    rolesetup(interaction,member,"ラナヒロ一等兵")
  }
  if (interaction.customId === "role3") {
    const guild = await interaction.guild.fetch();
    const member = await guild.members.fetch(interaction.member.user.id, {
      force: true,
    });
    rolesetup(interaction,member,"ラナヒロ二等兵")
    }
  if (interaction.customId === "role4") {
    const guild = await interaction.guild.fetch();
    const member = await guild.members.fetch(interaction.member.user.id, {
      force: true,
    });
    rolesetup(interaction,member,"ラナヒロ三等兵")
  }
  function rolesetup(i,members,rolename) {
    const memberrole =　i.guild.roles.cache.find((role)　=>　role.name === rolename)
    if(!memberrole) return i.reply({content:rolename+"はないみたい！w",ephemetal:true})
    try {
      if (members.roles.cache.has(memberrole.id)) {
        members.roles.remove(memberrole.id);
        i.reply({
          content:rolename+"を削除したぜ！",
          ephemeral:true
        });
      } else {
　　　　　members.roles.add(memberrole.id);
        i.reply({
          content:rolename+"を付与したぜ！",
          ephemeral: true
        })};
    }catch(error){
      console.error("ロールの変更中にエラーが発生しました:", error);
      i.reply({
        content: "なんかできなかった！w",
        ephemeral: true
        });
    }
  }
  await handlers.get("interactionCreate").default(interaction);
});//Interaction endpoint.

//Googlettsのインポート
import googleTTS from 'google-tts-api';
//ボイスコネクションをマップに保存
const voiceConnections = new Map();

client.on("voiceStateUpdate", async (oldState, newState) => {
await handlers.get("voiceStateUpdate").default(oldState, newState);
});

client.on("messageReactionAdd", async (reaction, user) => {
  await handlers.get("messageReactionAdd").default(reaction, user);
});
client.on("messageCreate", async (message) => {
  if (message.author.id == client.user.id || message.author.bot || message.system) return; //botの場合関数から抜け出す
  //prefixの設定
  const prefix = "mottie!"
  let command;
  if (message.content.slice(0,prefix.length) === prefix){
  command =　message.content.replace(message.content.slice(0,prefix.length),"")
  }
  
  //clientを必要とする機能によるメッセージ返信
  const messageLinkRegex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
  const match = message.content.match(messageLinkRegex);
  if (match) {
    try{
    //メッセージ箇所取得
    const guildId = match[1];
    const channelId = match[2];
    const messageId = match[3];
    const targetGuild = await client.guilds.fetch(guildId);
    const targetChannel = targetGuild.channels.cache.get(channelId);
    const targetMessage = await targetChannel.messages.fetch(messageId);
    //ファイル取得
    let dm_file_url;
    if(targetMessage.attachments){
      dm_file_url = targetMessage.attachments.map(attachment => attachment.url);
    }
    //embedの設定
 　　  const embed = new EmbedBuilder()
      .setDescription(String(( targetMessage.content + "\n\n" + targetMessage.url)))
      .setURL (targetMessage.url)
      .setAuthor({name:String(`${targetGuild.name} | #${targetChannel.name}`),iconURL: String(targetGuild.iconURL())})
      .setColor ("#1e28d2")
      .setFooter({text:String(`Author |　${targetMessage.author.username}`),
                 iconURL:String(targetMessage.author.displayAvatarURL())});
    // リプライにembedを含めて送信
    const files_exist =　targetMessage.attachments.size > 0 ;//ファイルがあるか確認
    if(!files_exist) {
      await message.reply({embeds:[embed]});
    }else{
      await message.reply({embeds:[embed],files:dm_file_url});
    }
    }catch(error){
      console.error("メッセージの送信中にエラーが発生しました。:",error)
    }
  }
  //時間を取得
  if (command === "time"){
    //タイムゾーンを設定
    process.env.TZ = "Asia/Tokyo";
    const date = new Date()
    const day = date.getFullYear() + '年' + ('0' + (date.getMonth() + 1)).slice(-2) + '月' +('0' + date.getDate()).slice(-2) + '日 ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '秒';
    message.reply("今は**"+day+"**です。")
  }
  //chatgpt 1ドル払え
   //if(message.content.startsWith("chatgpt ")) {
   //  try {
    // const test = (String((message.content)).replaceAll('chatgpt ', String('')));
    // 送信されたメッセージをpromptに設定
   // const completion = await openai.chat.completions.create({
     // messages: [{ role: 'user', content: `${test}`}],
     // model: 'gpt-4o',
  //  });
   // if (completion.choices[0].message.content === undefined) throw new Error();
    
    // メッセージが送信されたチャンネルに、GPT-4の返信を送信
  //  await message.channel.send(completion.choices[0].message.content);
 // } catch (err) {
　//　 message.reply("なんかすいません。")
  //  console.log(err);
//  };
  // }
  
  //DM対応
  if (message.channel.type === ChannelType.DM) {
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('delete')
					.setLabel('🗑️')
					.setStyle(ButtonStyle.Danger),
			);
    let dm_file_url;
    if(message.attachments){
      dm_file_url = message.attachments.map(attachment => attachment.url);
    }
    sendMottie(`> DMを受け取りました\nFrom: **${message.author.tag}**\nMessage: ${message.content.replaceAll("orca ","")}`,dm_file_url,message.attachments);
    message.channel.send("DMをtaichan_に送信したぜ!")
   if(message.content.startsWith("orca ")){
    try {
    const files_exist = message.attachments.size > 0;
    const guildId = process.env.orcaServerId;
    const channelId = "936250853185183835";
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    if (channel) {
      if(!files_exist){
        await channel.send({content:`Orca-san,This is Mottie.This signal is sent from my DM. over.\nFrom: **${message.author.tag}**\n${message.content.replaceAll("orca ","")}`,components:[row]});
      }else{
        await channel.send({content:`Orca-san,This is Mottie.This signal is sent from my DM. over.\nFrom: **${message.author.tag}**\n${message.content.replaceAll("orca ","")}`,files:dm_file_url,components:[row]})
      }
    }
    } catch (error) {
    console.error(
      "メッセージログの送信中にエラーが発生しました:",
      error.message
    );
    }
   }
    return
  }
  
  //非同期関数処理sendMottie
async function sendMottie(text,file,attach) {
  try {
    const files_exist = attach.size > 0;
    const guildId = process.env.mainServerId;
    const channelId = process.env.mainChannelId;
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    if (channel) {
     if(!files_exist) {
       await channel.send(text)
     }else{
       await channel.send({content:text,files:file})
     }
    }
  } catch (error) {
    console.error(
      "メッセージログの送信中にエラーが発生しました:",
      error.message
    );
  }
}//endpoint.
  
  
  //読み上げテキスト送信
  if (message.content.startsWith('tts ')){
  const connecting = message.member.voice.channel
  if(!connecting) return message.reply("先にボイスチャンネルに接続に接続して下さい!")
  try{
            // GCP使わない場合はこっち
            // 音声ファイルのURLが取得できます。
    　　　　　let text =　message.content.replaceAll('tts ','')
            text =　(`${message.author.username}、`+text) 
            let url = googleTTS.getAudioUrl(text, {
                lang: 'ja',
                slow: false,
                host: 'https://translate.google.com',
            });
        // ボイスチャットセッションの音声プレイヤーに音声ファイルのURLを指定して再生させます。
const connection = joinVoiceChannel({
      adapterCreator: connecting.guild.voiceAdapterCreator,
      channelId: connecting.id,
      guildId: connecting.guild.id,
      selfDeaf: true,
      selfMute: false,
     });
        const player = createAudioPlayer();
     　　connection.subscribe(player);
        const resource = createAudioResource(url, {
            inputType: StreamType.Arbitrary,
        });
  　　　　player.play(resource);
  }catch(error){console.log(error)}
  }
  //目安箱生成
  if (command === ("return")) {

    const tic1 = new ButtonBuilder()
      .setCustomId("return") //buttonにIDを割り当てる   *必須
      .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
      .setLabel("📩個別チャンネルを作成📩");
    const embed = new EmbedBuilder()
     .setTitle("目安箱")
     .setColor("#213a70")
     .setDescription("製作陣や運営メンバーに直接相談できる場所です。\nMODに関する「お問い合わせ」やサーバーへの要望、サーバー内のトラブルに対応する「目安箱」としてもご利用いただけます。")
    
    await message.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(tic1)],
    });
  }
  if (command === "return2") {
    const button1 =　new ButtonBuilder()
    .setCustomId("role1")
    .setStyle(ButtonStyle.Success)
    .setLabel("🌈全ロール取得")
     const button2 =　new ButtonBuilder()
    .setCustomId("role2")
    .setStyle(ButtonStyle.Primary)
    .setLabel("🏞️ラナヒロ一等兵")
     const button3 =　new ButtonBuilder()
    .setCustomId("role3")
    .setStyle(ButtonStyle.Primary)
    .setLabel("🔍ラナヒロ二等兵")
     const button4 =　new ButtonBuilder()
    .setCustomId("role4")
    .setStyle(ButtonStyle.Primary)
    .setLabel("🗡ラナヒロ三等兵")
     const embed =　new EmbedBuilder()
    .setTitle("**ロールパネル**")
    .setDescription("__**取得可能ロール**__\n\n下記の３つが基本ロールです。必要に応じて取得してください。運営のおすすめは全部取得です！\n\n\<@&1225775863086448760> 雑談カテゴリーなどの基本的なチャンネルが開放されます。このサーバーの同じ趣味を持った仲間。\n(ラナヒロ三等兵の取得は ⁠<#1133399401663041558> を確認、同意として扱います。)\n\n<@&1225776504466702366>攻略カテゴリーが閲覧可能になります。ラナヒロmodの解析や攻略法がまとめられているためネタバレ注意です。\n\n<@&1225776580886925342>創作カテゴリーが閲覧可能になります。自作小説や配布マップ作成構想などをどなたでも自由に共有できる場所として盛り上げてください。\n\n※ロールの獲得方法など細かい情報を知りたい方は <#1302788488537571348> を確認ください。")
    .setColor("#213a70")
    .setImage("https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/miq_1694412674.530321.jpg?v=1730678210796")
    .setAuthor({name:"taichan_void_pia",iconURL:"https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E7%84%A1%E9%A1%8C2_20240706224809.png?v=1730677482841"})
    .setFooter({text:"鯖内運営",iconURL:"https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/logo_lanahiro_mod.png?v=1730677344284"})
     message.channel.send({
      content: `必要なロールを選べ！`,
      tts: false,
      components: [new ActionRowBuilder().addComponents(button1,button2,button3,button4)],embeds:[embed]
     });
  }
  
  // メッセージが '点呼 <roleID>' という形式かどうかを確認
  const commandRegex = "点呼 "; // コマンドの正規表現
  const match2 = message.content.startsWith(commandRegex);
  if (match2) {
    const requestedRoleId = message.content.replaceAll('点呼 ', '')
    listMembersWithRole(message.guild.id, requestedRoleId, message.channel);
  }
function listMembersWithRole(guildId, roleId, channel) {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error("指定されたギルドが見つかりませんでした。");
    return;
  }
  const role = guild.roles.cache.get(roleId);
  if (!role) {
    console.error("指定されたロールが見つかりませんでした。");
    return;
  }
  const membersWithRole = role.members.map((member) => member.user.username);
  const memberCount = membersWithRole.length;
  // 人間がいない場合のメッセージを追加
  const responseMessage = memberCount
    ? `> **${role.name}**\n${membersWithRole.join(
        "\n"
      )}\n\n**${memberCount}人**の人間がこのロールを持っています！`
    : `> **${role.name}** ロールを持っている人間はいません！`;
  channel.send(responseMessage);
}
  //ボイチャ接続時間を取得して表示
  const Regex = "vctimelist"; // コマンドの正規表現
  if (command === Regex) {
    listMembersSumJoining(message.guild.id,message.channel);
    }
function listMembersSumJoining(guildId,channel) {
  let test
  let array =[]
  let message_unite = ""
    const obj = JSON.parse(fs.readFileSync('voicecounter.json').toString());
    for (let i = 0; i < obj.length; i += 2){
      const guild_id = obj[i]
      if(guild_id === guildId){
        for(let j=0; j<obj[i+1].length; j += 2){
          const member_id = obj[i+1][j]
          const time2 = parseInt(obj[i+1][j+1][1],10)
          array.push([time2,member_id])
          test = true
          }
      }
    }
  if(test){
    array.sort(sorting)
      function sorting(first, second){
        if (first[0] > second[0]){
          return -1;
        }else if (first[0] < second[0]){
          return 1;
        }else{
          return 0;
        }
      }
    let cnt = 0
    for(const unite of array){
      cnt++
      const member_text = `<@${unite[1]}>`
      const time = Math.round((unite[0]/60000))
      const dis_hour = Math.floor(time/60)
      const dis_min = time%60
      const time_text = `${dis_hour}時間${dis_min}分`
      const suffix = String((cnt <= 3) ? "**":"")
      message_unite = message_unite +"\n"+suffix+Math.round(cnt)+"位"+suffix+":"+member_text+" **"+time_text+"**"
      }
    const embed = new EmbedBuilder()
    .setTitle("ボイスチャンネル接続時間ランキング")
    .setDescription(message_unite)
    .setAuthor({name:String(`${message.guild.name}`),iconURL: String(message.guild.iconURL())})
    .setColor ("#1e28d2")
    .setFooter({text:String(`Created by ${message.author.username}`),iconURL:String(message.author.displayAvatarURL())})
    .setTimestamp();
    channel.send({embeds:[embed]})
  }else{
    channel.send("データが存在しないか消された可能性があります。")
    return
  }
}
  
  if(command ===　"join"){
   // コマンドを実行したメンバーがいるボイスチャンネルを取得

     const channel = message.member.voice.channel;

     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
     if (!channel) return
     // チャンネルに参加
     const connection = joinVoiceChannel({
      adapterCreator: channel.guild.voiceAdapterCreator,
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: true,
      selfMute: false,
     });
     const player = createAudioPlayer();

     connection.subscribe(player);
     // 動画の音源を取得
　　 const rnd = Math.random()
    if (rnd <　0.45){
      const resource = createAudioResource(
        "https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/hiroyuki.mp3?v=1728556607048"
      )
      await player.play(resource)
      }else if(rnd　<　0.5){
      const resource = createAudioResource(
        "https://cdn.glitch.global/fa69e348-cf40-439c-b524-7f1a0b693ca3/nowa.mp3?v=1703622272701"
      )
     // 再生
     player.play(resource);
　　　　　}else{
       const resource = createAudioResource(
        "https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/First%20Project_part%201_2_0_%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF.wav?v=1728992251324"
      )
       player.play(resource);
     }
   };
  if(message.content.startsWith("mottie!play")){
   // コマンドを実行したメンバーがいるボイスチャンネルを取得
    const channel = message.member.voice.channel;
     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
    if (!channel) return message.reply('先にボイスチャンネルに参加してください！');
     // チャンネルに参加
    const connection = joinVoiceChannel({
      adapterCreator: channel.guild.voiceAdapterCreator,
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: true,
      selfMute: false,
     });
    const player = createAudioPlayer({behaviors:{noSubscriber: NoSubscriberBehavior.Play}});
    let link = "none"
    if(message.content.includes("link:")){
      link =　message.content.slice(message.content.indexOf("link:")+5)
    let dm_file_url;
    if(message.attachments){
      dm_file_url = message.attachments.map(attachment => attachment.url)
      link = dm_file_url[0]
            }
    }
    if(link === "none"){
      if (Math.random() <　0.5){
        const resource = createAudioResource("https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E8%BB%A2%E7%94%9F%E3%83%A2%E3%83%83%E3%83%81%E3%83%BC.mp3?v=1728991585501")
        await player.play(resource)
      }else{
        const resource = createAudioResource("https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E3%83%A2%E3%83%83%E3%83%81%E3%83%BC%E3%83%AF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89.mp3?v=1728558019434")
        await player.play(resource);
      }
    }else{
      const resource = createAudioResource(link)
      await player.play(resource);
    }
    //player.on("stateChange", (oldState, newState) => {
        //  if (newState.status === "idle") {
            // 再生が終了したときに再度再生
         //   if (Math.random() <　0.5){
          //    const resource = createAudioResource("https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E8%BB%A2%E7%94%9F%E3%83%A2%E3%83%83%E3%83%81%E3%83%BC.mp3?v=1728991585501")
         //     player.play(resource)
          //  }else{
          //    const resource = createAudioResource("https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E3%83%A2%E3%83%83%E3%83%81%E3%83%BC%E3%83%AF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89.mp3?v=1728558019434")
          //    player.play(resource);
            //}
          //}
      //  });
    connection.subscribe(player);
   };
  
  if (command === "quit"){
  
     //ボットがボイスチャンネルに接続されているか確認
    const botVoiceChannel = message.guild.members.cache.get(client.user.id)
      ?.voice.channel;


    if (botVoiceChannel) {
      message.reply("ハイピクセルやろ！あ、呼ばれたから落ちる。");
      const channel = message.member.voice.channel;
         const connection = joinVoiceChannel({
      adapterCreator: channel.guild.voiceAdapterCreator,
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: true,
      selfMute: false,
     });
      connection.destroy();
}};
  
  await handlers.get("messageCreate").default(message);
});//message endpoint.

client.on("ready", async () => {
  await client.user.setActivity("🙃", {
    type: ActivityType.Custom,
    state: `モッチーbot💫参加サーバー数: ${client.guilds.cache.size}`,
  });
  console.log(`${client.user.tag} がログインしました！`);
});

//notification.sync({ alter: true });
//YoutubeFeeds.sync({ alter: true });
//YoutubeNotifications.sync({ alter: true });

CommandsRegister();
client.login(process.env.TOKEN);

