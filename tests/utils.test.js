import * as utils from '../src/utils'
import {messages} from '../src/constants'

describe('utils', () => {
  describe('cutUserParamsExtraSlash()', () => {
    expect(utils.cutUserParamsExtraSlash({
      resumeDir: 'test1/', 
      rootPath: 'test2/',
      newRootPath: 'test3/'
    })).toEqual({
      resumeDir: 'test1', 
      rootPath: 'test2',
      newRootPath: 'test3'
    })
  })

  describe('isResumeFile()', () => {
    it('should return true with right filename', () => {
      expect(utils.isResumeFile('test.resume')).toBe(true)
    })

    it('should not return true with wrong filename', () => {
      expect(utils.isResumeFile('test.resumee')).toBe(false)
    })
  })

  describe('parseResumeFileData()', () => {
    const userParams = {
      resumeDir: 'transmission/resume/', 
      rootPath: '/media/Data',
      newRootPath: '/downloads'
    }

    const validFileData = 'somechars11:/media/Datasomechars'
    const invalidFileData = 'somechars11:/media/NotDatasomechars'
    const expectedFileData = 'somechars10:/downloadssomechars'

    it('should throw an error with invalid fileData', () => {
      expect(() => utils.parseResumeFileData(
        invalidFileData, userParams
      )).toThrow(new Error(
        messages.errors.invalidResumeFileLocation
      ))
    })

    it('should return valid result', () => {
      expect(utils.parseResumeFileData(
        validFileData, userParams
      )).toBe(expectedFileData)
    })
  })
})