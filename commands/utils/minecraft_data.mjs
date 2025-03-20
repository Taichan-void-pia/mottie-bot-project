import { SlashCommandBuilder } from 'discord.js';

import minecraftData from 'minecraft-data';

export const data = new SlashCommandBuilder()

  .setName('minecraft')

  .setDescription('モッチーさんがマイクラのデータを検索します。')

  .addSubcommand((subcommand) =>

    subcommand.setName("block")

      .setDescription("ブロックデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('blockid')

          .setDescription('ブロックidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("item")

      .setDescription("アイテムデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('itemid')

          .setDescription('アイテムidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("entity")

      .setDescription("エンティティデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('entityid')

          .setDescription('エンティティidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("enchant")

      .setDescription("エンチャントデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('enchantmentid')

          .setDescription('エンチャントidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("effect")

      .setDescription("エフェクトデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('effectid')

          .setDescription('エフェクトidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("attribute")

      .setDescription("アトリビュートデータを検索するぜ")

      .addStringOption(option =>

        option

          .setName('attributeid')

          .setDescription('アトリビュートidを入力してね')

          .setRequired(true)

        )

  )

  .addSubcommand((subcommand) =>

    subcommand.setName("food")

      .setDescription("食べ物データを検索するぜ")

      .addStringOption(option =>

        option

          .setName('foodid')

          .setDescription('食べ物アイテムidを入力してね')

          .setRequired(true)

        )

  )

export async function execute(interaction){

  try{

  const subcommand = interaction.options.getSubcommand();

  const mcData = minecraftData('1.20.4')

  if(subcommand == "block"){

    const id =　interaction.options.getString('blockid');

    const text = (mcData.blocksByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "item"){

    const id =　interaction.options.getString('itemid');

    const text = (mcData.itemsByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "entity"){

    const id =　interaction.options.getString('entityid');

    const text = (mcData.entitiesByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "enchant"){

    const id =　interaction.options.getString('enchantmentid');

    const text = (mcData.enchantmentsByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "effect"){

    const id =　interaction.options.getString('effectid');

    const text = (mcData.effectsByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "attribute"){

    const id =　interaction.options.getString('attributeid');

    const text = (mcData.attributesByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  if(subcommand == "food"){

    const id =　interaction.options.getString('foodid');

    const text = (mcData.foodsByName[id])

    await interaction.reply("結果:　"+id+"のデータ```\n"+JSON.stringify(text)+"\n```")

  }

  }catch(err){

    await interaction.reply("そのidは存在しません");

    console.log(err)

  }

  };
