const { Bot } = require("grammy");
const startCommand = require("./commands/start");
const helpCommand = require("./commands/help");
const { jokeCommnd, echoCommand } = require("./commands/otherCommands");
const { handleCoinFlip, startGame1 } = require("./games/coinflip");
const { startGame3, randomNumbers } = require("./games/choisenumb");
const { handleRPSGame, startGame2 } = require("./games/handlerps");

// Храним состояние пользователя в контексте
const gameState = {};

require("dotenv").config(); // Загружаем переменные из .env файла

const debugMode = process.env.DEBUG === "true"; // Преобразуем строку в булевое значение
const port = process.env.PORT || 3000; // Используем порт из переменной или ставим 3000 по умолчанию
const token = process.env.TOKEN;

console.log(`Сервер запущен на порту: ${port}`);
console.log(`Режим отладки: ${debugMode ? "Включен" : "Выключен"}`);
const bot = new Bot(token);
// Обработчик команды /start
bot.command("start", startCommand);
bot.command("help", helpCommand);
bot.command("joke", jokeCommnd);
bot.command("echo", echoCommand);
// bot.command("start", (ctx) => {
//   const keyboard = new InlineKeyboard()
//     .text("Орел и решка", "game1")
//     .row()
//     .text("Камень, ножницы, бумага", "game2")
//     .row()
//     .text("Угадай число", "game3");

//   ctx.reply(
//     `Привет! Я <b>Стив</b>).\nНапиши /help, чтобы узнать что я умею. Или выбери игру: `,
//     {
//       reply_markup: keyboard,
//       parse_mode: "HTML",
//     }
//   );
// });

// Обработчик нажатия на кнопки выбора игры
bot.on("callback_query:data", async (ctx) => {
  const gameChoice = ctx.callbackQuery.data;

  ctx.answerCallbackQuery();

  if (gameChoice === "game1") {
    gameState[ctx.chat.id] = "game1";
    startGame1(ctx);
  } else if (gameChoice === "game2") {
    gameState[ctx.chat.id] = "game2";
    startGame2(ctx);
  } else if (gameChoice === "game3") {
    gameState[ctx.chat.id] = "game3";
    startGame3(ctx);
  } else if (gameChoice === "Орёл" || gameChoice === "Решка") {
    handleCoinFlip(ctx, gameChoice);
  } else if (gameChoice === "restart_game") {
    startGame1(ctx);
  } else if (
    gameChoice === "rock" ||
    gameChoice === "paper" ||
    gameChoice === "scissors"
  ) {
    handleRPSGame(ctx, gameChoice);
  }
});

// Логика игры 1 (Орел и решка)
// function startGame1(ctx) {
//   const keyboard = new InlineKeyboard()
//     .text("Орел", "Орёл")
//     .text("Решка", "Решка");
//   ctx.reply(
//     "Начнем игру в Орел и решка!\nПравила:\nЯ бросаю монету, и тот, кто угадает, какой стороной она упадёт: с гербовым изображением («орлом») или противоположной ей («решкой»), выигрывает. Выбирай:",
//     {
//       reply_markup: keyboard,
//     }
//   );
// }

// function handleCoinFlip(ctx, choice) {
//   const result = Math.random() < 0.5 ? "Орёл" : "Решка";
//   if (choice === result) {
//     ctx.reply(`Вы выбрали ${choice}, и выпал ${result}! Вы выиграли!`);
//   } else {
//     ctx.reply(`Вы выбрали ${choice}, но выпал ${result}. Попробуйте снова!`);
//   }
// }

// Логика игры 2 (Камень, ножницы, бумага)
// function startGame2(ctx) {
//   const keyboard = new InlineKeyboard()
//     .text("Камень", "rock")
//     .text("Ножницы", "scissors")
//     .text("Бумага", "paper");

//   ctx.reply("Начнем игру в Камень, ножницы, бумага! Выбирай:", {
//     reply_markup: keyboard,
//   });
// }

// function handleRPSGame(ctx, playerChoice) {
//   const choices = ["rock", "scissors", "paper"];
//   const botChoice = choices[Math.floor(Math.random() * choices.length)];
//   const outcomes = {
//     rock: { scissors: "win", paper: "lose", rock: "draw" },
//     scissors: { paper: "win", rock: "lose", scissors: "draw" },
//     paper: { rock: "win", scissors: "lose", paper: "draw" },
//   };

//   const result = outcomes[playerChoice][botChoice];
//   const resultText =
//     result === "win"
//       ? "Вы выиграли!"
//       : result === "lose"
//       ? "Вы проиграли!"
//       : "Ничья!";

//   ctx.reply(
//     `Вы выбрали ${translateChoice(playerChoice)}, а я выбрал ${translateChoice(
//       botChoice
//     )}. ${resultText}`
//   );
// }

// function translateChoice(choice) {
//   return choice === "rock"
//     ? "Камень"
//     : choice === "scissors"
//     ? "Ножницы"
//     : "Бумага";
// }

// Логика игры 3 (Угадай число)
// function startGame3(ctx) {
//   const randomNumber = Math.floor(Math.random() * 100) + 1;
//   randomNumbers[ctx.chat.id] = randomNumber;

//   ctx.reply(
//     "Я загадал число от 1 до 100. Попробуйте угадать! Напишите число в чат."
//   );
// }

bot.on("message", (ctx) => {
  const chatId = ctx.chat.id;
  const userMessage = ctx.message.text;

  if (gameState[chatId] === "game3" && !isNaN(userMessage)) {
    const guessedNumber = parseInt(userMessage, 10);
    const targetNumber = randomNumbers[chatId];

    if (guessedNumber === targetNumber) {
      ctx.reply(`Поздравляю! Вы угадали число: ${targetNumber}`);
      delete randomNumbers[chatId];
      delete gameState[chatId];
    } else if (guessedNumber < targetNumber) {
      ctx.reply("Больше!");
    } else {
      ctx.reply("Меньше!");
    }
  }
});

// bot.command("help", (ctx) => {
//   ctx.reply(
//     "/start - приветствие\n/help - помощь\n/echo - повторить сообщение\n/joke - расскажи шутку"
//   );
// });

// bot.command("echo", (ctx) => {
//   const message = ctx.message.text.split(" ").slice(1).join(" ");
//   ctx.reply(message || "Пожалуйста, введите сообщение для повторения.");
// });

//   ctx.reply("Не буду.");
// });

bot.api.setMyCommands([
  { command: "start", description: "Запуск бота" },
  { command: "help", description: "Получить список команд" },
  { command: "echo", description: "Повторить сообщение" },
  { command: "joke", description: "Рассказать шутку" },
]);

bot.start();
