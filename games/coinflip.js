const { InlineKeyboard } = require("grammy");

function startGame1(ctx) {
  const keyboard = new InlineKeyboard()
    .text("Орел", "Орёл")
    .text("Решка", "Решка");
  ctx.reply(
    "Начнем игру в Орел и решка!\nПравила:\nЯ бросаю монету, и тот, кто угадает, какой стороной она упадёт: с гербовым изображением («орлом») или противоположной ей («решкой»), выигрывает. Выбирай:",
    {
      reply_markup: keyboard,
    }
  );
}
function handleCoinFlip(ctx, choice) {
  const result = Math.random() < 0.5 ? "Орёл" : "Решка";
  if (choice === result) {
    ctx.reply(`Вы выбрали ${choice}, и выпал ${result}! Вы выиграли!`);
  } else {
    ctx.reply(`Вы выбрали ${choice}, но выпал ${result}. Попробуйте снова!`);
  }
}
module.exports = { handleCoinFlip, startGame1 };
