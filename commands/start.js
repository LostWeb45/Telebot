const { InlineKeyboard } = require("grammy");

const startCommand = (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Орел и решка", "game1")
    .row()
    .text("Камень, ножницы, бумага", "game2")
    .row()
    .text("Угадай число", "game3");

  ctx.reply(
    `Привет! Я <b>Стив</b>).\nНапиши /help, чтобы узнать что я умею. Или выбери игру: `,
    {
      reply_markup: keyboard,
      parse_mode: "HTML",
    }
  );
};

module.exports = startCommand;
