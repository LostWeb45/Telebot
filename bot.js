const { Bot } = require("grammy");

const bot = new Bot("7956735247:AAFV_iB9H136sitrQvhPvTmOV2zIxHqvPqM");

bot.command("start", (ctx) => {
  ctx.reply(
    "Привет! Я на бот, а настоящий плейбойкарти. Напиши /help, чтобы узнать что я могу"
  );
});

bot.command("help", (ctx) => {
  ctx.reply(
    "/start - приветствие\n/help - помощь\n/eсho - повторить сообщение\n/joke - расскажи шутку"
  );
});

bot.command("echo", (ctx) => {
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  ctx.reply(message || "Пожалуйста, введите сообщение для повторения.");
});

bot.command("joke", (ctx) => {
  ctx.reply("Не смешно.");
});

bot.start();
console.log("Бот поднялся");
