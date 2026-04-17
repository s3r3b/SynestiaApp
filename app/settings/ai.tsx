import React, { useEffect, useState } from 'react'
import { YStack, Text, Button, XStack, Select, Slider } from 'tamagui'
import { useRouter } from 'expo-router'
import { getApiKey, saveApiKey } from '../../services/security/secureStore'
import useSettingsStore from '../../store/useSettingsStore'
import { TextInput, Alert } from 'react-native'

const AISettings: React.FC = () => {
  const router = useRouter()
  const [key, setKey] = useState('')
  const ragDepth = useSettingsStore(s => s.ragDepth)
  const setRagDepth = useSettingsStore(s => s.setRagDepth)
  const lectureLanguage = useSettingsStore(s => s.lectureLanguage)
  const setLectureLanguage = useSettingsStore(s => s.setLectureLanguage)

  useEffect(() => {
    ;(async () => {
      const k = await getApiKey()
      setKey(k ?? '')
    })()
  }, [])

  const handleSave = async () => {
    await saveApiKey(key)
    Alert.alert('Zapisano', 'Klucz API został bezpiecznie zapisany.')
  }

  return (
    <YStack f={1} p="$4" bg="#FBFBFB">
      <YStack space="$4">
        <YStack>
          <Text fontWeight={600}>Głębia Kontekstu / RAG Depth ({ragDepth}%)</Text>
          <Slider mt="$2" value={ragDepth} onValueChange={v => setRagDepth(Math.round(v))} min={0} max={100} />
          <Text fontSize={12} color="#666" mt="$2">Mniejszy kontekst = tańsze API i szybsza odpowiedź. Większy = inteligentniejsza analiza.</Text>
        </YStack>

        <YStack>
          <Text fontWeight={600}>Język Wykładowcy</Text>
          <Select value={lectureLanguage} onValueChange={setLectureLanguage}>
            <Select.Item value="Polski">Polski</Select.Item>
            <Select.Item value="Angielski">Angielski</Select.Item>
            <Select.Item value="Hiszpański">Hiszpański</Select.Item>
            <Select.Item value="Niemiecki">Niemiecki</Select.Item>
          </Select>
          <Text fontSize={12} color="#666" mt="$2">Wpływa na kontekst promptu dla analizy audio i notatek.</Text>
        </YStack>

        <YStack>
          <Text fontWeight={600}>Zarządzanie Kluczami API (BYOK)</Text>
          <TextInput
            value={key}
            onChangeText={setKey}
            placeholder="Wklej klucz Gemini..."
            secureTextEntry
            style={{ padding: 12, borderRadius: 8, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', marginTop: 8 }}
          />
          <Button mt="$2" onPress={handleSave}>Zapisz w SecureStore</Button>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default AISettings
