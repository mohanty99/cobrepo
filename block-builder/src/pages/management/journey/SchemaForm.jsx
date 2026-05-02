import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const TABS = ['Details', 'Journey', 'Scoping', 'Event Triggers', 'Milestones', 'SLA Configuration']

const JOURNEY_TYPES = [
  'Agency Request', 'Client Onboarding', 'Client Offboarding', 'Client ReOnboarding',
  'Data Deletion', 'Maintenance', 'On Demand Screening', 'Ongoing Screening Subscription',
]

const CHANNEL_TYPES = ['Internal', 'External', 'Portal']

function JourneyCanvas() {
  const [pan, setPan]         = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOrigin              = useRef(null)

  const onMouseDown = useCallback(e => {
    if (e.button !== 0) return
    setDragging(true)
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y }
  }, [pan])

  const onMouseMove = useCallback(e => {
    if (!dragging || !dragOrigin.current) return
    const { mx, my, px, py } = dragOrigin.current
    setPan({ x: px + e.clientX - mx, y: py + e.clientY - my })
  }, [dragging])

  const onMouseUp = useCallback(() => setDragging(false), [])

  return (
    <div
      className={`sf-canvas${dragging ? ' sf-canvas--dragging' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* toolbar */}
      <div className="sf-canvas-toolbar" onMouseDown={e => e.stopPropagation()}>
        <button className="sf-canvas-tool" title="Zoom in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Zoom out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Fit / center" onClick={() => setPan({ x: 0, y: 0 })}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Lock">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Help">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>
        <div className="sf-canvas-tool-sep" />
        <button className="sf-canvas-tool" title="Previous">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Next">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* pannable inner canvas — button lives here so it moves with pan */}
      <div
        className="sf-canvas-inner"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        <button className="sf-start-btn" onMouseDown={e => e.stopPropagation()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          START JOURNEY
        </button>
      </div>
    </div>
  )
}

export default function SchemaForm() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Details')
  const [form, setForm] = useState({
    name: '',
    internalIdentifier: '',
    journeyType: '',
    channelType: 'Internal',
    versionNotes: '',
    enableComments: false,
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div className="sf-page">

      <div className="sf-topbar">
        <button className="sf-btn sf-btn--outline" disabled>SAVE</button>
        <button className="sf-btn sf-btn--outline" onClick={() => navigate('/management/journey/builder')}>RESET</button>
        <button className="sf-btn sf-btn--solid">EXPORT</button>
      </div>

      <div className="sf-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`sf-tab${activeTab === tab ? ' sf-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Journey' ? (
        <JourneyCanvas />
      ) : activeTab === 'Details' ? (
        <div className="sf-form">
          <div className="sf-row">
            <div className="sf-field">
              <label className="sf-label">Name <span className="sf-req">*</span></label>
              <input
                className="sf-input"
                value={form.name}
                onChange={set('name')}
                autoFocus
              />
            </div>
            <div className="sf-field">
              <label className="sf-label">Internal Identifier <span className="sf-req">*</span></label>
              <input
                className="sf-input"
                value={form.internalIdentifier}
                onChange={set('internalIdentifier')}
              />
            </div>
            <div className="sf-field">
              <label className="sf-label">Journey Type <span className="sf-req">*</span></label>
              <div className="sf-select-wrap">
                <select className="sf-select" value={form.journeyType} onChange={set('journeyType')}>
                  <option value="">- select value -</option>
                  {JOURNEY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="sf-row">
            <div className="sf-field">
              <label className="sf-label">Channel Type <span className="sf-req">*</span></label>
              <div className="sf-select-wrap">
                <select className="sf-select" value={form.channelType} onChange={set('channelType')}>
                  {CHANNEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="sf-field">
              <label className="sf-label">Version Notes</label>
              <textarea
                className="sf-textarea"
                value={form.versionNotes}
                onChange={set('versionNotes')}
                rows={3}
              />
            </div>
            <div className="sf-field sf-field--toggle">
              <button
                type="button"
                role="switch"
                aria-checked={form.enableComments}
                className={`sf-toggle${form.enableComments ? ' sf-toggle--on' : ''}`}
                onClick={() => setForm(f => ({ ...f, enableComments: !f.enableComments }))}
              />
              <span className="sf-toggle-label">
                Enable optional capture of comments when reopening completed tasks
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="sf-tab-empty">
          <p>{activeTab} configuration coming soon.</p>
        </div>
      )}

    </div>
  )
}
