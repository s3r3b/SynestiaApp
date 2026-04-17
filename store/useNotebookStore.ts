import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'

export interface Notebook {
  id: string
  title: string
  coverTexture: string
  createdAt: string // ISO
  updatedAt: string // ISO
}

type CreateNotebookInput = {
  title: string
  coverTexture?: string
}

interface NotebookState {
  notebooks: Notebook[]
  createNotebook: (data: CreateNotebookInput) => Notebook
  updateNotebook: (id: string, patch: Partial<Pick<Notebook, 'title' | 'coverTexture'>>) => void
  deleteNotebook: (id: string) => void
  clearAll: () => void
}

// MMKV instance for persisting zustand state
const storage = new MMKV({ id: 'synestia' })

const mmkvStorage = {
  getItem: (name: string): Promise<string | null> => {
    const value = storage.getString(name)
    return Promise.resolve(value === undefined ? null : value)
  },
  setItem: (name: string, value: string): Promise<void> => {
    storage.set(name, value)
    return Promise.resolve()
  },
  removeItem: (name: string): Promise<void> => {
    storage.delete(name)
    return Promise.resolve()
  }
}

export const useNotebookStore = create<NotebookState>()(
  persist(
    (set, get) => ({
      notebooks: [],
      createNotebook: ({ title, coverTexture }) => {
        const now = new Date().toISOString()
        const nb: Notebook = {
          id: `${now}-${Math.random().toString(36).slice(2, 9)}`,
          title,
          coverTexture: coverTexture ?? '',
          createdAt: now,
          updatedAt: now
        }
        set(state => ({ notebooks: [...state.notebooks, nb] }))
        return nb
      },
      updateNotebook: (id, patch) => {
        const now = new Date().toISOString()
        set(state => ({
          notebooks: state.notebooks.map(nb => (nb.id === id ? { ...nb, ...patch, updatedAt: now } : nb))
        }))
      },
      deleteNotebook: id => set(state => ({ notebooks: state.notebooks.filter(nb => nb.id !== id) })),
      clearAll: () => set({ notebooks: [] })
    }),
    {
      name: 'synestia.notebooks',
      version: 1,
      storage: mmkvStorage
    }
  )
)

export default useNotebookStore
