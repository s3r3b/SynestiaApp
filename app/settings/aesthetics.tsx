import React from 'react'
import { YStack, Text, Button, XStack } from 'tamagui'
import { useRouter } from 'expo-router'
import useSettingsStore from '../../store/useSettingsStore'

const Aesthetics: React.FC = () => {
  const router = useRouter()
  const texture = useSettingsStore(s => s.texture)
  const setTexture = useSettingsStore(s => s.setTexture)
  const accent = useSettingsStore(s => s.themeAccent)
  const setAccent = useSettingsStore(s => s.setThemeAccent)
  const typography = useSettingsStore(s => s.typography)
  const setTypography = useSettingsStore(s => s.setTypography)

  return (
    <YStack f={1} p="$4" bg="#FBFBFB">
      <YStack space="$4">
        <YStack>
          <Text fontWeight={600}>Tekstura papieru</Text>
          <XStack space="$2" mt="$2" flexWrap="wrap">
            <Button theme={texture === 'pure-matte' ? 'active' : undefined} bg={texture === 'pure-matte' ? accent : undefined} color={texture === 'pure-matte' ? '#fff' : undefined} onPress={() => setTexture('pure-matte')}>Pure Matte</Button>
            <Button theme={texture === 'vintage-fiber' ? 'active' : undefined} bg={texture === 'vintage-fiber' ? accent : undefined} color={texture === 'vintage-fiber' ? '#fff' : undefined} onPress={() => setTexture('vintage-fiber')}>Vintage Fiber</Button>
            <Button theme={texture === 'draft-grid' ? 'active' : undefined} bg={texture === 'draft-grid' ? accent : undefined} color={texture === 'draft-grid' ? '#fff' : undefined} onPress={() => setTexture('draft-grid')}>Draft Grid</Button>
          </XStack>
        </YStack>

        <YStack>
          <Text fontWeight={600}>Typografia Interfejsu</Text>
          <XStack space="$2" mt="$2">
            <Button theme={typography === 'nowoczesna' ? 'active' : undefined} bg={typography === 'nowoczesna' ? accent : undefined} color={typography === 'nowoczesna' ? '#fff' : undefined} onPress={() => setTypography('nowoczesna')}>Nowoczesna (Sans)</Button>
            <Button theme={typography === 'drukarska' ? 'active' : undefined} bg={typography === 'drukarska' ? accent : undefined} color={typography === 'drukarska' ? '#fff' : undefined} onPress={() => setTypography('drukarska')}>Drukarska (Serif)</Button>
          </XStack>
        </YStack>

        <YStack>
          <Text fontWeight={600}>Akcent kolorystyczny</Text>
          <XStack space="$2" mt="$2" flexWrap="wrap">
            <Button theme={accent === '#C4A66A' ? 'active' : undefined} bg="#C4A66A" color="#fff" onPress={() => setAccent('#C4A66A')}>Złoty</Button>
            <Button theme={accent === '#A88CFF' ? 'active' : undefined} bg="#A88CFF" color="#fff" onPress={() => setAccent('#A88CFF')}>Lawendowy</Button>
            <Button theme={accent === '#69D2E7' ? 'active' : undefined} bg="#69D2E7" color="#fff" onPress={() => setAccent('#69D2E7')}>Morski</Button>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default Aesthetics

