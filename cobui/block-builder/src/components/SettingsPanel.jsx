import { THEMES } from '../data/themes'

export default function SettingsPanel({ themeId, onThemeChange, onClose }) {
  return (
    <div className="settings-panel">
      <div className="settings-panel__header">
        <span className="settings-panel__title">Theme</span>
        <button className="settings-panel__close" onClick={onClose}>×</button>
      </div>
      <div className="settings-panel__body">
        <div className="theme-grid">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              className={`theme-card${themeId === theme.id ? ' theme-card--active' : ''}`}
              onClick={() => onThemeChange(theme.id)}
              title={theme.name}
            >
              <div className="theme-card__preview">
                {theme.preview.map((color, i) => (
                  <div key={i} className="theme-card__swatch" style={{ background: color }} />
                ))}
              </div>
              <span className="theme-card__name">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
