import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { YStack, XStack, Text, Button, Input, Card } from 'tamagui'
import BottomSheet from '@gorhom/bottom-sheet'
import useNotebookStore from '../store/useNotebookStore'
import useSettingsStore from '../store/useSettingsStore'
import { addSPenListener } from '../services/special/SPenBridge'

const AIAssistantSheet: React.FC = () => {
  const notebooks = useNotebookStore(s => s.notebooks)
  const ragDepth = useSettingsStore(s => s.ragDepth)
  const lectureLanguage = useSettingsStore(s => s.lectureLanguage)
  const sheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '60%'], [])

  const [mode, setMode] = useState<'chat' | 'prof'>('chat')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const open = useCallback(() => {
    sheetRef.current?.expand()
  }, [])

  useEffect(() => {
    const unsubscribe = addSPenListener((event) => {
      // Zdarzenie systemowe 'com.samsung.pen.BUTTON_CLICK' mapowane przez Kotlin
      if (event && (event.type === 'button_click' || event.type === 'com.samsung.pen.BUTTON_CLICK' || event.type === 'spen_event')) {
        open()
      }
    })
    return () => unsubscribe()
  }, [open])

  const runProfPredictor = useCallback(async () => {
    setLoading(true)
    setResults([])
    // simulate analyzing current notebook content taking into account RAG depth
    const payloadSize = Math.floor((ragDepth / 100) * 1000) // Dummy calculation based on depth
    await new Promise(res => setTimeout(res, 900))
    // simple simulated output based on language
    const sample = lectureLanguage === 'Angielski' ? [
      'Explain the application of Stokes theorem in problem A.',
      'Solve the differential equation presented on page 12.',
      'Characterize the asymptotic behavior of the function from the lecture.'
    ] : [
      'Wyjaśnij zastosowanie twierdzenia Stokesa w zadaniu A.',
      'Rozwiąż równanie różniczkowe przedstawione na stronie 12.',
      'Scharakteryzuj asymptotyczne zachowanie funkcji z wykładu.'
    ]
    setResults(sample)
    setLoading(false)
  }, [ragDepth, lectureLanguage])

  return (
    <>
      <YStack position="absolute" right={20} bottom={120} zIndex={60}>
        <Button onPress={open} themeInverse>Asystent AI</Button>
      </YStack>

      <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <YStack p="$4" space>$
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={16} fontWeight="700">AI Assistant</Text>
            <XStack space>$
              <Button onPress={() => setMode('chat')} size="small">Czat</Button>
              <Button onPress={() => setMode('prof')} size="small">Prof-Predictor</Button>
            </XStack>
          </XStack>

          {mode === 'chat' && (
            <YStack space>$
              <Input value={input} onChangeText={setInput} placeholder={`Zadaj pytanie dotyczące notatek (${lectureLanguage})...`} />
              <Button onPress={() => { /* integrate chat flow later */ }}>Wyślij</Button>
            </YStack>
          )}

          {mode === 'prof' && (
            <YStack space>$
              <Text fontSize={14} color="#666">Analiza: {notebooks.length} zeszyty | Głębia RAG: {ragDepth}% | Język: {lectureLanguage}</Text>
              <Button onPress={runProfPredictor} disabled={loading}>{loading ? 'Analizuję...' : 'Uruchom Prof-Predictor'}</Button>

              {loading && <Text mt="$2">Proszę czekać — badam materiał ({ragDepth}% kontekstu)...</Text>}

              {!loading && results.length > 0 && (
                <YStack mt="$3" space>$
                  {results.map((r, i) => (
                    <Card key={i} p="$3" br={8} elevation={2}>
                      <Text fontWeight="700">Pytanie {i + 1}</Text>
                      <Text mt="$2">{r}</Text>
                    </Card>
                  ))}
                </YStack>
              )}
            </YStack>
          )}
        </YStack>
      </BottomSheet>
    </>
  )
}

export default AIAssistantSheet
