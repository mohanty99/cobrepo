import { useState, useRef, useCallback, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const TABS      = ['Details', 'Journey', 'Scoping', 'Event Triggers', 'Milestones', 'SLA Configuration']
const PROP_TABS = ['Details', 'Scoping Conditions', 'SLA Configuration']

const JOURNEY_TYPES = [
  'Agency Request', 'Client Onboarding', 'Client Offboarding', 'Client ReOnboarding',
  'Data Deletion', 'Maintenance', 'On Demand Screening', 'Ongoing Screening Subscription',
]
const CHANNEL_TYPES = ['Internal', 'External', 'Portal']

const newStage = () => ({
  id: crypto.randomUUID(),
  title: 'Stage',
  description: '',
  datakey: '',
  processCompletionOrder: 'Sequential',
})

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

/* ── Stage Properties side-panel ─────────────────────────────────── */
function StageProperties({ stage, onUpdate, onClose }) {
  const [propTab, setPropTab] = useState('Details')

  return (
    <div className="sf-props" onMouseDown={e => e.stopPropagation()}>
      <div className="sf-props__header">
        <span className="sf-props__title">Stage Properties</span>
        <button className="sf-props__close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div className="sf-props__tabs">
        {PROP_TABS.map(t => (
          <button key={t}
            className={`sf-props__tab${propTab === t ? ' sf-props__tab--active' : ''}`}
            onClick={() => setPropTab(t)}
          >{t}</button>
        ))}
      </div>

      {propTab === 'Details' ? (
        <div className="sf-props__body">
          <div className="sf-props-grid">
            <div className="sf-props-field">
              <label className="sf-props-label">Stage ID <span className="sf-req">*</span></label>
              <textarea className="sf-props-input sf-props-textarea" readOnly value={stage.id} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Title <span className="sf-req">*</span></label>
              <input className="sf-props-input" value={stage.title}
                onChange={e => onUpdate('title', e.target.value)} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Description</label>
              <input className="sf-props-input" value={stage.description}
                onChange={e => onUpdate('description', e.target.value)} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Stage Datakey</label>
              <input className="sf-props-input" value={stage.datakey}
                onChange={e => onUpdate('datakey', e.target.value)} />
            </div>
          </div>
          <div className="sf-props-field sf-props-field--solo">
            <label className="sf-props-label">Process Completion Order</label>
            <div className="sf-select-wrap sf-props-select-wrap">
              <select className="sf-select" value={stage.processCompletionOrder}
                onChange={e => onUpdate('processCompletionOrder', e.target.value)}>
                <option>Sequential</option>
                <option>Parallel</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="sf-tab-empty"><p>{propTab} configuration coming soon.</p></div>
      )}
    </div>
  )
}

/* ── Journey canvas ───────────────────────────────────────────────── */
function JourneyCanvas({
  started, onStart, pan, setPan, hidden,
  stages, selectedStageId, setSelectedStageId,
  onAddStage, onDeleteStage, onStageUpdate,
}) {
  const [dragging, setDragging] = useState(false)
  const dragOrigin               = useRef(null)

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

  const selectedStage = stages.find(s => s.id === selectedStageId)

  return (
    <div
      className={`sf-canvas${dragging ? ' sf-canvas--dragging' : ''}`}
      style={hidden ? { display: 'none' } : undefined}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* fixed toolbar */}
      <div className="sf-canvas-toolbar" onMouseDown={e => e.stopPropagation()}>
        <button className="sf-canvas-tool" title="Zoom in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Zoom out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Fit / center" onClick={() => setPan({ x: 0, y: 0 })}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Lock">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
        <button className="sf-canvas-tool" title="Help">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
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

      {/* pannable inner canvas */}
      <div
        className="sf-canvas-inner"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        onClick={() => setSelectedStageId(null)}
      >
        {started ? (
          <div className="sf-stage-row" onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
            {stages.map((stage, i) => {
              const isSelected = selectedStageId === stage.id
              const isLast     = i === stages.length - 1
              return (
                <Fragment key={stage.id}>
                  {i > 0 && <div className="sf-connector" />}

                  {isSelected && (
                    <button className="sf-stage-add" title="Add stage before" onClick={() => onAddStage(i)}>
                      <PlusIcon />
                    </button>
                  )}

                  <div
                    className={`sf-stage${isSelected ? ' sf-stage--selected' : ''}`}
                    onClick={() => setSelectedStageId(stage.id)}
                  >
                    <div className="sf-stage__header">
                      <span className="sf-stage__label">{stage.title}</span>
                      {isSelected && (
                        <button className="sf-stage__delete" title="Delete stage"
                          onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); onDeleteStage(stage.id) }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="sf-process" onClick={e => e.stopPropagation()}>
                      <span className="sf-process__label">Process</span>
                      <div className="sf-task">
                        <span className="sf-task__dot" />
                        <span className="sf-task__name">Task</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && isLast && (
                    <button className="sf-stage-add" title="Add stage after" onClick={() => onAddStage(stages.length)}>
                      <PlusIcon />
                    </button>
                  )}
                </Fragment>
              )
            })}
          </div>
        ) : (
          <button className="sf-start-btn" onMouseDown={e => e.stopPropagation()} onClick={onStart}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            START JOURNEY
          </button>
        )}
      </div>

      {selectedStage && (
        <StageProperties
          stage={selectedStage}
          onUpdate={(field, value) => onStageUpdate(selectedStage.id, field, value)}
          onClose={() => setSelectedStageId(null)}
        />
      )}
    </div>
  )
}

/* ── Schema Form page ─────────────────────────────────────────────── */
export default function SchemaForm() {
  const navigate    = useNavigate()
  const importRef   = useRef(null)

  const [activeTab,       setActiveTab]       = useState('Details')
  const [journeyStarted,  setJourneyStarted]  = useState(false)
  const [journeyPan,      setJourneyPan]      = useState({ x: 0, y: 0 })
  const [stages,          setStages]          = useState([])
  const [selectedStageId, setSelectedStageId] = useState(null)
  const [form, setForm] = useState({
    name: '', internalIdentifier: '', journeyType: '',
    channelType: 'Internal', versionNotes: '', enableComments: false,
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleStart = () => {
    setJourneyStarted(true)
    setStages([newStage()])
  }

  const addStage = index => {
    setStages(prev => [...prev.slice(0, index), newStage(), ...prev.slice(index)])
  }

  const deleteStage = id => {
    setStages(prev => {
      const next = prev.filter(s => s.id !== id)
      if (next.length === 0) setJourneyStarted(false)
      return next
    })
    setSelectedStageId(prev => prev === id ? null : prev)
  }

  const updateStageField = (id, field, value) =>
    setStages(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))

  /* ── Export ── */
  const handleExport = () => {
    const payload = {
      version: 1,
      journey: {
        pan: journeyPan,
        stages: stages.map(({ id, title, description, datakey, processCompletionOrder }) => ({
          id, title, description, datakey, processCompletionOrder,
        })),
      },
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'journey-layout.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  /* ── Import ── */
  const handleImportFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result)
        const { stages: s = [], pan = { x: 0, y: 0 } } = data.journey ?? {}
        setStages(s.map(st => ({
          id:                     st.id ?? crypto.randomUUID(),
          title:                  st.title ?? 'Stage',
          description:            st.description ?? '',
          datakey:                st.datakey ?? '',
          processCompletionOrder: st.processCompletionOrder ?? 'Sequential',
        })))
        setJourneyStarted(s.length > 0)
        setJourneyPan(pan)
        setSelectedStageId(null)
        setActiveTab('Journey')
      } catch {
        alert('Invalid journey JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="sf-page">

      <div className="sf-topbar">
        <button className="sf-btn sf-btn--outline" disabled>SAVE</button>
        <button className="sf-btn sf-btn--outline" onClick={() => navigate('/management/journey/builder')}>RESET</button>
        <button className="sf-btn sf-btn--outline" onClick={() => importRef.current?.click()}>IMPORT</button>
        <input ref={importRef} type="file" accept=".json,application/json"
          style={{ display: 'none' }} onChange={handleImportFile} />
        <button className="sf-btn sf-btn--solid" onClick={handleExport}>EXPORT</button>
      </div>

      <div className="sf-tabs">
        {TABS.map(tab => (
          <button key={tab}
            className={`sf-tab${activeTab === tab ? ' sf-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >{tab}</button>
        ))}
      </div>

      {/* always mounted so canvas state survives tab switches */}
      <JourneyCanvas
        started={journeyStarted}
        onStart={handleStart}
        pan={journeyPan}
        setPan={setJourneyPan}
        hidden={activeTab !== 'Journey'}
        stages={stages}
        selectedStageId={selectedStageId}
        setSelectedStageId={setSelectedStageId}
        onAddStage={addStage}
        onDeleteStage={deleteStage}
        onStageUpdate={updateStageField}
      />

      {activeTab === 'Details' ? (
        <div className="sf-form">
          <div className="sf-row">
            <div className="sf-field">
              <label className="sf-label">Name <span className="sf-req">*</span></label>
              <input className="sf-input" value={form.name} onChange={set('name')} autoFocus />
            </div>
            <div className="sf-field">
              <label className="sf-label">Internal Identifier <span className="sf-req">*</span></label>
              <input className="sf-input" value={form.internalIdentifier} onChange={set('internalIdentifier')} />
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
              <textarea className="sf-textarea" value={form.versionNotes} onChange={set('versionNotes')} rows={3} />
            </div>
            <div className="sf-field sf-field--toggle">
              <button type="button" role="switch" aria-checked={form.enableComments}
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
