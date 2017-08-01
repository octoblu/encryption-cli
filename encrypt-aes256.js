#!/usr/bin/env node

const crypto = require('crypto')
const OctoDash = require('octodash')

const CLI_OPTIONS = [{
  names: ['key', 'k'],
  type: 'string',
  required: true,
  help: 'encryption key',
  helpArg: 'KEY',
}]

class Command {
  constructor({ argv }) {
    const { key } = new OctoDash({
      argv,
      name: 'encrypt-aes256',
      version: '-∞',
      cliOptions: CLI_OPTIONS,
    }).parseOptions()

    this.key = key
  }

  run() {
    this.readAllFromStdIn((error, input) => {
      if (error) throw error

      console.log(this.encrypt(input).toString('base64')) // eslint-disable-line no-console
    })
  }

  encrypt(input) {
    const cipher = crypto.createCipher('aes256', this.key)

    let encrypted = cipher.update(input, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
  }

  readAllFromStdIn(callback) {
    let input = new Buffer([])

    process.stdin.on('data', (data) => {
      input = Buffer.concat([input, data])
    })

    process.stdin.on('error', callback)

    process.stdin.on('end', () => {
      callback(null, input.toString('utf8'))
    })
  }
}

const command = new Command({ argv: process.argv })
command.run()
