// const { Bot, InlineKeyboard } = require("grammy");

const randomNumbers = {}; // Храним случайное число для игры 3

function startGame3(ctx) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  randomNumbers[ctx.chat.id] = randomNumber;

  ctx.reply(
    "Я загадал число от 1 до 100. Попробуйте угадать! Напишите число в чат."
  );
}

module.exports = { startGame3, randomNumbers };
