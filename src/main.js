import fs from 'fs'
import * as utils from './utils'

//const userParams = utils.getUserParams()
const userParams = {
  resumeDir: '/home/aface/Programming/js/relocate-torrents/dist/', 
  rootPath: '/downloads',
  newRootPath: '/new-downloads',
  rewrite: false
}

fs.readdir(userParams.resumeDir, (error, files) => {
  if (error) { throw error }
  files.map(filename => {
    if (utils.isResumeFile(filename)) {
      const fileData = fs.readFileSync(userParams.resumeDir + filename).toString()
      const newFileDir = userParams.rewrite 
        ? userParams.newResumeDir 
        : userParams.resumeDir
      fs.writeFileSync(
        `${newFileDir}/${filename}`,
        utils.parseResumeFileData(fileData)
      )
    }
  })
})