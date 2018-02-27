import fs from 'fs'
import readlineSync from 'readline-sync'

import BencodeParser from './parser'
import {messages} from './constants'

// Private

const validateUserParams = userParams =>
  /\/resume$/.test(userParams.resumeDir)

// Public

export const cutUserParamsExtraSlash = userParams => {
  return {
    ...userParams,
    resumeDir: userParams.resumeDir.replace(/\/$/, ''), 
    rootPath: userParams.rootPath.replace(/\/$/, ''),
    newRootPath: userParams.newRootPath.replace(/\/$/, ''),
    newResumeDir: userParams.rewrite 
      ? null
      : userParams.newResumeDir.replace(/\/$/, ''),
  }
}

export const loadSettings = filePath => 
  JSON.parse(fs.readFileSync(filePath))

export const getUserParams = () => {
  const resumeDir = readlineSync.question(
    messages.questions.resumeDir
  )

  const rootPath = readlineSync.question(
    messages.questions.rootPath
  )

  const newRootPath = readlineSync.question(
    messages.questions.newRootPath
  )

  const rewrite = readlineSync.question(
    messages.questions.rewrite
  ) === 'y'

  let newResumeDir = null
  if (!rewrite) {
    newResumeDir = readlineSync.question(
      messages.questions.newResumeDir
    )
  }

  return {resumeDir, rootPath, newRootPath, rewrite, newResumeDir}
}

export const isResumeFile = filename =>
  /\.resume$/.test(filename)

export const parseResumeFileData = (fileData, userParams) => {
  const params = cutUserParamsExtraSlash(userParams)
  const destinationValue = BencodeParser.getDestinationValue(fileData)
  const newDestinationValue = destinationValue.replace(
    params.rootPath, params.newRootPath
  )
  
  return fileData.replace(
    `${destinationValue.length}:${destinationValue}`,
    `${newDestinationValue.length}:${newDestinationValue}`,
  )
}
