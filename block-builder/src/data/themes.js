export const THEMES = [
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    preview: ['#0f172a', '#1e293b', '#6366f1'],
    vars: {
      '--bg-deep':     '#0f172a',
      '--bg-surface':  '#1e293b',
      '--bg-border':   '#334155',
      '--text-dim':    '#475569',
      '--text-muted':  '#64748b',
      '--text-sub':    '#94a3b8',
      '--text-bright': '#cbd5e1',
      '--text-main':   '#e2e8f0',
      '--accent':      '#6366f1',
    },
  },
  {
    id: 'dark-gray',
    name: 'Dark Gray',
    preview: ['#111111', '#1c1c1e', '#6366f1'],
    vars: {
      '--bg-deep':     '#111111',
      '--bg-surface':  '#1c1c1e',
      '--bg-border':   '#2c2c2e',
      '--text-dim':    '#4a4a4a',
      '--text-muted':  '#636366',
      '--text-sub':    '#8e8e93',
      '--text-bright': '#aeaeb2',
      '--text-main':   '#f2f2f7',
      '--accent':      '#6366f1',
    },
  },
  {
    id: 'warm-dark',
    name: 'Warm Dark',
    preview: ['#1a1209', '#241a0c', '#c8814e'],
    vars: {
      '--bg-deep':     '#1a1209',
      '--bg-surface':  '#241a0c',
      '--bg-border':   '#3b2b16',
      '--text-dim':    '#5c3d1e',
      '--text-muted':  '#7a5230',
      '--text-sub':    '#a87b4f',
      '--text-bright': '#d4a976',
      '--text-main':   '#f0dfc0',
      '--accent':      '#c8814e',
    },
  },
  {
    id: 'light',
    name: 'Light',
    preview: ['#f1f5f9', '#ffffff', '#4f46e5'],
    vars: {
      '--bg-deep':     '#f1f5f9',
      '--bg-surface':  '#ffffff',
      '--bg-border':   '#e2e8f0',
      '--text-dim':    '#94a3b8',
      '--text-muted':  '#64748b',
      '--text-sub':    '#475569',
      '--text-bright': '#1e293b',
      '--text-main':   '#0f172a',
      '--accent':      '#4f46e5',
    },
  },
]

export function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
}
