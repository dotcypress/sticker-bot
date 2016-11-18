const { mount } = require('micro-bot')
const fetch = require('node-fetch')
const sharp = require('sharp')

module.exports = mount('sticker', (ctx) => ctx.telegram
  .getFileLink(ctx.message.sticker.file_id)
  .then(fetch)
  .then((res) => res.buffer())
  .then((buffer) => sharp(buffer).png())
  .then((png) => ctx.replyWithDocument({source: png, filename: 'sticker.png'}))
)
