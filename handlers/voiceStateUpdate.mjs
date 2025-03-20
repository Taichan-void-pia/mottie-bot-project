import { EmbedBuilder } from "discord.js";
import Notification from "../models/notification.mjs"
import fs from "fs";
import {exec} from "child_process";
import {client,sleep} from '/app/main.mjs';
export default async (oldState, newState) => {//
  //if (oldState.channelId === null && newState.channel?.members.size == 1){
    //const notifications = await Notification.findAll({
     // where: {
       // guildId: newState.guild.id,
        //voiceChannelId: newState.channel.id,
     // },
   // });
    
    //const embed = new EmbedBuilder()
     // .setColor(0x5cb85c)
   //   .setAuthor({ name: newState.member.displayName, iconURL: newState.member.displayAvatarURL()})
    //  .setTitle(`<#${newState.channel.id}> で通話を開始しました！`)
    //  .setTimestamp();
    
    //await Promise.all(
     // notifications.map(async n => {
       // const channel = await newState.guild.channels.fetch(n.textChannelId);
       // await channel.send({ embeds: [embed] });
    //  })
    //);
    //}
  let changed = false
  let new_cnt_member_size;
  //old_cnt_member_size =　oldState.channel?.members.size
  //new_cnt_member_size =　newState.channel?.members.size
  //console.log(new_cnt_member_size)
  //上記は使い勝手が悪かったので却下
  //ボイチャ参加時
  if(false){
  if (oldState.channelId === null && newState.channelId !== null){
    if(newState.member.user.bot) return
    const filePath = '/app/voicecounter.json';
    if (fs.existsSync(filePath)) {
      console.log('File exists.');
      const obj = JSON.parse(fs.readFileSync('voicecounter.json').toString());
      for (let i = 0; i < obj.length; i += 2){
      const guild_id = obj[i]
      if(guild_id === newState.guild.id){
        for(let j=0; j<obj[i+1].length; j += 2){
          const member_id = obj[i+1][j]
          if(member_id === newState.member.id){
            //データ変換修正よろしく
            const basis_time = obj[i+1][j+1]
            const base_time = Date.now()
            //jsonデータ処理を下に書く
            obj[i+1][j+1].splice(0,1,String(base_time))
            // JSON文字列に変換
            const jsonString = JSON.stringify(obj);
            // 記録書込関数
            fs.writeFileSync("voicecounter.json", jsonString, (err) => {
              if (err) {
                console.error("なんかすいません。", err);
              } else {
                console.log("jsonファイルを保存しました。");
              }
            });
            //再起動
            reload()
            changed = true
            break
          }
        }
      }
    }
    //見つからなかった場合
    if(!changed){
      const data_obj = obj;
      //データ追加
      data_obj.push(newState.guild.id,[newState.member.id,[String(Date.now()),"0"]])
      // JSON文字列に変換
      const jsonString = JSON.stringify(data_obj);
      // 記録書込関数
      fs.writeFileSync("voicecounter.json", jsonString, (err) => {
        if (err) {
          console.error("なんかすいません。", err);
        } else {
          console.log("jsonファイルを保存しました。");
        }
      });
      reload()
      changed = true
      return
    }
    } else {
      console.log('File does not exist.');
      const data = [newState.guild.id,[newState.member.id,[String(Date.now()),"0"]]]
      //{["guildid-"+newState.guild.id]:{["memberid-"+newState.member.id]:{time:Date.now(),range_time:0}}};
      // JSON文字列に変換
      const jsonString = JSON.stringify(data);
      // 記録書込関数
     fs.writeFileSync("voicecounter.json", jsonString, (err) => {
        if (err) {
          console.error("なんかすいません。", err);
        } else {
          console.log("jsonファイルを保存しました。");
        }
      });
      reload()
    }
  }//endpoint.
  //ボイチャ切断時
  if (oldState.channelId !== null && newState.channelId === null){
    if(oldState.member.user.bot) return
    //記録を取得
    const obj = JSON.parse(fs.readFileSync('voicecounter.json').toString());
    console.log(obj.length+obj[0].length)
    for (let i = 0; i < obj.length; i += 2){
      const guild_id = obj[i]
      if(guild_id === oldState.guild.id){
        for(let j=0; j<obj[i+1].length; j += 2){
          const member_id = obj[i+1][j]
          if(member_id === newState.member.id){
            const basis_time = parseInt(obj[i+1][j+1][1],10)
            const base_time = parseInt(obj[i+1][j+1][0],10)
            const time = Math.round((Date.now()-base_time)/60000)
            const dis_hour = Math.floor(time/60)
            const dis_min = time%60
            
            const member_id2 = client.users.cache.get(String(member_id)).username
            let dis_time;
            if(dis_hour === 0){
              dis_time = `${member_id2}が${dis_min}分、ボイスチャンネルに参加しました。`
            }else{
              dis_time = `${member_id2}が${dis_hour}時間${dis_min}分、ボイスチャンネルに参加しました。`
            }
            //jsonデータ処理を下に書く
            obj[i+1][j+1].splice(0,1,String(base_time))
            const test = basis_time+(Date.now()-base_time)
            obj[i+1][j+1].splice(1,1,String(test))
            //const data = [oldState.guild.id,[newState.member.id,[String(base_time),String(basis_time+(Date.now()-base_time))]]]
            //const data = {["guildid-"+oldState.guild.id]:{["memberid-"+newState.member.id]:{time:base_time,range_time:basis_time+(Date.now()-base_time)}}};
            // JSON文字列に変換
            const jsonString = JSON.stringify(obj);
            // 記録書込関数
            fs.writeFileSync("voicecounter.json", jsonString, (err) => {
              if (err) {
                console.error("なんかすいません。", err);
              } else {
                console.log("jsonファイルを保存しました。");
              }
            });
            //記録閲覧関数
            try {
              const guildId = process.env.mainServerId;
              const channelId = process.env.mainChannelId;
              const guild = await client.guilds.fetch(guildId);
              const channel = guild.channels.cache.get(channelId);
              if (channel) {
                await channel.send(dis_time);
              }　
            } catch (error) {
              console.error("メッセージログの送信中にエラーが発生しました:",error.message);
            }
            //3分後に再起動
            await sleep(1000*60*3)
            reload()
          }
        }
      }
    }
  }//endpoint.
  }
  function reload() {
    //jsonファイルの存在の読み込み
      exec("refresh", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
      });
  }
  function mergeArrays(arr1, arr2) {
  const result = [...arr1];
  arr2.forEach((obj2) => {
    const index = result.findIndex((obj1) => obj1.name === obj2.name);
    if (index !== -1) {
      // 同じ名前のオブジェクトが存在する場合、マージする
      result[index] = { ...result[index], ...obj2 };
    } else {
      // 存在しない場合、新しいオブジェクトを追加する
      result.push(obj2);
    }
  });
  return result;
}
};