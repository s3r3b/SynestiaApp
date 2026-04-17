import * as Network from 'expo-network'
import useNotebookStore from '../../store/useNotebookStore'
import * as supa from './supabaseClient'

let intervalHandle: any = null

export async function performBackup() {
  const net = await Network.getNetworkStateAsync()
  if (!net.isConnected || !net.isInternetReachable) {
    return { ok: false, reason: 'no-network' }
  }

  const notebooks = useNotebookStore.getState().notebooks
  const payload = {
    created_at: new Date().toISOString(),
    data: notebooks
  }

  try {
    await supa.insertBackup(payload)
    return { ok: true }
  } catch (err: any) {
    return { ok: false, reason: String(err) }
  }
}

export function startAutoBackup(intervalMinutes = 60) {
  stopAutoBackup()
  // run immediately then set interval
  performBackup()
  intervalHandle = setInterval(() => performBackup(), intervalMinutes * 60 * 1000)
}

export function stopAutoBackup() {
  if (intervalHandle) {
    clearInterval(intervalHandle)
    intervalHandle = null
  }
}

export default { performBackup, startAutoBackup, stopAutoBackup }
