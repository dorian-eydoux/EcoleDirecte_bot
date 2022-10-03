const telegram = require('../clients/telegram')
const { existsSync, writeFileSync } = require('fs')
const cache = existsSync('./cache/grades.json') ? require('../cache/grades.json') : []

const { bold } = require('../utils/formatters')
const subjects = require('../utils/subjects.json')
const emojis = ['⚫️', '🟤', '🔴', '🟠', '🟡', '🟢', '🔵', '⚪️']

module.exports = async ed => {
    const grades = (await ed.getGrades())
        .filter(grade => !cache.includes(grade._raw.id))

    for (const grade of grades) {
        console.info(`New grade #${grade._raw.id}`)
        cache.push(grade._raw.id)
        const emoji = emojis[Math.round(grade.value / grade.outOf * (emojis.length - 1))]
        const message = `🧮 ${bold('New grade')}\n${grade.name}\n\n${emoji} ${bold(grade.value)} / ${grade.outOf}\n${grade.weight !== 1 ? `🎚 Coefficient ${bold(grade.weight)}\n` : ''}📊 Averange ${bold(grade.classAvg)}\n🧑🏻‍🏫 ${subjects[grade.subjectCode]}\n🗓 ${grade.date.toLocaleDateString('fr')}`
        await telegram(message)
    }

    writeFileSync('./cache/grades.json', JSON.stringify(cache))
}