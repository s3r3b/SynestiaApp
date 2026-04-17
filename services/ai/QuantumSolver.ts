import useSettingsStore from '../../store/useSettingsStore'

export interface QuantumResult {
  equation_detected: string
  step_by_step_solution: string
  raw?: any
}

type SolveOptions = {
  endpoint?: string
  timeoutMs?: number
}

const DEFAULT_ENDPOINT = 'https://api.example.com/v1/vision/analyze'
const DEFAULT_TIMEOUT = 20000

function safeParseJson(input: any): any {
  try {
    return typeof input === 'string' ? JSON.parse(input) : input
  } catch {
    return null
  }
}

export async function solveMathFromImage(
  base64Image: string,
  apiKey: string,
  options: SolveOptions = {}
): Promise<QuantumResult> {
  const endpoint = options.endpoint ?? DEFAULT_ENDPOINT
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT
  const lectureLanguage = useSettingsStore.getState().lectureLanguage || 'Polski'

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  const payload = {
    input: {
      image: base64Image,
      // system-level instruction for the model to return structured JSON
      instruction:
        `Analyze the provided image containing a handwritten mathematical expression. Return ONLY valid JSON with keys: equation_detected and step_by_step_solution. Analizuj ten materiał zakładając, że głównym językiem jest: ${lectureLanguage}.`
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey ? `Bearer ${apiKey}` : ''
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    clearTimeout(id)

    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(`API error ${res.status}: ${txt}`)
    }

    const json = await res.json().catch(() => null)
    const parsed = safeParseJson(json)

    // tolerant extraction: check common shapes
    let equation = ''
    let solution = ''

    if (parsed && typeof parsed === 'object') {
      if (typeof parsed.equation_detected === 'string') equation = parsed.equation_detected
      if (typeof parsed.step_by_step_solution === 'string') solution = parsed.step_by_step_solution
    }

    // fallback: try to extract from text fields
    if (!equation && parsed && typeof parsed === 'object') {
      const text = (parsed.text || parsed.result || parsed.output || '')
      if (typeof text === 'string') {
        // naive extraction: first line as equation, rest as solution
        const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean)
        if (lines.length > 0) equation = lines[0]
        if (lines.length > 1) solution = lines.slice(1).join('\n')
      }
    }

    if (!equation && !solution) {
      throw new Error('Model returned no valid result')
    }

    return { equation_detected: equation, step_by_step_solution: solution, raw: parsed }
  } catch (err: any) {
    // robust fallback
    return {
      equation_detected: '',
      step_by_step_solution: 'Nie udało się rozpoznać równania — spróbuj jeszcze raz lub popraw kontrast obrazu.',
      raw: { error: String(err && err.message ? err.message : err) }
    }
  } finally {
    clearTimeout(id)
  }
}

export default { solveMathFromImage }
