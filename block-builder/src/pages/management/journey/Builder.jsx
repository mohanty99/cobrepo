import { useState } from 'react'

const SCHEMAS = [
  { id: 1,  name: 'Agency Request (v11)',                                 status: 'Published', type: 'Agency Request',                 lastPublished: '24/04/2026' },
  { id: 2,  name: 'Bulk Upload (v11)',                                    status: 'Published', type: 'Maintenance',                    lastPublished: '09/04/2026' },
  { id: 3,  name: 'Client Offboarding (v4)',                             status: 'Published', type: 'Client Offboarding',             lastPublished: '24/04/2026' },
  { id: 4,  name: 'Client Reonboarding (v2)',                            status: 'Published', type: 'Client ReOnboarding',            lastPublished: '05/09/2025' },
  { id: 5,  name: 'Data Deletion (v2)',                                   status: 'Published', type: 'Data Deletion',                  lastPublished: '05/09/2025' },
  { id: 6,  name: 'Joint Account Request (v5)',                          status: 'Published', type: 'Client Onboarding',              lastPublished: '24/04/2026' },
  { id: 7,  name: 'Maintenance (v60)',                                   status: 'Published', type: 'Maintenance',                    lastPublished: '24/04/2026' },
  { id: 8,  name: 'OGS Subscription Journey for Migrated Entities (v1)', status: 'Published', type: 'Ongoing Screening Subscription', lastPublished: '23/09/2025' },
  { id: 9,  name: 'On Demand Screening (v8)',                            status: 'Archived',  type: 'Maintenance',                    lastPublished: null },
  { id: 10, name: 'On Demand Screening (v1)',                            status: 'Published', type: 'On Demand Screening',            lastPublished: '20/03/2026' },
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
      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
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
              <tr
                key={schema.id}
                className={`jb-row${selected.has(schema.id) ? ' jb-row--selected' : ''}`}
              >
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
                  <span className="jb-name">{schema.name}</span>
                </td>
                <td className="jb-td">
                  <span className={`jb-badge jb-badge--${schema.status.toLowerCase()}`}>
                    {schema.status}
                  </span>
                </td>
                <td className="jb-td jb-td--muted">{schema.type}</td>
                <td className="jb-td jb-td--muted">{schema.lastPublished ?? '–'}</td>
              </tr>
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
