const { Client, Intents, MessageEmbed } = require('discord.js');
const { avatarCommand, helpCommand, testCommand, serverInfoCommand } = require('./commands');

const TOKEN = 'MTE0NDYzODA4NDgzNTcwODkzOQ.GpVdbN.A7soiDNbvZmd0I7dKaK3LcCFN3fauSuPlse8NM';
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['GUILD_MEMBER', 'MESSAGE', 'CHANNEL']
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  registerCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'help') {
    const embed = new MessageEmbed()
      .setColor('#FF5733')
      .setTitle('Список команд')
      .addField('Прочее:', '/test - Протестировать бота')
      .addField('Полезное:', '/avatar - Посмотреть аватарку пользователя\n/serverinfo - Информация о сервере')
      .setImage('https://i.imgur.com/U9ZPx2k.png')
      .setFooter('Made by aqua', client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'test') {
    await interaction.reply('И зачем ты это тестируешь?');
  } else if (commandName === 'avatar') {
    const targetUser = options.get('target')?.user || interaction.user;

    const avatarEmbed = new MessageEmbed()
      .setColor('#FF5733')
      .setTitle(`Аватарка пользователя ${targetUser.tag}`)
      .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
      .setFooter('Made by aqua', client.user.displayAvatarURL());

    await interaction.reply({ embeds: [avatarEmbed] });
  } else if (commandName === 'serverinfo') {
    const guild = interaction.guild;
    const serverInfoEmbed = new MessageEmbed()
      .setColor('#FF5733')
      .setTitle(`Информация о сервере ${guild.name}`)
      .setDescription(`**Вот некоторые основные детали о сервере:**`)
      .addField('ID', `\`${guild.id}\``, true)
      .addField('Уровень верификации', `🛡️ ${guild.verificationLevel}`, true)
      .addField('Текстовые каналы', `💬 ${guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size}`, true)
      .addField('Голосовые каналы', `🔊 ${guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size}`, true)
      .addField('Дата создания', `${guild.createdAt.toLocaleString('ru-RU', { timeZone: 'UTC' })}`, true)
      .addField('Количество участников', `👥 ${guild.memberCount.toString()}`, true)
      .addField('Активировано бустов', `🚀 ${guild.premiumSubscriptionCount || 0}`, true)
      .addField('⠀', '\u200b')
      .setThumbnail(guild.iconURL())
      .setFooter('Made by aqua', client.user.displayAvatarURL());

    await interaction.reply({ embeds: [serverInfoEmbed] });
  }
});

async function registerCommands() {
  const commands = [
    avatarCommand,
    helpCommand,
    testCommand,
    serverInfoCommand,
  ];

  for (const [guildId, guild] of client.guilds.cache) {
    try {
      await guild.commands.set(commands);
    } catch (error) {
      console.error(`Ошибка при регистрации слеш-команд на сервере с ID ${guildId}:`, error);
    }
  }
}

client.login(TOKEN);
