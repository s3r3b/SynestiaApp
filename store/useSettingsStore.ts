import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'

type TextureOption = 'pure-matte' | 'vintage-fiber' | 'draft-grid'
type TypographyOption = 'drukarska' | 'nowoczesna'

interface SettingsState {
  texture: TextureOption
  noiseLevel: number
  themeAccent: string
  pressureCurve: number
  typography: TypographyOption
  ragDepth: number
  lectureLanguage: string
  autoSync: boolean
  setTexture: (t: TextureOption) => void
  setNoiseLevel: (v: number) => void
  setThemeAccent: (c: string) => void
  setPressureCurve: (v: number) => void
  setTypography: (t: TypographyOption) => void
  setRagDepth: (d: number) => void
  setLectureLanguage: (l: string) => void
  setAutoSync: (b: boolean) => void
}

const storage = new MMKV({ id: 'settings' })

const mmkvStorage = {
  getItem: (name: string) => {
    const val = storage.getString(name)
    return val ?? null
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value)
  },
  removeItem: (name: string) => {
    storage.delete(name)
  }
}

export const useSettingsStore = create<SettingsState>(persist(
  set => ({
    texture: 'pure-matte',
    noiseLevel: 20,
    themeAccent: '#C4A66A',
    pressureCurve: 50,
    typography: 'nowoczesna',
    ragDepth: 20,
    lectureLanguage: 'Polski',
    autoSync: false,
    setTexture: texture => set({ texture }),
    setNoiseLevel: noiseLevel => set({ noiseLevel }),
    setThemeAccent: themeAccent => set({ themeAccent }),
    setPressureCurve: pressureCurve => set({ pressureCurve }),
    setTypography: typography => set({ typography }),
    setRagDepth: ragDepth => set({ ragDepth }),
    setLectureLanguage: lectureLanguage => set({ lectureLanguage }),
    setAutoSync: autoSync => set({ autoSync })
  }),
  {
    name: 'synestia-settings',
    getStorage: () => mmkvStorage
  }
))

export default useSettingsStore
