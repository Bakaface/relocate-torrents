import * as utils from '../src/utils'
import {messages} from '../src/constants'

describe('utils', () => {
  describe('cutUserParamsExtraSlash()', () => {
    it('should return valid object without rewrite', () => {
      expect(utils.cutUserParamsExtraSlash({
        resumeDir: 'test1/', 
        rootPath: 'test2/',
        newRootPath: 'test3/',
        rewrite: false,
        newResumeDir: 'test4/'
      })).toEqual({
        resumeDir: 'test1', 
        rootPath: 'test2',
        newRootPath: 'test3',
        rewrite: false,
        newResumeDir: 'test4'
      })
    })
    
    it('should return valid object with rewrite', () => {
      expect(utils.cutUserParamsExtraSlash({
        resumeDir: 'test1/', 
        rootPath: 'test2/',
        newRootPath: 'test3/',
        rewrite: true,
        newResumeDir: null
      })).toEqual({
        resumeDir: 'test1', 
        rootPath: 'test2',
        newRootPath: 'test3',
        rewrite: true,
        newResumeDir: null
      })
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

    const validFileData = 
      'd11:destination19:/media/Data/Somedir7:somekey7:somevale'
    const invalidFileData = 
      'd11:destination19:/media/NotData/Somedir7:somekey7:somevale'
    const wrongLocationFileData = 
      'd11:destination22:/media/NotData/Somedir7:somekey7:somevale'
    const expectedFileData = 
      'd11:destination18:/downloads/Somedir7:somekey7:somevale'

    it.skip('should throw an error with invalid fileData', () => {
      expect(() => utils.parseResumeFileData(
        invalidFileData, userParams
      )).toThrow(new Error(
        messages.errors.invalidResumeFile
      ))
    })

    it.skip('should throw an error with wrong location fileData', () => {
      expect(() => utils.parseResumeFileData(
        wrongLocationFileData, userParams
      )).toThrow(new Error(
        messages.errors.invalidResumeFileLocation
      ))
    })

    it.skip('should return valid result', () => {
      expect(utils.parseResumeFileData(
        validFileData, userParams
      )).toBe(expectedFileData)
    })
  })
})