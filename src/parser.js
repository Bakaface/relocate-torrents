import Bencode from 'bencode-js'
import {messages} from './constants'

export default class BencodeParser {
  static encode(data) {
    return Bencode.encode(data)
  }

  static decode(data) {
    try {
      return Bencode.decode(data)
    }
    catch (TypeError) {
      throw Error(messages.errors.invalidResumeFile)
    }
  }
}