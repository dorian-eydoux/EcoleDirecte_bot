#!/usr/bin/env node
require('dotenv').config()
const { existsSync, mkdirSync } = require('fs')

const modules = ['grades', 'homework']
    .map(module => require(`./modules/${module}`))

if (!existsSync('./cache')) mkdirSync('./cache')

async function main() {
    const ed = await require('./clients/ecoledirecte')
    modules.forEach(module => {
        module(ed)
    })
}
main()