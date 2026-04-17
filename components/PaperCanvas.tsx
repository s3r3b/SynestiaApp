import React, { useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Canvas, Path as SkPath, Skia, PaintStyle, vec } from '@shopify/react-native-skia'
import { useTouchHandler, TouchInfo } from '@shopify/react-native-skia'
import useSettingsStore from '../store/useSettingsStore'
import { useMemo } from 'react'

type Point = { x: number; y: number; force?: number }

type Stroke = {
  id: string
  points: Point[]
  color: string
  strokeWidth: number
  skPath?: any
}

const mapForceToWidth = (force: number = 0.5, pressureCurve: number = 50) => {
  const min = 1
  const max = 8
  const exponent = Math.max(0.1, pressureCurve / 50) // 0.1 .. 2
  const scaled = min + Math.pow(force, exponent) * (max - min)
  return Math.max(min, Math.min(max, scaled))
}

const isPalm = (t: TouchInfo) => {
  if (typeof t.force === 'number' && t.force > 0.6) return false
  if (typeof t.radiusX === 'number' && typeof t.radiusY === 'number') {
    const avg = (t.radiusX + t.radiusY) / 2
    return avg > 40
  }
  return false
}

const PaperCanvas: React.FC = () => {
  const strokesRef = useRef<Stroke[]>([])
  const activeStrokeRef = useRef<Stroke | null>(null)
  const [, setVersion] = useState(0)

  const redraw = () => setVersion(v => v + 1)

  const texture = useSettingsStore(s => s.texture)

  const gridPaths = useMemo(() => {
    const paths: any[] = []
    const size = 1000
    const step = 40
    for (let x = 0; x <= size; x += step) {
      const p = Skia.Path.Make()
      p.moveTo(x, 0)
      p.lineTo(x, size)
      paths.push(p)
    }
    for (let y = 0; y <= size; y += step) {
      const p = Skia.Path.Make()
      p.moveTo(0, y)
      p.lineTo(size, y)
      paths.push(p)
    }
    return paths
  }, [])

  const pressureCurve = useSettingsStore(s => s.pressureCurve)
  const noiseLevel = useSettingsStore(s => s.noiseLevel)

  const addPointToActive = (p: Point) => {
    if (!activeStrokeRef.current) return
    // apply small noise jitter based on noiseLevel
    const jitter = (noiseLevel / 100) * 2 // max 2px jitter
    const nx = p.x + (Math.random() * 2 - 1) * jitter
    const ny = p.y + (Math.random() * 2 - 1) * jitter
    const force = typeof p.force === 'number' ? p.force : 0.5
    activeStrokeRef.current.points.push({ x: nx, y: ny, force })
    activeStrokeRef.current.strokeWidth = mapForceToWidth(force, pressureCurve)
    redraw()
  }

  const touchHandler = useTouchHandler({
    onStart: (t: TouchInfo) => {
      if (t.type !== 'start') return
      if (t.pointerType && t.pointerType !== 'stylus') return
      if (isPalm(t)) return
      const force = typeof t.force === 'number' ? t.force : 0.5
      const stroke: Stroke = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        points: [{ x: t.x, y: t.y, force }],
        color: '#111',
        strokeWidth: mapForceToWidth(force, pressureCurve)
      }
      activeStrokeRef.current = stroke
      strokesRef.current.push(stroke)
      redraw()
    },
    onActive: (t: TouchInfo) => {
      if (!activeStrokeRef.current) return
      if (t.pointerType && t.pointerType !== 'stylus') return
      if (isPalm(t)) return
      const force = typeof t.force === 'number' ? t.force : 0.5
      addPointToActive({ x: t.x, y: t.y, force })
    },
    onEnd: (t: TouchInfo) => {
      activeStrokeRef.current = null
      redraw()
    }
  })

  const renderSkPath = (points: Point[]) => {
    if (!points || points.length === 0) return Skia.Path.Make()
    const p = Skia.Path.Make()
    const first = points[0]
    p.moveTo(first.x, first.y)
    for (let i = 1; i < points.length; i++) p.lineTo(points[i].x, points[i].y)
    return p
  }

  return (
    <View style={styles.container} {...(touchHandler as any)}>
      <Canvas style={styles.canvas}>
        {/* Background texture */}
        {texture === 'pure-matte' && null}
        {texture === 'vintage-fiber' && (
          // subtle grain: many thin semi-transparent lines
          Array.from({ length: 120 }).map((_, i) => {
            const p = Skia.Path.Make()
            const y = (i / 120) * 1000
            p.moveTo(0, y)
            p.quadTo(250, y + (i % 5 - 2), 1000, y)
            return <SkPath key={`vf-${i}`} path={p} color="#EDE6DD" style={PaintStyle.Stroke} strokeWidth={0.6} />
          })
        )}
        {texture === 'draft-grid' && gridPaths.map((p, idx) => (
          <SkPath key={`g-${idx}`} path={p} color="#E7E7E7" style={PaintStyle.Stroke} strokeWidth={0.8} />
        ))}

        {strokesRef.current.map(s => {
          const path = renderSkPath(s.points)
          return <SkPath key={s.id} path={path} color={s.color} style={PaintStyle.Stroke} strokeWidth={s.strokeWidth} />
        })}
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: { flex: 1, backgroundColor: '#F4F4F0' }
})

export default PaperCanvas
