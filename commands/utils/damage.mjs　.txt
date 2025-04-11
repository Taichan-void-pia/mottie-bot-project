import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('damage')
  .setDescription('ラナヒロmodのダメージ計算をします。')
  .addIntegerOption(option2 =>　option2
      .setName('strength')
      .setDescription('攻撃力上昇ポーションのレベル')
      .setRequired(true)
                   )
.addIntegerOption(option3 =>　option3
                  
      .setName('armor')
      .setDescription('防具値')
      .setRequired(true)　
                 )
.addIntegerOption(option4 =>　option4

      .setName('armor_toughness')
      .setDescription('防具強度')
      .setRequired(true)
                   )
.addIntegerOption(option5 =>　option5

      .setName('mecha_num')
      .setDescription('メカニズムアーマーを何部位着ているか')
      .setRequired(true)
                   )
.addIntegerOption(option6 =>　option6

      .setName('resistance')
      .setDescription('耐性ポーションのレベル')
      .setRequired(true)
                   )
.addBooleanOption(option7 =>　option7

      .setName('mecha_shield')
      .setDescription('メカニズムシールドをオフハンドに装備しているか')
      .setRequired(true)
                   )
export async function execute(interaction){
  const dmg = 30 * (1 + (interaction.options.getInteger('strength')) / 3) + 3 * (interaction.options.getInteger('strength')) * Math.pow(1.35, interaction.options.getInteger('mecha_num')) * ((interaction.options.getBoolean('mecha_shield')) ? 4 : 1);

       const dmg2 = ((interaction.options.getInteger('armor')) - dmg / (2 + (interaction.options.getInteger('armor_toughness')) / 4)) / 25 - (interaction.options.getInteger('armor')) / 125 > 0 ? ((interaction.options.getInteger('armor')) - dmg / (2 + (interaction.options.getInteger('armor_toughness')) / 4)) / 25 : (interaction.options.getInteger('armor')) / 125;

        await interaction.reply({

            content: (['ラナヒロmodダメージ計算 damage:', Math.round(dmg), ',amount of damage:', Math.round(dmg * (1 - dmg2) * (1 - (interaction.options.getInteger('resistance')) * 0.2))].join('')),

            ephemeral: false,

            components: []

        });
  
  }