import * as SecureStore from 'expo-secure-store'

const API_KEY_KEY = 'synestia_api_key'

export async function saveApiKey(key: string) {
  return SecureStore.setItemAsync(API_KEY_KEY, key, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK })
}

export async function getApiKey(): Promise<string | null> {
  return SecureStore.getItemAsync(API_KEY_KEY)
}

export async function deleteApiKey() {
  return SecureStore.deleteItemAsync(API_KEY_KEY)
}

export default { saveApiKey, getApiKey, deleteApiKey }
