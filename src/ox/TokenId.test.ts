import { expect, test } from 'bun:test'
import { TokenId } from 'tempo/ox'

test('fromAddress', () => {
  expect(
    TokenId.fromAddress('0x20c0000000000000000000000000000000000000'),
  ).toBe(0)
  expect(
    TokenId.fromAddress('0x20c0000000000000000000000000000000000001'),
  ).toBe(1)
  expect(
    TokenId.fromAddress('0x20c0000000000000000000000000000000000def'),
  ).toBe(0xdef)
})

test('toAddress', () => {
  expect(TokenId.toAddress(0)).toBe(
    '0x20c0000000000000000000000000000000000000',
  )
  expect(TokenId.toAddress(1)).toBe(
    '0x20c0000000000000000000000000000000000001',
  )
  expect(TokenId.toAddress(0xdef)).toBe(
    '0x20c0000000000000000000000000000000000def',
  )
})
