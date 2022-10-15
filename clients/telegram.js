const { Telegraf } = require('telegraf')
const client = new Telegraf(process.env.TELEGRAM_TOKEN)


module.exports = text => process.argv.includes('--output=console')
    ? console.debug(text)
    : client.telegram.sendMessage(process.env.TELEGRAM_CHAT, text, { parse_mode: 'HTML' })
