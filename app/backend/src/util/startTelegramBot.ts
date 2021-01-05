import { getRepository } from "typeorm";
import { Task } from "../entity/Task";

var bot;

/**
 * starts telegram bot and adds listener
 */
export const startTelegramBot = async () => {
  var TelegramBot = require('node-telegram-bot-api');
  var token = ''; //token is empty cause of security issues
  var opt = { polling: true };

  bot = new TelegramBot(token, opt);
  console.log("started telegram bot");

  bot.on('message', async function (msg) {
    var senderId = msg.chat.id;

    if (msg.text != '/tasks') {
      bot.sendMessage(senderId, 'send /tasks to get all tasks');
    } else {
      sendTasks(senderId);
    }
  });
}

/** 
 * sends all tasks from database to the telegram-client
 */
const sendTasks = async (senderId: number) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find();
  
  if(!tasks.length) bot.sendMessage(senderId, 'No tasks to do!');

  tasks.forEach(task => {
    let text = task.name + '\n'
      + 'Description: ' + task.description + '\n'
      + 'CreatedAt: ' + task.createdAt + '\n'
      + 'UpdatedAt: ' + task.updatedAt;
    bot.sendMessage(senderId, text);
  });
}
