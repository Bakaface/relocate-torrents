import BencodeParser from '../src/parser'

describe('BencodeParser', () => {
  it('should return valid encoded string', () => {
    expect(BencodeParser.encode(
      {"bar": "spam", "foo": 42}
    )).toEqual('d3:bar4:spam3:fooi42ee')
  })

  it('should return valid decoded string', () => {
    expect(BencodeParser.decode(
      'd3:bar4:spam3:fooi42ee'
    )).toEqual({"bar": "spam", "foo": 42})
  })
})