import React from 'react'
import { YStack, Button, Text, Pressable } from 'tamagui'
import { BlurView } from 'expo-blur'
import create from 'zustand'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { Settings } from 'lucide-react-native'

type Tool = 'pencil' | 'eraser' | 'lasso' | 'settings'

interface ScribeState {
  activeTool: Tool
  color: string
  setActiveTool: (t: Tool) => void
  setColor: (c: string) => void
}

const useScribeStore = create<ScribeState>(set => ({
  activeTool: 'pencil',
  color: '#111',
  setActiveTool: activeTool => set({ activeTool }),
  setColor: color => set({ color })
}))

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ToolButton: React.FC<{ tool: Tool; label?: string; icon?: React.ReactNode; shared: Animated.SharedValue<number>; onPressOverride?: () => void }> = ({ tool, label, icon, shared, onPressOverride }) => {
  const active = useScribeStore(state => state.activeTool)
  const setActive = useScribeStore(state => state.setActiveTool)

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(shared.value, { damping: 12 }) }]
  }))

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    shared.value = 1.08
    setTimeout(() => (shared.value = 1), 120)
    if (onPressOverride) {
      onPressOverride()
    } else {
      setActive(tool)
    }
  }

  return (
    <AnimatedPressable onPress={onPress} style={style} pressStyle={{ opacity: 0.9 }}>
      <YStack ai="center" jc="center" w={56} h={56} br={999} bg={active === tool ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)'}>
        {icon ? icon : <Text fontSize={12} fontWeight="700">{label}</Text>}
      </YStack>
    </AnimatedPressable>
  )
}

const ScribeBar: React.FC = () => {
  const router = useRouter()
  const pencilShared = useSharedValue(1)
  const eraserShared = useSharedValue(1)
  const lassoShared = useSharedValue(1)
  const settingsShared = useSharedValue(1)

  return (
    <YStack position="absolute" right={20} top={120} zIndex={50}>
      <BlurView intensity={60} tint="light" style={{ borderRadius: 28, overflow: 'hidden' }}>
        <YStack p="$2" space="$2" ai="center">
          <ToolButton tool="pencil" label="Ołówek" shared={pencilShared} />
          <ToolButton tool="eraser" label="Gumka" shared={eraserShared} />
          <ToolButton tool="lasso" label="Lasso" shared={lassoShared} />
          <YStack h={1} w={32} bg="rgba(0,0,0,0.1)" my="$1" />
          <ToolButton tool="settings" icon={<Settings color="#111" size={24} />} shared={settingsShared} onPressOverride={() => router.push('/settings')} />
        </YStack>
      </BlurView>
    </YStack>
  )
}

export default ScribeBar
