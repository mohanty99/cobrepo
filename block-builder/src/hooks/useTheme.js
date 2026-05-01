import { useState, useEffect } from 'react'
import { THEMES, applyTheme } from '../data/themes'

export function useTheme() {
  const [themeId, setThemeId] = useState(
    () => localStorage.getItem('bb-theme') ?? 'dark-slate'
  )
  useEffect(() => {
    const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0]
    applyTheme(theme)
    localStorage.setItem('bb-theme', themeId)
  }, [themeId])
  return [themeId, setThemeId]
}
