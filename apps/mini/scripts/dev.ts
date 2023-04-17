import fs from 'node:fs/promises'
import path from 'node:path'
import glob from 'fast-glob'
import { execa } from 'execa'
import { dirname } from './utils.js'

// Paths
const __dirname = dirname(import.meta)
const root = path.resolve(__dirname, '..')

const projectJson: Record<string, any> = JSON.parse(
  await fs.readFile(path.resolve(root, 'project.config.json'), 'utf-8'),
)

let prevStatus = ''
setInterval(async () => {
  const watchFiles = glob.sync(
    [
      `${projectJson.srcMiniprogramRoot}/**/*.{ts,wxml,wxss}`,
      `!${projectJson.srcMiniprogramRoot}/unocss.wxss`,
    ],
    {
      cwd: root,
      absolute: true,
    },
  )
  const stats = await stat(watchFiles)
  if (prevStatus === stats) return
  // Run build
  execa('npm', ['run', 'build'], { cwd: root }).stdout?.pipe(process.stdout)
  prevStatus = stats
}, 500)

async function stat(files: string[]) {
  let result = ''
  for (const file of files) {
    const stats = await fs.stat(file)
    result += stats.mtime.getTime().toString(36)
  }
  return result
}
