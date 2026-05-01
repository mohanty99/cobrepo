import { useState, Fragment } from 'react'

const SCHEMAS = [
  {
    id: 1, name: 'Agency Request (v11)', status: 'Published', type: 'Agency Request', lastPublished: '24/04/2026',
    versions: [
      { label: 'v11 - Agency Request', status: 'Published', activeDates: '24/4/2026 – Present',   created: '24/4/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v10 - Agency Request', status: 'Published', activeDates: '9/9/2025 – 24/4/2026',  created: '9/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v9 - Agency Request',  status: 'Published', activeDates: '19/3/2025 – 9/9/2025',  created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 2, name: 'Bulk Upload (v11)', status: 'Published', type: 'Maintenance', lastPublished: '09/04/2026',
    versions: [
      { label: 'v11 - Bulk Upload', status: 'Published', activeDates: '9/4/2026 – Present',   created: '9/4/2026',  notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v10 - Bulk Upload', status: 'Published', activeDates: '5/9/2025 – 9/4/2026',  created: '5/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v9 - Bulk Upload',  status: 'Published', activeDates: '19/3/2025 – 5/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 3, name: 'Client Offboarding (v4)', status: 'Published', type: 'Client Offboarding', lastPublished: '24/04/2026',
    versions: [
      { label: 'v4 - Client Offboarding', status: 'Published', activeDates: '24/4/2026 – Present',   created: '24/4/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v3 - Client Offboarding', status: 'Published', activeDates: '5/9/2025 – 24/4/2026', created: '5/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v2 - Client Offboarding', status: 'Published', activeDates: '19/3/2025 – 5/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
      { label: 'v1 - Client Offboarding', status: 'Published', activeDates: '23/8/2024 – 19/3/2025', created: '23/8/2024', notes: 'Imported from marketsolutions-cib (Emea1) (...' },
    ],
  },
  {
    id: 4, name: 'Client Reonboarding (v2)', status: 'Published', type: 'Client ReOnboarding', lastPublished: '05/09/2025',
    versions: [
      { label: 'v2 - Client Reonboarding', status: 'Published', activeDates: '5/9/2025 – Present',   created: '5/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v1 - Client Reonboarding', status: 'Published', activeDates: '19/3/2025 – 5/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 5, name: 'Data Deletion (v2)', status: 'Published', type: 'Data Deletion', lastPublished: '05/09/2025',
    versions: [
      { label: 'v2 - Data Deletion', status: 'Published', activeDates: '5/9/2025 – Present',   created: '5/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v1 - Data Deletion', status: 'Published', activeDates: '19/3/2025 – 5/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 6, name: 'Joint Account Request (v5)', status: 'Published', type: 'Client Onboarding', lastPublished: '24/04/2026',
    versions: [
      { label: 'v5 - Joint Account Request', status: 'Published', activeDates: '24/4/2026 – Present',   created: '24/4/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v4 - Joint Account Request', status: 'Published', activeDates: '9/9/2025 – 24/4/2026', created: '9/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v3 - Joint Account Request', status: 'Published', activeDates: '19/3/2025 – 9/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
      { label: 'v2 - Joint Account Request', status: 'Published', activeDates: '23/8/2024 – 19/3/2025', created: '23/8/2024', notes: 'Imported from marketsolutions-cib (Emea1) (...' },
      { label: 'v1 - Joint Account Request', status: 'Published', activeDates: '1/1/2024 – 23/8/2024', created: '1/1/2024',  notes: 'Initial version' },
    ],
  },
  {
    id: 7, name: 'Maintenance (v60)', status: 'Published', type: 'Maintenance', lastPublished: '24/04/2026',
    versions: [
      { label: 'v60 - Maintenance', status: 'Published', activeDates: '24/4/2026 – Present',  created: '24/4/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v59 - Maintenance', status: 'Published', activeDates: '9/9/2025 – 24/4/2026', created: '9/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v58 - Maintenance', status: 'Published', activeDates: '5/4/2025 – 9/9/2025',  created: '5/4/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 8, name: 'OGS Subscription Journey for Migrated Entities (v1)', status: 'Published', type: 'Ongoing Screening Subscription', lastPublished: '23/09/2025',
    versions: [
      { label: 'v1 - OGS Subscription Journey', status: 'Published', activeDates: '23/9/2025 – Present', created: '23/9/2025', notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
    ],
  },
  {
    id: 9, name: 'On Demand Screening (v8)', status: 'Archived', type: 'Maintenance', lastPublished: null,
    versions: [
      { label: 'v8 - On Demand Screening', status: 'Archived',  activeDates: '–',                    created: '24/4/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
      { label: 'v7 - On Demand Screening', status: 'Published', activeDates: '9/9/2025 – 24/4/2026', created: '9/9/2025',  notes: 'Imported from smbc-emea-sdlc-dev (v12) b...' },
      { label: 'v6 - On Demand Screening', status: 'Published', activeDates: '19/3/2025 – 9/9/2025', created: '19/3/2025', notes: 'Imported from smbc-emea-sdlc-dev (v11) b...' },
    ],
  },
  {
    id: 10, name: 'On Demand Screening (v1)', status: 'Published', type: 'On Demand Screening', lastPublished: '20/03/2026',
    versions: [
      { label: 'v1 - On Demand Screening', status: 'Published', activeDates: '20/3/2026 – Present', created: '20/3/2026', notes: 'Imported from smbc-emea-sdlc-dev (v14) b...' },
    ],
  },
]

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function ChevronIcon({ expanded }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.18s' }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

function VersionsPanel({ schema }) {
  const baseName = schema.name.replace(/ \(v\d+\)$/, '')
  const total    = schema.versions.length

  return (
    <div className="jb-expand-panel">
      <h3 className="jb-expand-panel__title">{baseName} Versions</h3>
      <div className="jb-vtable-wrap">
        <table className="jb-vtable">
          <thead>
            <tr>
              <th>Version</th>
              <th>Status</th>
              <th>Active Dates</th>
              <th>Created Date</th>
              <th>Version Notes</th>
            </tr>
          </thead>
          <tbody>
            {schema.versions.map(ver => (
              <tr key={ver.label}>
                <td><span className="jb-vlink">{ver.label}</span></td>
                <td>
                  <span className={`jb-badge jb-badge--${ver.status.toLowerCase()}`}>
                    {ver.status}
                  </span>
                </td>
                <td className="jb-td--muted">{ver.activeDates}</td>
                <td className="jb-td--muted">{ver.created}</td>
                <td className="jb-vnotes">{ver.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="jb-vtable-footer">
        <span>Rows per page: 5</span>
        <span>1–{total} of {total}</span>
        <div className="jb-vtable-footer__nav">
          <button className="jb-page-btn" disabled>‹</button>
          <button className="jb-page-btn" disabled>›</button>
        </div>
      </div>
    </div>
  )
}

export default function Builder() {
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState(new Set())
  const [expanded, setExpanded] = useState(new Set())

  const filtered = SCHEMAS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  )

  const allSelected = filtered.length > 0 && filtered.every(s => selected.has(s.id))

  const toggleAll = () =>
    allSelected
      ? setSelected(new Set())
      : setSelected(new Set(filtered.map(s => s.id)))

  const toggleSelect = id =>
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleExpand = id =>
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="jb-page">
      <div className="jb-header">
        <h1 className="jb-title">Journey Schemas</h1>
        <div className="jb-actions">
          <div className="jb-search">
            <SearchIcon />
            <input
              className="jb-search__input"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="jb-add-btn">
            <PlusIcon /> ADD
          </button>
        </div>
      </div>

      <div className="jb-table-wrap">
        <table className="jb-table">
          <thead>
            <tr>
              <th className="jb-th jb-th--icon" />
              <th className="jb-th jb-th--icon">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th className="jb-th">Name</th>
              <th className="jb-th">Status</th>
              <th className="jb-th">Type</th>
              <th className="jb-th">Last Published On</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(schema => (
              <Fragment key={schema.id}>
                <tr className={[
                  'jb-row',
                  selected.has(schema.id) ? 'jb-row--selected' : '',
                  expanded.has(schema.id) ? 'jb-row--open'     : '',
                ].filter(Boolean).join(' ')}>
                  <td className="jb-td jb-td--icon">
                    <button className="jb-icon-btn" onClick={() => toggleExpand(schema.id)}>
                      <ChevronIcon expanded={expanded.has(schema.id)} />
                    </button>
                  </td>
                  <td className="jb-td jb-td--icon">
                    <input
                      type="checkbox"
                      checked={selected.has(schema.id)}
                      onChange={() => toggleSelect(schema.id)}
                    />
                  </td>
                  <td className="jb-td">
                    <span className="jb-name" onClick={() => toggleExpand(schema.id)}>
                      {schema.name}
                    </span>
                  </td>
                  <td className="jb-td">
                    <span className={`jb-badge jb-badge--${schema.status.toLowerCase()}`}>
                      {schema.status}
                    </span>
                  </td>
                  <td className="jb-td jb-td--muted">{schema.type}</td>
                  <td className="jb-td jb-td--muted">{schema.lastPublished ?? '–'}</td>
                </tr>

                {expanded.has(schema.id) && (
                  <tr className="jb-expand-row">
                    <td colSpan={6} className="jb-expand-cell">
                      <VersionsPanel schema={schema} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="jb-td jb-td--empty">
                  No schemas match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
