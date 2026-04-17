import React, { useEffect, useState } from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import SettingsCenter from '../../components/SettingsCenter'
import { getApiKey, saveApiKey } from '../../services/security/secureStore'
import { TextInput } from 'react-native'

const SettingsScreen: React.FC = () => {
  const router = useRouter()
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    ;(async () => {
      const k = await getApiKey()
      setApiKey(k)
      setDraft(k ?? '')
    })()
  }, [])

  const handleSaveKey = async () => {
    await saveApiKey(draft)
    setApiKey(draft)
  }

  return (
    <YStack f={1} bg="#FBFBFB" p="$4">
      <YStack ai="center" jc="space-between" mb="$3" fd="row">
        <Text fontSize={24} fontWeight="700">Ustawienia</Text>
        <Button size="$3" onPress={() => router.back()} circular icon={<Text fontSize={18}>✕</Text>} />
      </YStack>

      <SettingsCenter />

      <YStack mt="$4">
        <Text fontWeight={700} mb="$2">Klucz API (opcjonalnie)</Text>
        <TextInput value={draft} onChangeText={setDraft} placeholder="Wklej swój klucz Gemini" style={{ padding: 10, borderRadius: 8, backgroundColor: '#FFF' }} />
        <Button mt="$2" onPress={handleSaveKey}>Zapisz klucz</Button>
      </YStack>
    </YStack>
  )
}

export default SettingsScreen
