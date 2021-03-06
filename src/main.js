import fs from 'fs'
import * as utils from './utils'
import { Buffer } from 'buffer';

export const main = userParams => {
  const params = utils.cutUserParamsExtraSlash(userParams)

  fs.readdir(userParams.resumeDir, (error, files) => {
    if (error) { throw error }
    files.map(filename => {
      if (utils.isResumeFile(filename)) {
        const fileData = fs.readFileSync(
          `${userParams.resumeDir}/${filename}`
        ).toString('binary')
        const newFileDir = userParams.rewrite 
          ? userParams.resumeDir 
          : userParams.newResumeDir
        fs.writeFileSync(
          `${newFileDir}/${filename}`,
          utils.parseResumeFileData(fileData, userParams),
          'binary'
        )
      }
    })
  })
}