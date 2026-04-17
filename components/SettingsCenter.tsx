import React from 'react'
import { YStack, XStack, Text, Button, Slider, Select } from 'tamagui'
import useSettingsStore from '../store/useSettingsStore'
import { useRouter } from 'expo-router'

const SettingsCenter: React.FC = () => {
  const router = useRouter()
  const texture = useSettingsStore(s => s.texture)
  const noise = useSettingsStore(s => s.noiseLevel)
  const accent = useSettingsStore(s => s.themeAccent)
  const pressure = useSettingsStore(s => s.pressureCurve)
  const setTexture = useSettingsStore(s => s.setTexture)
  const setNoise = useSettingsStore(s => s.setNoiseLevel)
  const setAccent = useSettingsStore(s => s.setThemeAccent)
  const setPressure = useSettingsStore(s => s.setPressureCurve)

  return (
    <YStack p="$4" space>$
      <XStack ai="center" jc="space-between" mb="$3">
        <Button size="small" onPress={() => router.push('/settings/aesthetics')}>Estetyka</Button>
        <Button size="small" onPress={() => router.push('/settings/precision')}>Precyzja</Button>
        <Button size="small" onPress={() => router.push('/settings/ai')}>AI</Button>
        <Button size="small" onPress={() => router.push('/settings/system')}>System</Button>
      </XStack>
      <Text fontSize={18} fontWeight="700">Centrum Ustawień</Text>

      <YStack>
        <Text fontWeight="600">Tekstura papieru</Text>
        <Select value={texture} onValueChange={v => setTexture(v as any)}>
          <Select.Item value="pure-matte">Pure Matte</Select.Item>
          <Select.Item value="vintage-fiber">Vintage Fiber</Select.Item>
          <Select.Item value="draft-grid">Draft Grid</Select.Item>
        </Select>
      </YStack>

      <YStack>
        <Text fontWeight="600">Gęstość szumu ({noise}%)</Text>
        <Slider value={noise} onValueChange={v => setNoise(Math.round(v))} min={0} max={100} />
      </YStack>

      <YStack>
        <Text fontWeight="600">Krzywa nacisku ({pressure})</Text>
        <Slider value={pressure} onValueChange={v => setPressure(Math.round(v))} min={0} max={100} />
      </YStack>

      <YStack>
        <Text fontWeight="600">Akcent kolorystyczny</Text>
        <XStack space>$
          <Button onPress={() => setAccent('#C4A66A')} size="small">Złoty</Button>
          <Button onPress={() => setAccent('#A88CFF')} size="small">Lawendowy</Button>
          <Button onPress={() => setAccent('#69D2E7')} size="small">Morski</Button>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default SettingsCenter
