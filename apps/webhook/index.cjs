const { config } = require('dotenv')

config()

const SECRET = process.env.SECRET // Your secret key from Settings in GitHub
const API_DIR = process.env.API_DIR // path to the root of your Strapi project on server

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

const PM2_CMD = 'npm run build && pm2 startOrRestart ecosystem.config.js'

http
  .createServer(async function (req, res) {
    const buffers = []
    for await (const chunk of req) {
      buffers.push(chunk)
    }
    const data = Buffer.concat(buffers).toString()

    const signature = `sha1=${crypto
      .createHmac('sha1', SECRET)
      .update(data)
      .digest('hex')}`
    if (req.headers['x-hub-signature'] !== signature) {
      console.log('Invalid signature')
      res.end()
    }

    const body = JSON.parse(data)
    if (
      !body.head_commit.added.some(file => file.startWith('apps/api')) &&
      !body.head_commit.removed.some(file => file.startWith('apps/api')) &&
      !body.head_commit.modified.some(file => file.startWith('apps/api'))
    ) {
      console.log('No changes in `apps/api`')
      res.end()
    }

    exec(`cd ${API_DIR} && git pull && ${PM2_CMD}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
    res.end()
  })
  .listen(3001)
