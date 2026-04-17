import React from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useRouter } from 'expo-router'

const PaywallScreen: React.FC = () => {
  const router = useRouter()

  return (
    <YStack f={1} bg="#0B0B0D" p="$5" jc="center" ai="center">
      <Text fontSize={28} fontWeight="800" color="#F4E6D2">Odblokuj Quantum Solver & Prof-Predictor</Text>
      <Text mt="$3" color="#D1C6B8" fontSize={16} textAlign="center">Nielimitowany dostęp do AI, ekskluzywne tekstury okładek i priorytetowe backupy.</Text>

      <YStack mt="$6" space>$
        <Button themeInverse size="large" onPress={() => {/* TODO: integrate purchase */}}>
          Rozpocznij 7-dniowy okres próbny
        </Button>
        <Button variant="ghost" onPress={() => router.back()}>
          Zamknij
        </Button>
      </YStack>
    </YStack>
  )
}

export default PaywallScreen
