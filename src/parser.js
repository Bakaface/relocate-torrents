import Bencode from 'bencode-js'

export default class BencodeParser {
  static encode(data) {
    return Bencode.encode(data)
  }

  static decode(data) {
    return Bencode.decode(data)
  }
}