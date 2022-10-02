const { Session } = require('ecoledirecte.js')
const { ED_USERNAME, ED_PASSWORD } = process.env
const client = new Session(ED_USERNAME, ED_PASSWORD).login()

module.exports = client
client.then(ed => {
    if (ed.type !== 'student') {
        throw new Error('You need a student account')
    }
    console.info(`EcoleDirecte client logged in as ${ed.account.prenom} ${ed.account.nom} ${ed.account.profile.classe.code}!`)
})