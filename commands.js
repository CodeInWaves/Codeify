// commands.js

const avatarCommand = {
    name: 'avatar',
    description: 'Посмотреть аватарку пользователя',
    options: [
      {
        type: 'USER',
        name: 'target',
        description: 'Пользователь',
        required: false,
      },
    ],
  };
  
  const helpCommand = {
    name: 'help',
    description: 'Показать список команд',
  };
  
  const testCommand = {
    name: 'test',
    description: 'Протестировать бота',
  };
  
  const serverInfoCommand = {
    name: 'serverinfo',
    description: 'Вывести информацию о сервере',
  };
  
  module.exports = {
    avatarCommand,
    helpCommand,
    testCommand,
    serverInfoCommand,
  };
  