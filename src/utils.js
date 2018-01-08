import fs from 'fs'
import readlineSync from 'readline-sync'

import {messages} from './constants'

// Private

const validateUserParams = userParams =>
  /\/resume$/.test(userParams.resumeDir)

// Public

export const cutUserParamsExtraSlash = userParams => {
  return {
    resumeDir: userParams.resumeDir.replace(/\/$/, ''), 
    rootPath: userParams.rootPath.replace(/\/$/, ''),
    newRootPath: userParams.newRootPath.replace(/\/$/, '')
  }
}

export const loadSettings = filePath => 
  JSON.parse(fs.readFileSync(filePath))

export const getUserParams = () => {
  const resumeDir = readlineSync.question(
    `${messages.questions.resumeDir}: `
  )
  const rootPath = readlineSync.question(
    `${messages.questions.rootPath}: `
  )
  const newRootPath = readlineSync.question(
    `${messages.questions.newRootPath}: `
  )
  return {resumeDir, rootPath, newRootPath}
}

export const isResumeFile = filename =>
  /\.resume$/.test(filename)

export const parseResumeFileData = (fileData, userParams) => {
  const match = fileData.match(new RegExp(
    `\\d+:${userParams.rootPath.replace('/', '\/')}`
  ))
  if (!match) {
    throw new Error(
      messages.errors.invalidResumeFileLocation
    )
  }
  return false
}

