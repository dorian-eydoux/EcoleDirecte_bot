const { Telegraf } = require('telegraf')
const client = new Telegraf(process.env.TELEGRAM_TOKEN)

module.exports = text => client.telegram.sendMessage(process.env.TELEGRAM_CHAT, text, { parse_mode: 'HTML' })