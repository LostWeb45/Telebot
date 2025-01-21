const helpCommand = (ctx) => {
  ctx.reply(
    "/start - приветствие\n/help - помощь\n/echo - повторить сообщение\n/joke - расскажи шутку"
  );
};
module.exports = helpCommand;
