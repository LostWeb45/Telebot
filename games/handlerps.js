const { InlineKeyboard } = require("grammy");

function handleRPSGame(ctx, playerChoice) {
  const choices = ["rock", "scissors", "paper"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const outcomes = {
    rock: { scissors: "win", paper: "lose", rock: "draw" },
    scissors: { paper: "win", rock: "lose", scissors: "draw" },
    paper: { rock: "win", scissors: "lose", paper: "draw" },
  };

  const result = outcomes[playerChoice][botChoice];
  const resultText =
    result === "win"
      ? "Вы выиграли!"
      : result === "lose"
      ? "Вы проиграли!"
      : "Ничья!";

  ctx.reply(
    `Вы выбрали ${translateChoice(playerChoice)}, а я выбрал ${translateChoice(
      botChoice
    )}. ${resultText}`
  );
}

function startGame2(ctx) {
  const keyboard = new InlineKeyboard()
    .text("Камень", "rock")
    .text("Ножницы", "scissors")
    .text("Бумага", "paper");

  ctx.reply("Начнем игру в Камень, ножницы, бумага! Выбирай:", {
    reply_markup: keyboard,
  });
}
function translateChoice(choice) {
  return choice === "rock"
    ? "Камень"
    : choice === "scissors"
    ? "Ножницы"
    : "Бумага";
}

module.exports = { handleRPSGame, startGame2 };
