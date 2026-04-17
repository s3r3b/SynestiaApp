import { Stack } from 'expo-router'
import { TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import useSettingsStore from '../store/useSettingsStore'

export default function Layout() {
  const themeAccent = useSettingsStore(s => s.themeAccent)
  const isDark = false // Default to light mode for paper app

  // We can map themeAccent to something tamagui understands, or just inject it as a variable
  // For now we'll just wrap the provider
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Theme name="light">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </Theme>
    </TamaguiProvider>
  )
}
