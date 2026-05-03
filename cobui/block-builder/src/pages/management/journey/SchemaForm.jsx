import { useState, useRef, useCallback, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const TABS           = ['Details', 'Journey', 'Scoping', 'Event Triggers', 'Milestones', 'SLA Configuration']
const STAGE_PROP_TABS = ['Details', 'Scoping Conditions', 'SLA Configuration']
const TASK_PROP_TABS  = ['Details', 'Assignment Conditions', 'Scoping Conditions']

const JOURNEY_TYPES = [
  'Agency Request', 'Client Onboarding', 'Client Offboarding', 'Client ReOnboarding',
  'Data Deletion', 'Maintenance', 'On Demand Screening', 'Ongoing Screening Subscription',
]
const CHANNEL_TYPES = ['Internal', 'External', 'Portal']

const newTask = () => ({
  id: crypto.randomUUID(), title: 'Task', description: '', datakey: '', taskType: '',
})

const newStage = () => ({
  id: crypto.randomUUID(), title: 'Stage', description: '', datakey: '',
  processCompletionOrder: 'Sequential',
  tasks: [newTask()],
})

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)

/* ── Shared prop-panel shell ──────────────────────────────────────── */
function PropPanel({ title, tabs, activeTab, onTabChange, onClose, children }) {
  return (
    <div className="sf-props" onMouseDown={e => e.stopPropagation()}>
      <div className="sf-props__header">
        <span className="sf-props__title">{title}</span>
        <button className="sf-props__close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="sf-props__tabs">
        {tabs.map(t => (
          <button key={t}
            className={`sf-props__tab${activeTab === t ? ' sf-props__tab--active' : ''}`}
            onClick={() => onTabChange(t)}
          >{t}</button>
        ))}
      </div>
      {children}
    </div>
  )
}

/* ── Stage Properties ─────────────────────────────────────────────── */
function StageProperties({ stage, onUpdate, onClose }) {
  const [tab, setTab] = useState('Details')
  return (
    <PropPanel title="Stage Properties" tabs={STAGE_PROP_TABS} activeTab={tab} onTabChange={setTab} onClose={onClose}>
      {tab === 'Details' ? (
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
        <div className="sf-tab-empty"><p>{tab} configuration coming soon.</p></div>
      )}
    </PropPanel>
  )
}

/* ── Task Properties ──────────────────────────────────────────────── */
function TaskProperties({ task, onUpdate, onClose }) {
  const [tab, setTab] = useState('Details')
  return (
    <PropPanel title={`${task.title || 'Task'} Properties`} tabs={TASK_PROP_TABS} activeTab={tab} onTabChange={setTab} onClose={onClose}>
      {tab === 'Details' ? (
        <div className="sf-props__body">
          <div className="sf-props-grid">
            <div className="sf-props-field">
              <label className="sf-props-label">Task ID <span className="sf-req">*</span></label>
              <textarea className="sf-props-input sf-props-textarea" readOnly value={task.id} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Title <span className="sf-req">*</span></label>
              <input className="sf-props-input" value={task.title}
                onChange={e => onUpdate('title', e.target.value)} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Description</label>
              <input className="sf-props-input" value={task.description}
                onChange={e => onUpdate('description', e.target.value)} />
            </div>
            <div className="sf-props-field">
              <label className="sf-props-label">Task DataKey</label>
              <input className="sf-props-input" value={task.datakey}
                onChange={e => onUpdate('datakey', e.target.value)} />
            </div>
          </div>
          <div className="sf-props-section">Task Content</div>
          <div className="sf-props-field sf-props-field--solo">
            <label className="sf-props-label">Task Type <span className="sf-req">*</span></label>
            <div className="sf-select-wrap sf-props-select-wrap">
              <select className="sf-select" value={task.taskType}
                onChange={e => onUpdate('taskType', e.target.value)}>
                <option value="">- select value -</option>
                <option>User Task</option>
                <option>System Task</option>
                <option>Decision</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="sf-tab-empty"><p>{tab} configuration coming soon.</p></div>
      )}
    </PropPanel>
  )
}

/* ── Journey canvas ───────────────────────────────────────────────── */
function JourneyCanvas({
  started, onStart, pan, setPan, hidden,
  stages, selectedStageId, setSelectedStageId,
  selectedTaskKey, setSelectedTaskKey,
  onAddStage, onDeleteStage, onStageUpdate,
  onAddTask, onDeleteTask, onTaskUpdate,
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

  const clearSelection = () => { setSelectedStageId(null); setSelectedTaskKey(null) }

  const selectedStage = selectedStageId
    ? stages.find(s => s.id === selectedStageId)
    : null

  const selectedTask = selectedTaskKey
    ? (() => {
        const [sid, tid] = selectedTaskKey.split('::')
        const stage = stages.find(s => s.id === sid)
        return stage?.tasks.find(t => t.id === tid) ?? null
      })()
    : null

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
        onClick={clearSelection}
      >
        {started ? (
          <div className="sf-stage-row" onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
            {stages.map((stage, si) => {
              const isStageSelected = selectedStageId === stage.id
              const isLast          = si === stages.length - 1
              return (
                <Fragment key={stage.id}>
                  {si > 0 && <div className="sf-connector" />}

                  {isStageSelected && (
                    <button className="sf-stage-add" title="Add stage before" onClick={() => onAddStage(si)}>
                      <PlusIcon />
                    </button>
                  )}

                  <div
                    className={`sf-stage${isStageSelected ? ' sf-stage--selected' : ''}`}
                    onClick={() => { setSelectedStageId(stage.id); setSelectedTaskKey(null) }}
                  >
                    <div className="sf-stage__header">
                      <span className="sf-stage__label">{stage.title}</span>
                      {isStageSelected && (
                        <button className="sf-stage__delete" title="Delete stage"
                          onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); onDeleteStage(stage.id) }}>
                          <TrashIcon />
                        </button>
                      )}
                    </div>

                    {/* process + tasks */}
                    <div className="sf-process" onClick={e => e.stopPropagation()}>
                      <span className="sf-process__label">Process</span>
                      {stage.tasks.map((task, ti) => {
                        const taskKey    = `${stage.id}::${task.id}`
                        const isTaskSel  = selectedTaskKey === taskKey
                        return (
                          <div key={task.id} className="sf-task-outer">
                            {isTaskSel && (
                              <button className="sf-task-add-vert sf-task-add-vert--above"
                                title="Add task above"
                                onClick={() => onAddTask(stage.id, ti)}>
                                <PlusIcon />
                              </button>
                            )}
                            <div
                              className={`sf-task${isTaskSel ? ' sf-task--selected' : ''}`}
                              onClick={() => { setSelectedTaskKey(taskKey); setSelectedStageId(null) }}
                            >
                              <span className="sf-task__dot" />
                              <span className="sf-task__name">{task.title}</span>
                              {isTaskSel && (
                                <button className="sf-task__delete" title="Delete task"
                                  onMouseDown={e => e.stopPropagation()}
                                  onClick={e => { e.stopPropagation(); onDeleteTask(stage.id, task.id) }}>
                                  <TrashIcon />
                                </button>
                              )}
                            </div>
                            {isTaskSel && (
                              <button className="sf-task-add-vert sf-task-add-vert--below"
                                title="Add task below"
                                onClick={() => onAddTask(stage.id, ti + 1)}>
                                <PlusIcon />
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {isStageSelected && isLast && (
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

      {/* properties panel — fixed to canvas viewport */}
      {selectedTask && (
        <TaskProperties
          task={selectedTask}
          onUpdate={(field, value) => {
            const [sid, tid] = selectedTaskKey.split('::')
            onTaskUpdate(sid, tid, field, value)
          }}
          onClose={() => setSelectedTaskKey(null)}
        />
      )}
      {selectedStage && !selectedTask && (
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
  const navigate   = useNavigate()
  const importRef  = useRef(null)

  const [activeTab,        setActiveTab]        = useState('Details')
  const [journeyStarted,   setJourneyStarted]   = useState(false)
  const [journeyPan,       setJourneyPan]       = useState({ x: 0, y: 0 })
  const [stages,           setStages]           = useState([])
  const [selectedStageId,  setSelectedStageId]  = useState(null)
  const [selectedTaskKey,  setSelectedTaskKey]  = useState(null)
  const [form, setForm] = useState({
    name: '', internalIdentifier: '', journeyType: '',
    channelType: 'Internal', versionNotes: '', enableComments: false,
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleStart = () => { setJourneyStarted(true); setStages([newStage()]) }

  const addStage = index => setStages(prev =>
    [...prev.slice(0, index), newStage(), ...prev.slice(index)])

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

  const addTask = (stageId, index) =>
    setStages(prev => prev.map(s => s.id === stageId
      ? { ...s, tasks: [...s.tasks.slice(0, index), newTask(), ...s.tasks.slice(index)] }
      : s))

  const deleteTask = (stageId, taskId) =>
    setStages(prev => prev.map(s => s.id === stageId
      ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) }
      : s))

  const updateTaskField = (stageId, taskId, field, value) =>
    setStages(prev => prev.map(s => s.id === stageId
      ? { ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t) }
      : s))

  /* ── Export ── */
  const handleExport = () => {
    const payload = {
      version: 1,
      journey: {
        pan: journeyPan,
        stages: stages.map(({ id, title, description, datakey, processCompletionOrder, tasks }) => ({
          id, title, description, datakey, processCompletionOrder,
          tasks: tasks.map(({ id: tid, title: tt, description: td, datakey: tdk, taskType }) => ({
            id: tid, title: tt, description: td, datakey: tdk, taskType,
          })),
        })),
      },
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'journey-layout.json' })
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
          id: st.id ?? crypto.randomUUID(),
          title: st.title ?? 'Stage',
          description: st.description ?? '',
          datakey: st.datakey ?? '',
          processCompletionOrder: st.processCompletionOrder ?? 'Sequential',
          tasks: (st.tasks ?? [newTask()]).map(t => ({
            id: t.id ?? crypto.randomUUID(),
            title: t.title ?? 'Task',
            description: t.description ?? '',
            datakey: t.datakey ?? '',
            taskType: t.taskType ?? '',
          })),
        })))
        setJourneyStarted(s.length > 0)
        setJourneyPan(pan)
        setSelectedStageId(null)
        setSelectedTaskKey(null)
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

      <JourneyCanvas
        started={journeyStarted}
        onStart={handleStart}
        pan={journeyPan}
        setPan={setJourneyPan}
        hidden={activeTab !== 'Journey'}
        stages={stages}
        selectedStageId={selectedStageId}
        setSelectedStageId={setSelectedStageId}
        selectedTaskKey={selectedTaskKey}
        setSelectedTaskKey={setSelectedTaskKey}
        onAddStage={addStage}
        onDeleteStage={deleteStage}
        onStageUpdate={updateStageField}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onTaskUpdate={updateTaskField}
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
