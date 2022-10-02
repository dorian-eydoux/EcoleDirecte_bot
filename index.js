#!/usr/bin/env node
require('dotenv').config()
const { existsSync, mkdirSync } = require('fs')

if (!existsSync('./cache')) mkdirSync('./cache')

async function main() {
    const ed = await require('./clients/ecoledirecte')
    require('./modules/grades')(ed)
}
main()