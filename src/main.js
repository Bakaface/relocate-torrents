import os from 'os'
import fs from 'fs'
import * as utils from './utils'

const settings = utils.loadSettings('settings.json')
const platform = process.platform

//const userParams = utils.getUserParams()
const userParams = {
  resumeDir: '/media/aface/Shared1/.config/transmission-linux/resume/', 
  rootPath: '/media/aface/Shared',
  newRootPath: '/downloads'
}

fs.readdir(userParams.resumeDir, (error, files) => {
  if (error) { throw error }
  files.slice(0, 1).map(filename => {
    if (utils.isResumeFile(filename)) {
      const fileData = fs.readFileSync(userParams.resumeDir + filename).toString()
    }
  })
})