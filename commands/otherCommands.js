const echoCommand = (ctx) => {
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  ctx.reply(message || "Пожалуйста, введите сообщение для повторения.");
};

const jokeCommnd = (ctx) => {
  ctx.reply("Не буду.");
};

const deletemsg = (ctx) => {
  ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
};
module.exports = { echoCommand, jokeCommnd, deletemsg };
