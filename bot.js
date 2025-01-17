const { Bot, InlineKeyboard } = require("grammy");

const bot = new Bot("7956735247:AAFV_iB9H136sitrQvhPvTmOV2zIxHqvPqM");

bot.command("start", (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Орел и решка", "orelandrescha")
    .text("Камень, кожницы, бумага", "cmnplay")
    .text("Угадай число", "changnumb");
  ctx.reply(
    "Привет! Я Стив).\nНапиши /help, чтобы узнать что я умею. Или выбери игру: ",
    {
      reply_markup: keyboard,
    }
  );
});

bot.on("callback_query:data", (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === "orelandrescha") {
    ctx.reply("Начнем игру в Орел и решка!");
  } else if (data === "cmnplay") {
    ctx.reply("Начнем игру в Камень, ножница, бумага");
  } else if (data === "changnumb") {
    ctx.reply("Начнем игру Угадай число");
  }
});

bot.command("help", (ctx) => {
  ctx.reply(
    "/start - приветствие\n/help - помощь\n/echo - повторить сообщение\n/joke - расскажи шутку"
  );
});

bot.command("echo", (ctx) => {
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  ctx.reply(message || "Пожалуйста, введите сообщение для повторения.");
});

bot.command("joke", (ctx) => {
  ctx.reply("Не буду.");
});

bot.api.setMyCommands([
  { command: "start", description: "Запуск бота" },
  { command: "help", description: "Получить список команд" },
  { command: "echo", description: "Повторить сообщение" },
  { command: "joke", description: "Рассказать шутку" },
  { command: "cat", description: "Получить картинку кота" },
]);
// bot.command("cat", (ctx) => {
//   const chatId = ctx.chat.id;
//   if (ctx.text === "кот") {
//     bot.sendPhoto(
//       chatId,
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCmqSFQgo-ixAhVspjiJX2XDwrcjvuqB8Hg&usqp=CAU"
//     );
//   }
// });

bot.start();
console.log("Бот поднялся");
