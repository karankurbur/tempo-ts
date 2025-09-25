import { afterEach, describe, expect, test } from 'bun:test'
import type { Instance as prool_Instance } from 'prool/instances'
import { Instance } from 'tempo/prool'

const instances: prool_Instance[] = []

const tempo = (parameters: Instance.tempo.Parameters = {}) => {
  const instance = Instance.tempo(parameters)
  instances.push(instance)
  return instance
}

afterEach(async () => {
  for (const instance of instances) await instance.stop().catch(() => {})
})

describe.skipIf(!!process.env.CI)('tempo', () => {
  test('default', async () => {
    const messages: string[] = []
    const stdouts: string[] = []

    const instance = tempo()

    instance.on('message', (m) => messages.push(m))
    instance.on('stdout', (m) => stdouts.push(m))

    expect(instance.messages.get()).toMatchInlineSnapshot('[]')

    await instance.start()
    expect(instance.status).toEqual('started')

    expect(messages.join('')).toBeDefined()
    expect(stdouts.join('')).toBeDefined()
    expect(instance.messages.get().join('')).toBeDefined()

    await instance.stop()
    expect(instance.status).toEqual('stopped')

    expect(messages.join('')).toBeDefined()
    expect(stdouts.join('')).toBeDefined()
    expect(instance.messages.get()).toMatchInlineSnapshot('[]')
  })
})
