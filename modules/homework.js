const telegram = require('../clients/telegram')
const { existsSync, writeFileSync } = require('fs')
const cache = existsSync('./cache/homework.json') ? require('../cache/homework.json') : []

const { bold } = require('../utils/formatters')
const subjects = require('../utils/subjects.json')

module.exports = async ed => {
    const homework = (await ed.getHomework())
        .filter(assignement => !cache.includes(assignement.id))

    for (const assignement of homework) {
        console.info(`New assignement #${assignement.id}`)
        cache.push(assignement.id)
        const message = `📝 ${bold('New assignement')}\n🧑🏻‍🏫 ${subjects[assignement.subject.code] || assignement.subject.name}\n🗓 ${assignement.date.toLocaleDateString('fr')}${assignement.job ? `\n\n${assignement.job.content.text}` : '' }`
        await telegram(message)
    }

    writeFileSync('./cache/homework.json', JSON.stringify(cache))
}