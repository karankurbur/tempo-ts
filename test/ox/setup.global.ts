import { createServer } from 'prool'
import { Instance } from 'tempo.ts/prool'

export default async function () {
  const server = createServer({
    instance: Instance.tempo({
      dev: { blockTime: '500ms' },
      port: 3000,
    }),
    port: 3000,
  })
  await server.start()
  return async () => await server.stop()
}
