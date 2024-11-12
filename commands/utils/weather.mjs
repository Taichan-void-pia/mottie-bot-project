import { SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import axios from 'axios';

export const data = new SlashCommandBuilder()
  .setName('weather')
  .setDescription('モッチーさんが天気予報してくれます。')
  .addStringOption(option =>
    option
      .setName('weathercode')
      .setDescription('都市コードもしくは県名(細かく北部とか南部とか知りたかったら都市コードを使って下さい。)')
      .setRequired(true)
  );

export async function execute(interaction){
  //urlの設定
  const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
  //変数の登録
  let merged_area;
  let base_area;
  let area_code;
  let area_name　= "none"
  //タイムゾーンの設定
  process.env.TZ = "Asia/Tokyo";
  //十の位を切り捨てる
  if(interaction.options.getString('weathercode').match(/([0-9]{6})/)){
    const area = parseInt(interaction.options.getString('weathercode'),10);
    merged_area = String(Math.floor(area/100)*100)
    base_area = String(area)
  }else{//県の個別設定
    const area = (interaction.options.getString('weathercode'))
    let area2 =　area
    let merged_area_code =　'0'
    if (area.includes("県")){
      area2 = area.replace("県","")
    }
    //switchで場合分け
    switch (area2){
      case '青森':
        area_code = '020010'
        merged_area_code =　'020000'
        area_name =　"青森"
        break
      case '岩手':
        area_code = '030010'
        merged_area_code =　'030000'
        area_name =　"岩手"
        break
      case '宮城':
        area_code = '040010'
        merged_area_code =　'040000'
        area_name =　"宮城"
        break
      case '秋田':
        area_code = '050000'
        area_name =　"秋田"
        break
      case '山形':
        area_code = '060000'
        area_name =　"山形"
        break
      case '福島':
        area_code = '070030'
        merged_area_code =　'070000'
        area_name =　"福島"
        break
      case '茨城':
        area_code = '080000'
        area_name =　"茨城"
        break
      case '栃木':
        area_code = '090000'
        area_name =　"栃木"
        break
      case '群馬':
        area_code = '100010'
        merged_area_code =　'100000'
        area_name =　"群馬"
        break
      case '埼玉':
        area_code = '110000'
        area_name =　"埼玉"
        break
      case '千葉':
        area_code = '120000'
        area_name =　"千葉"
        break
      case '東京':
        area_code = '130010'
        merged_area_code =　'130000'
        area_name =　"東京都"
        break
      case '神奈川':
        area_code = '140000'
        area_name =　"神奈川"
        break
      case '新潟':
        area_code = '150000'
        area_name =　"新潟"
        break
      case '富山':
        area_code = '160000'
        area_name =　"富山"
        break
      case '石川':
        area_code = '170000'
        area_name =　"石川"
        break
      case '福井':
        area_code = '180000'
        area_name =　"福井"
        break
      case '山梨':
        area_code = '190000'
        area_name =　"山梨"
        break
      case '長野':
        area_code = '200020'
        merged_area_code =　'200000'
        area_name =　"長野"
        break
      case '岐阜':
        area_code = '210010'
        merged_area_code =　'210000'
        area_name =　"岐阜"
        break
      case '静岡':
        area_code = '220000'
        area_name =　"静岡"
        break
      case '愛知':
        area_code = '230000'
        area_name =　"愛知"
        break
      case '三重':
        area_code = '240000'
        area_name =　"三重"
        break
      case '滋賀':
        area_code = '250020'
        merged_area_code =　'250000'
        area_name =　"滋賀"
        break
      case '京都':
        area_code = '260010'
        merged_area_code =　'260000'
        area_name =　"京都府"
        break
      case '大阪':
        area_code = '270000'
        area_name =　"大阪府"
        break
      case '兵庫':
        area_code = '280010'
        merged_area_code =　'280000'
        area_name =　"兵庫"
        break
      case '奈良':
        area_code = '290000'
        area_name =　"奈良"
        break
      case '和歌山':
        area_code = '300000'
        area_name =　"和歌山"
        break
      case '鳥取':
        area_code = '310000'
        area_name =　"鳥取"
        break
      case '島根':
        area_code = '320000'
        area_name =　"島根"
        break
      case '岡山':
        area_code = '330010'
        merged_area_code =　'330000'
        area_name =　"岡山"
        break
      case '広島':
        area_code = '340010'
        merged_area_code =　'340000'
        area_name =　"広島"
        break
      case '山口':
        area_code = '350000'
        area_name =　"山口"
        break
      case '徳島':
        area_code = '360020'
        merged_area_code =　'360000'
        area_name =　"徳島"
        break
      case '香川':
        area_code = '370000'
        area_name =　"香川"
        break
      case '愛媛':
        area_code = '380000'
        area_name =　"愛媛"
        break
      case '高知':
        area_code = '390000'
        area_name =　"高知"
        break
      case '福岡':
        area_code = '400000'
        area_name =　"福岡"
        break
      case '佐賀':
        area_code = '410000'
        area_name =　"佐賀"
        break
      case '長崎':
        area_code = '420020'
        merged_area_code =　'420000'
        area_name =　"長崎"
        break
      case '熊本':
        area_code = '430000'
        area_name =　"熊本"
        break
      case '大分':
        area_code = '440000'
        area_name =　"大分"
        break
      case '宮崎':
        area_code = '450000'
        area_name =　"宮崎"
        break
      case '鹿児島':
        area_code = '460100'
        area_name =　"鹿児島"
        break
      case '沖縄':
        area_code = '471000'
        area_name =　"沖縄"
        break;
      default:
        return; interaction.reply("その県が存在しないか、あるいは、北海道は取得できません。個別にコードを入れて下さい。")
    }
    if(merged_area_code === '0'){
      merged_area =　String(area_code)
    }else{
      merged_area = String(merged_area_code)
    }
    base_area = String(area_code)
    if(merged_area != '130000'&&merged_area != '260000'&&merged_area != '270000'){
      area_name = area_name + "県"
    }    
  }
  //httpの送信
  const resp =　await axios.get(`${url}${merged_area}.json`)
  //日時の取得
  const date = new Date(resp.data[1].reportDatetime)
  const merged_date = String(date.getFullYear() + '年' + ('0' + (date.getMonth() + 1)).slice(-2) + '月' +('0' + date.getDate()).slice(-2) + '日 ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));
  //変数の設定
  let images;
  let data_use;
  //日時の設定
  const today =new Date()
  let merged_today = String(today.getFullYear() + '年' + ('0' + (today.getMonth() + 1)).slice(-2) + '月' +('0' + today.getDate()).slice(-2) + '日');
  //天気コード変換
  const allWeatherCode = {"100":["晴"],"101":["晴時々曇"],"102":["晴一時雨"],"103":["晴時々雨"],"104":["晴一時雪"],"105":["晴時々雪"],"106":["晴一時雨か雪"],"107":["晴時々雨か雪"],"108":["晴一時雨か雷雨"],"110":["晴後時々曇"],"111":["晴後曇"],"112":["晴後一時雨"],"113":["晴後時々雨"],"114":["晴後雨"],"115":["晴後一時雪"],"116":["晴後時々雪"],"117":["晴後雪"],"118":["晴後雨か雪"],"119":["晴後雨か雷雨"],"120":["晴朝夕一時雨"],"121":["晴朝の内一時雨"],"122":["晴夕方一時雨"],"123":["晴山沿い雷雨"],"124":["晴山沿い雪"],"125":["晴午後は雷雨"],"126":["晴昼頃から雨"],"127":["晴夕方から雨"],"128":["晴夜は雨"],"130":["朝の内霧後晴"],"131":["晴明け方霧"],"132":["晴朝夕曇"],"140":["晴時々雨で雷を伴う"],"160":["晴一時雪か雨"],"170":["晴時々雪か雨"],"181":["晴後雪か雨"],"200":["曇"],"201":["曇時々晴"],"202":["曇一時雨"],"203":["曇時々雨"],"204":["曇一時雪"],"205":["曇時々雪"],"206":["曇一時雨か雪"],"207":["曇時々雨か雪"],"208":["曇一時雨か雷雨"],"209":["霧"],"210":["曇後時々晴"],"211":["曇後晴"],"212":["曇後一時雨"],"213":["曇後時々雨"],"214":["曇後雨"],"215":["曇後一時雪"],"216":["曇後時々雪"],"217":["曇後雪"],"218":["曇後雨か雪"],"219":["曇後雨か雷雨"],"220":["曇朝夕一時雨"],"221":["曇朝の内一時雨"],"222":["曇夕方一時雨"],"223":["曇日中時々晴"],"224":["曇昼頃から雨"],"225":["曇夕方から雨"],"226":["曇夜は雨"],"228":["曇昼頃から雪"],"229":["曇夕方から雪"],"230":["曇夜は雪"],"231":["曇海上海岸は霧か霧雨"],"240":["曇時々雨で雷を伴う"],"250":["曇時々雪で雷を伴う"],"260":["曇一時雪か雨"],"270":["曇時々雪か雨"],"281":["曇後雪か雨"],"300":["雨"],"301":["雨時々晴"],"302":["雨時々止む"],"303":["雨時々雪"],"304":["雨か雪"],"306":["大雨"],"308":["雨で暴風を伴う"],"309":["雨一時雪"],"311":["雨後晴"],"313":["雨後曇"],"314":["雨後時々雪"],"315":["雨後雪"],"316":["雨か雪後晴"],"317":["雨か雪後曇"],"320":["朝の内雨後晴"],"321":["朝の内雨後曇"],"322":["雨朝晩一時雪"],"323":["雨昼頃から晴"],"324":["雨夕方から晴"],"325":["雨夜は晴"],"326":["雨夕方から雪"],"327":["雨夜は雪"],"328":["雨一時強く降る"],"329":["雨一時みぞれ"],"340":["雪か雨"],"350":["雨で雷を伴う"],"361":["雪か雨後晴"],"371":["雪か雨後曇"],"400":["雪"],"401":["雪時々晴"],"402":["雪時々止む"],"403":["雪時々雨"],"405":["大雪"],"406":["風雪強い"],"407":["暴風雪"],"409":["雪一時雨"],"411":["雪後晴"],"413":["雪後曇"],"414":["雪後雨"],"420":["朝の内雪後晴"],"421":["朝の内雪後曇"],"422":["雪昼頃から雨"],"423":["雪夕方から雨"],"425":["雪一時強く降る"],"426":["雪後みぞれ"],"427":["雪一時みぞれ"],"450":["雪で雷を伴う"]}
  //配列の取る場所の転換
  if (merged_area ===　base_area){
    data_use = 1
    merged_today = String(today.getFullYear() + '年' + ('0' + (today.getMonth() + 1)).slice(-2) + '月' +('0' + (today.getDate()+1)).slice(-2) + '日');
  }else{
    data_use = 0
  }
  //画像や天気コードの取得
  let weather_code
  for (const airea of resp.data[data_use].timeSeries[0].areas){
    if (airea.area.code ===　base_area){
      weather_code = airea.weatherCodes[0]
      console.log(weather_code)
      images = `https://weathernews.jp/onebox/img/wxicon/${weather_code}.png`
      if(area_name === "none"){
        area_name = airea.area.name
      }
      break;
    }
  }
  //embedの設定
  const embed = new EmbedBuilder()
  .setTitle(merged_today+"の"+area_name+"の天気予報")
  .setDescription(allWeatherCode[weather_code][0])
  .setImage(images)
  .setColor ("#1e28d2")
  .setFooter({text:merged_date+"更新 | 気象庁"})
  await interaction.reply({embeds:[embed]});
  
  }