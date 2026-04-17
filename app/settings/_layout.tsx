import { Stack, useRouter } from 'expo-router'
import { Pressable, View, Text } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'

const BackButton = () => {
  const router = useRouter()
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        router.back()
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
        padding: 8,
        marginLeft: -8,
        flexDirection: 'row',
        alignItems: 'center'
      })}
    >
      <ChevronLeft color="#111" size={28} />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#111', marginLeft: 4 }}>Wstecz</Text>
    </Pressable>
  )
}

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#FBFBFB' },
        headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111' },
        headerLeft: () => <BackButton />,
        contentStyle: { backgroundColor: '#FBFBFB' }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="aesthetics" options={{ title: 'Estetyka i Tekstura' }} />
      <Stack.Screen name="precision" options={{ title: 'Precyzja Rysika' }} />
      <Stack.Screen name="ai" options={{ title: 'AI & Quantum' }} />
      <Stack.Screen name="system" options={{ title: 'System & Eksport' }} />
    </Stack>
  )
}
