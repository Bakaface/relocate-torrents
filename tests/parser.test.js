import BencodeParser from '../src/parser'
import { messages } from '../src/constants'

describe('BencodeParser', () => {

  const fileData = 
    'dsomechars11:destination19:/media/Data/Somedir7:somekey7:somevale'
  const invalidFileData = 
    'dsomechars11:dest19:/media/Data/Somedir7:somekey7:somevale'

  describe('getDestinationValue()', () => {
    it('should return valid destination', () => {
      expect(BencodeParser.getDestinationValue(fileData)).toBe(
        '/media/Data/Somedir'
      )
    })

    it('should throw an exception if no key matched', () => {
      expect(
        () => BencodeParser.getDestinationValue(invalidFileData)
      ).toThrow(new Error(messages.errors.invalidResumeFile))
    })
  })
})