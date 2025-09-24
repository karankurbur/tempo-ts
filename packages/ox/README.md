# `@tempo/ox`

Tempo primitives for Ox.

> [!NOTE]
> This is a temporary package.
> It will be merged into [Ox](https://github.com/wevm/ox) soon.

## Install

```sh
pnpm i ox @tempo/ox@git+https://github.com/tempoxyz/tempo-ts.git#main
```

## Usage

```ts
import { Value } from 'ox'
import { TransactionEnvelopeFeeToken } from '@tempo/ox'

const envelope = TransactionEnvelopeFeeToken.from({
  chainId: 42424,
  feeToken: '0x20c0000000000000000000000000000000000002',
  gas: 30_000n,
  maxFeePerGas: Value.fromGwei('2'),
  maxPriorityFeePerGas: Value.fromGwei('0.2'),
  to: '0x0000000000000000000000000000000000000000',
  value: Value.fromEther('1'),
})
```
