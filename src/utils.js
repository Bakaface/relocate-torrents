import fs from 'fs'
import readlineSync from 'readline-sync'

import BencodeParser from './parser'
import {messages} from './constants'
import { encode } from 'punycode';

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
  if (rewrite) {
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
  const decodedFileData = BencodeParser.decode(fileData)
  const destination = decodedFileData.destination

  if (!destination) {
    throw new Error(
      messages.errors.invalidResumeFile
    )
  }

  if (!destination.includes(params.rootPath)) {
    throw new Error(
      messages.errors.invalidResumeFileLocation
    )
  }

  return BencodeParser.encode({
    ...decodedFileData,
    destination: destination.replace(params.rootPath, params.newRootPath)
  })
}
