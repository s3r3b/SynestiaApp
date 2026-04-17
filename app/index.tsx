import React from 'react'
import { YStack, XStack, Text, Pressable, Image } from 'tamagui'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { Settings } from 'lucide-react-native'
import useNotebookStore from '../store/useNotebookStore'
import useSettingsStore from '../store/useSettingsStore'

const AtelierScreen: React.FC = () => {
  const router = useRouter()
  const notebooks = useNotebookStore(state => state.notebooks)
  const createNotebook = useNotebookStore(state => state.createNotebook)
  const themeAccent = useSettingsStore(s => s.themeAccent)
  const typography = useSettingsStore(s => s.typography)
  const fontFamily = typography === 'drukarska' ? 'serif' : 'sans-serif'

  const handleOpen = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(`/notebook/${id}`)
  }

  const handleCreate = () => {
    const nb = createNotebook({ title: 'Nowy Zeszyt' })
    Haptics.selectionAsync()
    router.push(`/notebook/${nb.id}`)
  }

  const rows: any[] = []
  for (let i = 0; i < notebooks.length; i += 2) rows.push(notebooks.slice(i, i + 2))

  return (
    <YStack f={1} bg="#F9F9F7" p="$4">
      <Text fontFamily={fontFamily} fontSize={32} fontWeight="700" mb="$4" color={themeAccent}>Atelier</Text>

      <Pressable onPress={() => router.push('/settings')} style={{ position: 'absolute', right: 16, top: 18, padding: 8 }}>
        <Settings color={themeAccent} size={28} />
      </Pressable>

      {rows.length === 0 && (
        <YStack ai="center" jc="center" f={1}>
          <Text fontFamily={fontFamily} color="#666" fontSize={16}>Brak zeszytów — utwórz pierwszy</Text>
        </YStack>
      )}

      {rows.map((row, idx) => (
        <XStack key={idx} space="$3" mb="$3">
          {row.map((nb: any) => (
            <Pressable key={nb.id} onPress={() => handleOpen(nb.id)} style={{ flex: 1 }}>
              <YStack bg="#FFF" h={220} br={12} elevation={2} p="$3" jc="flex-end">
                <Image source={ { uri: nb.coverTexture || 'https://via.placeholder.com/150' } } width={80} height={80} mb="$2" />
                <Text fontFamily={fontFamily} fontSize={18} fontWeight="600">{nb.title}</Text>
              </YStack>
            </Pressable>
          ))}
          {row.length === 1 && <YStack f={1} />}
        </XStack>
      ))}

      <Pressable onPress={handleCreate} style={{ position: 'absolute', right: 20, bottom: 28 }}>
        <YStack w={64} h={64} br={32} ai="center" jc="center" bg={themeAccent} elevation={6}>
          <Text fontFamily={fontFamily} color="#FFF" fontSize={14} fontWeight="700">Nowy</Text>
        </YStack>
      </Pressable>
    </YStack>
  )
}

export default AtelierScreen
