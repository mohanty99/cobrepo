import { useState } from 'react'
import { SettingsIcon } from '../icons/NavIcons'
import SettingsPanel from './SettingsPanel'

export default function TopBar({ themeId, onThemeChange }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <span className="top-bar__logo">⬛</span>
        <span className="top-bar__title">My App</span>
      </div>
      <div className="top-bar__spacer" />
      <div className="top-bar__actions">
        <button
          className={`settings-btn${open ? ' settings-btn--active' : ''}`}
          onClick={() => setOpen(o => !o)}
          title="Theme settings"
        >
          <SettingsIcon />
        </button>
        {open && (
          <SettingsPanel
            themeId={themeId}
            onThemeChange={onThemeChange}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </header>
  )
}
