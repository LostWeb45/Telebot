const echoCommand = (ctx) => {
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  ctx.reply(message || "Пожалуйста, введите сообщение для повторения.");
};

const jokeCommnd = (ctx) => {
  ctx.reply("Не буду.");
};
module.exports = { echoCommand, jokeCommnd };
