import Bencode from 'bencode-js'
import { messages } from './constants'

export default class BencodeParser {
  static getDestination(fileData) {
    const match = /\d+:destination/.exec(fileData)
    if (!match) {
      throw new Error(messages.errors.invalidResumeFile)
    }
    const matchEndIndex = match.index + match[0].length
    const fileDataFromMatchIndex = fileData.slice(matchEndIndex)
    const destinationLengthString = /^\d+/.exec(fileDataFromMatchIndex)[0]
    const destinationLength = parseInt(destinationLengthString)
    return fileDataFromMatchIndex.slice(
      destinationLengthString.length + 1, 
      destinationLength + destinationLengthString.length + 1
    )
  }

  static replaceDestination(fileData, oldDestination, newDestination) {
    return 0
  }
}