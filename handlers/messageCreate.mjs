import { ndnDice } from "../commands/utils/dice.mjs";
import {EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,ChannelType} from "discord.js";
import { execSync } from 'child_process';
import {client,sleep,colorcode} from '/app/main.mjs';
import {google} from 'googleapis';
export default async(message) => {
  
  if (message.mentions.has(message.client.user)) {
    if(Math.random() > 0.4){
      message.reply(`<@${message.author.id}> は何か文句でも？`);
    }else{
      message.reply(`お疲れ様やで、イッチ(<@${message.author.id}>)。`)
    }
  }

  //指定した文字かどうかを確認する
  if (message.content ===　"モッチーさん。祝って。"){ 
      await message.channel.send("おめでとおおおおお!🎉")
      await message.delete();
    }
  if (message.content ===　"モッチーさん。リアクション。"){ 
      await message.channel.send("<:1000001843:1294657068304957510><:1000001843:1294657068304957510><:1000001843:1294657068304957510>=͟͟͞💩")
      await message.delete();
    }

  //オウム返し
  const message_ex = message.content.startsWith("!@")
  if(message_ex||Math.random() < 0.002){
    message.channel.send(message.content.replace("!@",""))
    message_ex ? await message.delete() : null;
    return;
  }

  //ターミナル実行
  if((message.content).startsWith('exec')&&message.author.id !== "558964198994870272")return message.reply("taichan_にしか使えないのです。ごめんなさいなのです。(乗っ取りを防ぐため)")
  if ((message.content).startsWith('exec')) {
      const test = (String(message.content).replaceAll('exec ', String(''))); 
      const result = execSync(String(test)).toString();
      message.reply(result)
    };

  //randomによるメッセージ返信

  if(!(message.guild.id ===　"936250852623134760")){
  if (message.content.match(/ラナヒロ|らなひろ|ひろゆき|博之|ラナイ島|ヒロ|隼/)){
    if(message.content.match(/ラナヒロmod/)) return;
    await message.reply("はい！どうも皆さんこんにちは！ラナヒロです！")
  }
  if (message.content.match(/にゃん|にゃーん|にゃ～ん|うにゃー|うにゃ～|にゃほん/)) {
    await message.reply("にゃ～ん");
  }
  if (message.content.match(/ガキ|餓鬼|がき|子供|子ども|こども|キッズ|きっず/)) {
    await message.reply("は？お前もガキだろ。")
  }
  if (message.content.match(/いきんな|イキるな|イキんな|イキる|イキって|イキリ/)) {
    await message.reply("は、イキんなカス。");
    try {
    await message.react("<a:1000001872:1294658499149693009>");}catch(error){console.log(error)}
  }
  if(message.content.match(/おい|コラー|わかってるな|分かってるな|なあ/)){
    if(Math.random() < 0.5){
      await message.reply("ごめんてー")
    }else{
      await message.reply("なんかすいません。")
    }
  }
  if(message.content.match(/ユメ|ゆめ|夢/)){
    await message.reply("夢なんてねぇよw")
    }
  if(message.content.match(/玉|魂|タマ|たま|銀魂/)){
    await message.reply("産業廃棄物やん。")
    }
  if(message.content.match(/になれる/)) {
    await message.reply("※なれません。");
  }
  if (message.content.match(/プロ/)) {
    await message.reply("もちろんです。プロですから。😏");
  }

  if (message.content.match(/製作者|アップデート|nah|win|update|creater/)) {

    await message.reply("進捗どうですか？")

  }
  }

  if (message.content.match(/二択|２択|2択/)) {
    await message.reply("選べ！")
    try {
    message.react("1️⃣");
    message.react("2️⃣");
    }catch(error){
      console.log(error)
    }
  }
  if (message.content.match(/三択|３択|3択/)) {
    await message.reply("選べ！")
    try {
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    }catch(error){
      console.log(error)
    }
  }
  if (message.content.match(/四択|４択|4択/)) {
    await message.reply("選べ！")
    try {
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    message.react("4️⃣");
    }catch(error){
      console.log(error)
    }
  }
  
  if(message.content.match(/はくまいちゃん|白米ちゃん/)){
    message.channel.send("はくまいちゃん♥<:hakumai_chan:1327543460005150721>")
  }
  if (message.content.match(/けけしね|けけ死ね|けけちね|ケケチネ|ｹｹﾁﾈ|死ね/)) {
    await message.reply("ｹｹﾁﾈ");
  }
  if (message.content.match(/^\d+d\d+$/)) {
    await message.reply(ndnDice(message.content));
  }

  //if(message.content.match(/チョコ|2月14日|バレンタイン/)){
  //  await message.reply("⁄(⁄ ⁄-⁄ω⁄-⁄ ⁄)⁄ノ🍫")
  //}

  if(message.content.match(/モッチー|餅|モチ|もっちー|もち/)){
    //画像の配列
    const list_of_image = ['https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/unknown_3.png?v=1728355379412'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/image-1.png?v=1728371137926' 
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/aaa.png.webp?v=1728371144733'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/2.png?v=1728371148303'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/FyWhh7oagAUkyMR.jpg?v=1728371151608'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/2024-08-24_202006.png?v=1728371157822'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/2024-08-24_202409.png?v=1728371161543'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/download.jpg?v=1728371165749'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/154114040951kx7.jpg?v=1728371169942'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/hiroyuki.mp3?v=1728389732622'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/unknown%20(1).png?v=1729403776211'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/B.png?v=1729403785483'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/F.png?v=1729403781921'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/117_20220414222656.png?v=1729403777945'
                           ,'<:1000001843:1294657068304957510>'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/%E7%84%A1%E9%A1%8C9_20241023105004.png?v=1729651387172'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/image.png?v=1729554241756'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/26_20211003204118.png?v=1729554237311'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/unknown.png?v=1729554241048' 
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/sdfsdffsdfsdgfjhgtkgyulygk.png?v=1730035876917'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/image-2.png?v=1730036295176'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/F.jpg?v=1730245016862'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/A.jpg?v=1730245034353'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/E.png?v=1730245028658'
                           ,'https://cdn.glitch.global/f2b08ce3-bf49-4fa1-8100-8fb7354473a2/F.png?v=1730245042284'
                           ,'https://cdn.glitch.global/ff535af0-b3e4-4845-b0db-48a0a6913b83/-2022-11-05-2.26.49-494x360.png?v=1736054149370'
                           ];
    const length_list =　Math.ceil(Math.random() *　list_of_image.length)
    await message.reply(list_of_image[length_list - 1])
  }

  //リンク検知
  if (message.content.includes('https://youtube.com/') || message.content.includes('https://vxtwitter.com/')){
    message.react('💓')
  }

  if (message.content.includes('https://x.com/')) {
    const messageLinkRegex = /https:\/\/x\.com\/(.+)\/status\/(\d+)/;
    const match = message.content.match(messageLinkRegex)
    //アカウントidの取得
    const author_id = (match[1] === "i" ? "データが無いぜ！" : match[1])
    if(author_id ===　"intent") return;
    
    //ボタン追加
    const row = new ButtonBuilder()
					.setCustomId('deletelog')					
          .setLabel('🗑️')
					.setStyle(ButtonStyle.Danger);
    const heart = new ButtonBuilder()
          .setCustomId('heart')
          .setLabel('❤️')
          .setStyle(ButtonStyle.Danger);
    const retweet = new ButtonBuilder()
          .setCustomId('retweet')
          .setLabel('🔁')
          .setStyle(ButtonStyle.Success);
    const reply = new ButtonBuilder()
          .setCustomId('reply')
          .setLabel('💬')
          .setStyle(ButtonStyle.Primary);
    //discordの鯖のニックネームを取得
    const discord_nickname = message.channel.type === 0 && message.member.nickname != null ? message.member.nickname : message.author.tag

    message.channel.send({
      content: String(message.content.replaceAll('x.com','fxtwitter.com') + '\nAccount | ' + author_id +"\nAuthor | "+discord_nickname),
      components:[new ActionRowBuilder().addComponents(reply,heart,retweet,row)]
    }).then(async (sendreact) => {
      sendreact.react("💓") //送ったメッセージにリアクション
      message.delete();
    })
  };
//global-chatという名前が含まれているチャンネルとグローバルチャットをするための物
  if (message.channel.name.includes('global-chat')) {
  const global_channels = client.channels.cache.filter(channel =>channel.name.includes('global-chat') && channel.id !== message.channel.id);
  const embed = new EmbedBuilder()
    .setDescription(message.content+"\n\n"+message.url)
    .setURL(message.url)
    .setAuthor({name:`${message.guild.name} | #${message.channel.name}`,iconURL:String(message.guild.iconURL()),})
    .setColor(colorcode)
    .setFooter({text:`Author | ${message.author.username}`,iconURL: message.author.displayAvatarURL(),})
    .setTimestamp();
  global_channels.forEach(channel => {
    const files_exist =　message.attachments.size > 0 ? message.attachments.map(attachment => attachment.url) : null;//ファイルがあるか確認
    if(files_exist) {
      channel.send({embeds:[embed],files:files_exist});
    }else{
      channel.send({embeds:[embed]});
    }
  });
}
  //リンク先のメッセージをembedで展開
  const messageLinkRegex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
  const match = message.content.match(messageLinkRegex);
  if (match) {
    try{
    //メッセージ箇所取得
    const [link,guildId,channelId,messageId] = match;
    const targetGuild = await client.guilds.fetch(guildId);
    const targetChannel = targetGuild.channels.cache.get(channelId);
    const targetMessage = await targetChannel.messages.fetch(messageId);
    
    const replyMessage = await targetMessage.fetchReference().catch(() => null);
      
    //embedの設定
 　　  const embed = new EmbedBuilder()
      .setDescription("内容:"+targetMessage.content + "\nURL:" +`[メッセージへのリンク](${targetMessage.url})`+(replyMessage != null ? ("\n\n**"+replyMessage.author.username+"**への返信\n内容:"+replyMessage.content+"\nURL:"+`[返信メッセージへのリンク](${replyMessage.url})`):""))
      .setURL (targetMessage.url)
      .setAuthor({name:String(`${targetGuild.name} | #${targetChannel.name}`),iconURL: String(targetGuild.iconURL())})
      .setColor (colorcode)
      .setFooter({text:String(`Author | ${targetMessage.author.username}`),
                 iconURL:String(targetMessage.author.displayAvatarURL())});

    // リプライにembedを含めて送信
    const files_exist =　message.attachments.size > 0 ? message.attachments.map(attachment => attachment.url) : null;//ファイルがあるか確認
    if(files_exist) {
      message.reply({embeds:[embed],files:files_exist});
    }else{
      message.reply({embeds:[embed]});
    }
    }catch(error){
      console.error("メッセージの送信中にエラーが発生しました。:",error)
    }
  }

  const sheets = google.sheets('v4');
  const creds = {
  "type": "service_account",
  "project_id": process.env.ProjectId,
  "private_key_id": process.env.ProjectKeyId,
  "private_key": process.env.ProjectKey,
  "client_email": process.env.ClientEmail,
  "client_id": process.env.clientId,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
  "universe_domain": process.env.universe_domain
    }
  const sheet = `${process.env.SheetID}`;
  const sheet_name = "DiscordGsheet"

  //記録書込関数
  if (message.content.startsWith("sheetreload ")) {
    const data = message.content.replace(message.content.slice(0,12),"");
    try {
      await writeDataToSheet(sheet, sheet_name+"!B2", data);
      message.channel.sendTyping();
      sleep(1000*2);
      message.reply("記録したぜ!")
    } catch (error) {
      console.error("書き込み中にエラーが発生しました:", error.message);
      message.reply("なんかよめなかった！w");
    }
  }

  if (message.content.startsWith("sheetwrite ")) {
    const data = message.content.replace(message.content.slice(0,11),"");
    const sheet_naming = data.slice(0,data.indexOf("/"))
    const data2 = data.replace(sheet_naming+"/","")
    try {
      await appendDataToSheet(sheet, sheet_naming, data2);
      message.reply("データ```\n"+data2+"\n```をGoogleSpreadsheetの"+sheet_naming+"に記録しました！");
    } catch (error) {
      console.error("データの記録中にエラーが発生しました:", error.message);
      message.reply("なんかよめなかった！w");
    }
  }

  //記録閲覧関数
  if (message.content.startsWith("sheetview ")) {
    const range = message.content.replace(message.content.slice(0,10),"");
    try {
      const Data = await readDataFromSheet(sheet, range);
      const Message = Data[0][0];
      message.reply(`${Message}`);
    } catch (error) {
      console.error("閲覧中にエラーが発生しました:", error.message);
      message.reply("なんかよめなかった！w");
    }
  }
  
  // Google Sheets API を使ってデータを追加
async function appendDataToSheet(spreadsheetId, sheetName, data) {
  const auth = await Authorize(); // 認証情報を取得
  await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[data]],
    },
  });
}
  async function readDataFromSheet(spreadsheetId, range) {
    try{
    const auth = await Authorize(); // 認証情報を取得
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });
    const result = response.data.values;
    return result;
    }catch(err){
      console.error('閲覧中にエラーが発生しました。:',err)
    }
  }
  // Google Sheets API を使ってデータを書き込み
  async function writeDataToSheet(spreadsheetId, range, values) {
    const auth = await Authorize(); // 認証情報を取得
    const response = await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range,
      valueInputOption: "RAW", // 書き込みオプション
      resource: {values: [[values]], // values を配列でラップします
                },
    });
    return response.data;
  }
  async function Authorize(){
    const jwtClient = new google.auth.JWT(
      process.env.ClientEmail,
      null,
      process.env.PrivateKey.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive']
    );
    try {
      const resultJwtClient = await jwtClient.authorize();
      //console.log(resultJwtClient);
      return jwtClient
    } catch (error) {
      console.log("Auth Error: " + error);
    }
  }
};

            