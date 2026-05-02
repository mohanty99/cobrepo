import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TABS = ['Details', 'Journey', 'Scoping', 'Event Triggers', 'Milestones', 'SLA Configuration']

const JOURNEY_TYPES = [
  'Agency Request', 'Client Onboarding', 'Client Offboarding', 'Client ReOnboarding',
  'Data Deletion', 'Maintenance', 'On Demand Screening', 'Ongoing Screening Subscription',
]

const CHANNEL_TYPES = ['Internal', 'External', 'Portal']

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

      {activeTab === 'Details' ? (
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
