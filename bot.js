const { Bot, InlineKeyboard } = require("grammy");

const token = "7956735247:AAFV_iB9H136sitrQvhPvTmOV2zIxHqvPqM";

const bot = new Bot(token);

// Храним состояние пользователя в контексте
const gameState = {};

// Обработчик команды /start
bot.command("start", (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Орел и решка", "game1")
    .row()
    .text("Камень, ножницы, бумага", "game2")
    .row()
    .text("Угадай число", "game3");

  ctx.reply(
    "Привет! Я Стив).\nНапиши /help, чтобы узнать что я умею. Или выбери игру: ",
    {
      reply_markup: keyboard,
    }
  );
});

// Обработчик нажатия на кнопки выбора игры
bot.on("callback_query:data", (ctx) => {
  const gameChoice = ctx.callbackQuery.data;

  ctx.answerCallbackQuery();

  if (gameChoice === "game1") {
    gameState[ctx.chat.id] = "game1"; // Записываем, что пользователь в игре 1
    ctx.reply("Начнем игру в Орел и решка!");
    startGame1(ctx); // Начинаем игру 1
  } else if (gameChoice === "game2") {
    gameState[ctx.chat.id] = "game2"; // Записываем, что пользователь в игре 2
    ctx.reply("Вы выбрали Игра 2. Начинаем...");
    startGame2(ctx); // Начинаем игру 2
  } else if (gameChoice === "game3") {
    gameState[ctx.chat.id] = "game3"; // Записываем, что пользователь в игре 3
    ctx.reply("Вы выбрали Игра 3. Начинаем...");
    startGame3(ctx); // Начинаем игру 3
  }
  // Обработчик для выбора "Орел" или "Решка"
  else if (gameChoice === "orel" || gameChoice === "rescha") {
    if (gameState[ctx.chat.id] === "game1") {
      const result = Math.random() < 0.5 ? "orel" : "rescha"; // Случайный результат
      if (gameChoice === result) {
        ctx.reply(`Вы выбрали ${gameChoice}, и выпал ${result}! Вы выиграли!`);
      } else {
        ctx.reply(
          `Вы выбрали ${gameChoice}, но выпал ${result}. Попробуйте снова!`
        );
      }
      delete gameState[ctx.chat.id]; // Завершаем игру
    }
  }
});

// Логика игры 1 (Орел и решка)
function startGame1(ctx) {
  const keyboard = new InlineKeyboard()
    .text("Орел", "orel")
    .text("Решка", "rescha");
  ctx.reply(
    "Правила:\nЯ бросаю монету, и тот, кто угадает, какой стороной она упадёт: с гербовым изображением («орлом») или противоположной ей («решкой»), выигрывает. Выбирай:",
    {
      reply_markup: keyboard,
    }
  );
}

// Логика игры 2
function startGame2(ctx) {
  ctx.reply("В игре 2 вас ждет вопрос! Скоро начнется...");
}

// Логика игры 3
function startGame3(ctx) {
  ctx.reply("В игре 3 вас ждет загадка! Скоро начнется...");
}

// Запуск бота
bot.start();
