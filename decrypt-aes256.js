#!/usr/bin/env node

const crypto = require('crypto')
const OctoDash = require('octodash')
const decryptAes256 = require('./lib/decryptAes256')

const CLI_OPTIONS = [{
  names: ['key', 'k'],
  type: 'string',
  required: true,
  help: 'decryption key',
  helpArg: 'KEY',
}]

class Command {
  constructor({ argv }) {
    const { key } = new OctoDash({
      argv,
      name: 'decrypt-aes256',
      version: '-∞',
      cliOptions: CLI_OPTIONS,
    }).parseOptions()

    this.key = key
  }

  run() {
    this.readAllFromStdIn((error, input) => {
      if (error) throw error

      console.log(decryptAes256(input, { key: this.key })) // eslint-disable-line no-console
    })
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
