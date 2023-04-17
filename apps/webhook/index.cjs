const { config } = require('dotenv')

config()

const SECRET = process.env.SECRET // Your secret key from Settings in GitHub
const API_DIR = process.env.API_DIR // path to the root of your Strapi project on server

const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec

const PM2_CMD = 'npm run build && pm2 startOrRestart ecosystem.config.js'

http
  .createServer(function (req, res) {
    req.on('data', function (chunk) {
      let sig =
        'sha1=' +
        crypto.createHmac('sha1', SECRET).update(chunk.toString()).digest('hex')

      if (req.headers['x-hub-signature'] == sig) {
        exec(
          `cd ${API_DIR} && git pull && ${PM2_CMD}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
              return
            }
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
          },
        )
      }
    })

    res.end()
  })
  .listen(3001)
