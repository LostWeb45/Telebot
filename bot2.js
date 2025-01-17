const { Bot, InlineKeyboard } = require("grammy");

const bot = new Bot("7956735247:AAFV_iB9H136sitrQvhPvTmOV2zIxHqvPqM");

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Орел и решка", "orelandrescha")
    .text("Камень, ножницы, бумага", "cmnplay")
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
    const keyboard = new InlineKeyboard()
      .text("Орел", "orel")
      .text("Решка", "rescha");
    ctx.reply(
      "Начнем игру в Орел и решка!\nПравила:\nЯ бросаю монету, и тот, кто угадает, какой стороной она упадёт: с гербовым изображением («орлом») или противоположной ей («решкой»), выигрывает. Выбирай:",
      {
        reply_markup: keyboard,
      }
    );
  } else if (data === "cmnplay") {
    ctx.reply("Начнем игру в Камень, ножницы, бумага");
  } else if (data === "changnumb") {
    ctx.reply("Начнем игру Угадай число");
  }
});

// Обрабатываем кнопки "Орел" и "Решка"
bot.callbackQuery("orel", (ctx) => {
  // Добавьте вашу логику для подбрасывания монеты или проверки выбора
  ctx.reply("Вы выбрали Орел!");
  // Например, можно подбросить монету и показать результат
  const coin = Math.random() > 0.5 ? "Орел" : "Решка";
  if (coin === "Орел") {
    ctx.reply("Монета выпала Орел! Вы победили!");
  } else {
    ctx.reply("Монета выпала Решка! Вы проиграли.");
  }
});

bot.callbackQuery("rescha", (ctx) => {
  // Добавьте вашу логику для подбрасывания монеты или проверки выбора
  ctx.reply("Вы выбрали Решка!");
  // Например, можно подбросить монету и показать результат
  const coin = Math.random() > 0.5 ? "Орел" : "Решка";
  if (coin === "Решка") {
    ctx.reply("Монета выпала Решка! Вы победили!");
  } else {
    ctx.reply("Монета выпала Орел! Вы проиграли.");
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

// Запуск бота
bot.start();
