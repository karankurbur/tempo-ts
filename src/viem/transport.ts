import { createTransport, type Transport } from 'viem'

export type Relay = Transport<typeof withRelay.type>

/**
 * Creates a relay transport that routes requests between the default transport or the relay transport.
 *
 * @param defaultTransport - The default transport to use.
 * @param relayTransport - The relay transport to use.
 * @returns A relay transport.
 */
export function withRelay(
  defaultTransport: Transport,
  relayTransport: Transport,
): withRelay.ReturnType {
  return (config) => {
    const transport_default = defaultTransport(config)
    const transport_relay = relayTransport(config)

    return createTransport({
      key: withRelay.type,
      name: 'Relay Proxy',
      async request({ method, params }, options) {
        if (withRelay.methods.includes(method))
          return transport_relay.request({ method, params }, options) as never
        return transport_default.request({ method, params }, options) as never
      },
      type: withRelay.type,
    })
  }
}

export namespace withRelay {
  export const methods = ['eth_sendRawTransaction']
  export const type = 'relay'

  export type ReturnType = Relay
}
