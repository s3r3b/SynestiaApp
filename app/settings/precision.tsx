import React, { useState } from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import useSettingsStore from '../../store/useSettingsStore'
import { Slider } from 'tamagui'

const Precision: React.FC = () => {
  const router = useRouter()
  const pressure = useSettingsStore(s => s.pressureCurve)
  const setPressure = useSettingsStore(s => s.setPressureCurve)
  const [palmReject, setPalmReject] = useState(true)

  return (
    <YStack f={1} p="$4" bg="#FBFBFB">
      <YStack>
        <Text fontWeight={600}>Krzywa nacisku ({pressure})</Text>
        <Slider value={pressure} onValueChange={v => setPressure(Math.round(v))} min={0} max={100} />
      </YStack>

      <YStack mt="$3">
        <Text fontWeight={600}>Palm Rejection</Text>
        <Button mt="$2" onPress={() => setPalmReject(s => !s)}>{palmReject ? 'Włączone' : 'Wyłączone'}</Button>
      </YStack>
    </YStack>
  )
}

export default Precision
