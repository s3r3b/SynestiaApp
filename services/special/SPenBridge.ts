import { NativeModules, NativeEventEmitter, Platform } from 'react-native'

const { SPenBridge } = NativeModules as any

let emitter: any = null

export const isAvailable = () => !!SPenBridge

export const addSPenListener = (cb: (event: any) => void) => {
  if (!SPenBridge) return () => {}
  if (!emitter) emitter = new NativeEventEmitter(SPenBridge)
  const sub = emitter.addListener('SPenEvent', cb)
  return () => sub.remove()
}

export const sendCommand = (cmd: string, payload?: any) => {
  if (!SPenBridge) return Promise.resolve(null)
  return SPenBridge.sendCommand(cmd, payload)
}

export default { isAvailable, addSPenListener, sendCommand }
