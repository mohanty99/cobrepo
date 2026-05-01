import { useState, useEffect } from 'react'
import './App.css'

// ─── SVG base ─────────────────────────────────────────────────────
function Ico({ children, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

// ─── Sidebar nav icons ────────────────────────────────────────────
const DashboardsIcon = () => <Ico>
  <rect x="3" y="3" width="8" height="8" rx="1.5"/>
  <rect x="13" y="3" width="8" height="8" rx="1.5"/>
  <rect x="3" y="13" width="8" height="8" rx="1.5"/>
  <rect x="13" y="13" width="8" height="8" rx="1.5"/>
</Ico>

const TasksIcon = () => <Ico>
  <polyline points="9 11 12 14 22 4"/>
  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
</Ico>

const JourneysIcon = () => <Ico>
  <circle cx="5"  cy="12" r="2"/>
  <circle cx="19" cy="12" r="2"/>
  <circle cx="12" cy="5"  r="2"/>
  <path d="M7 12h10M12 7v3M7.5 10.5l4-3.5M16.5 10.5l-4-3.5"/>
</Ico>

const ReviewsIcon = () => <Ico>
  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
  <rect x="9" y="3" width="6" height="4" rx="1"/>
  <line x1="9" y1="12" x2="15" y2="12"/>
  <line x1="9" y1="16" x2="13" y2="16"/>
</Ico>

const EntitiesIcon = () => <Ico>
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 20c0-3.87 3.58-7 8-7s8 3.13 8 7"/>
</Ico>

const ReportsIcon = () => <Ico>
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6"  y1="20" x2="6"  y2="14"/>
  <line x1="2"  y1="20" x2="22" y2="20"/>
</Ico>

const ProfileIcon = () => <Ico>
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="9"  r="3"/>
  <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.832 2.849"/>
</Ico>

const GuideIcon = () => <Ico>
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  <line x1="10" y1="7" x2="16" y2="7"/>
  <line x1="10" y1="11" x2="14" y2="11"/>
</Ico>

const ManagementIcon = () => <Ico>
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</Ico>

const ChevronLeftIcon  = () => <Ico size={16}><polyline points="15 18 9 12 15 6"/></Ico>
const ChevronRightIcon = () => <Ico size={16}><polyline points="9 18 15 12 9 6"/></Ico>

const SettingsIcon = () => <Ico size={18}>
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</Ico>

// ─── Sub-panel section icons ──────────────────────────────────────
const SubRiskIcon = () => <Ico>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</Ico>

const SubPolicyIcon = () => <Ico>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <polyline points="9 12 11 14 15 10"/>
</Ico>

const SubProductsIcon = () => <Ico>
  <rect x="2" y="7" width="20" height="14" rx="2"/>
  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  <line x1="12" y1="12" x2="12" y2="16"/>
  <line x1="10" y1="14" x2="14" y2="14"/>
</Ico>

const SubRefDataIcon = () => <Ico>
  <circle cx="11" cy="11" r="8"/>
  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  <line x1="11" y1="8"  x2="11" y2="14"/>
  <line x1="8"  y1="11" x2="14" y2="11"/>
</Ico>

const SubSecurityIcon = () => <Ico>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <line x1="12" y1="8" x2="12" y2="12"/>
  <line x1="12" y1="16" x2="12.01" y2="16"/>
</Ico>

const SubScreeningIcon = () => <Ico>
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</Ico>

const SubDigitalIdIcon = () => <Ico>
  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <line x1="12" y1="19" x2="12" y2="23"/>
  <line x1="8"  y1="23" x2="16" y2="23"/>
</Ico>

const SubJourneyIcon = () => <Ico>
  <rect x="2"  y="3"  width="6" height="6" rx="1"/>
  <rect x="16" y="3"  width="6" height="6" rx="1"/>
  <rect x="9"  y="15" width="6" height="6" rx="1"/>
  <path d="M5 9v4h14V9"/>
  <line x1="12" y1="13" x2="12" y2="15"/>
</Ico>

const SubConfigExchangeIcon = () => <Ico>
  <polyline points="17 1 21 5 17 9"/>
  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
  <polyline points="7 23 3 19 7 15"/>
  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
</Ico>

const SubTenantIcon = () => <Ico>
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M3 9h18"/>
  <path d="M9 21V9"/>
  <rect x="12" y="13" width="4" height="3" rx="0.5"/>
  <rect x="5"  y="13" width="2" height="2" rx="0.5"/>
  <rect x="5"  y="5"  width="2" height="2" rx="0.5"/>
  <rect x="10" y="5"  width="2" height="2" rx="0.5"/>
  <rect x="15" y="5"  width="2" height="2" rx="0.5"/>
</Ico>

const SubIntegrationsIcon = () => <Ico>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="3"  cy="6"  r="2"/>
  <circle cx="21" cy="6"  r="2"/>
  <circle cx="3"  cy="18" r="2"/>
  <circle cx="21" cy="18" r="2"/>
  <line x1="5"  y1="7"  x2="10" y2="10"/>
  <line x1="19" y1="7"  x2="14" y2="10"/>
  <line x1="5"  y1="17" x2="10" y2="14"/>
  <line x1="19" y1="17" x2="14" y2="14"/>
</Ico>

// ─── Navigation data ──────────────────────────────────────────────
const NAV_MAIN = [
  { id: 'dashboards', label: 'Dashboards', Icon: DashboardsIcon },
  { id: 'tasks',      label: 'Tasks',      Icon: TasksIcon },
  { id: 'journeys',   label: 'Journeys',   Icon: JourneysIcon },
  { id: 'reviews',    label: 'Reviews',    Icon: ReviewsIcon },
  { id: 'entities',   label: 'Entities',   Icon: EntitiesIcon },
  { id: 'reports',    label: 'Reports',    Icon: ReportsIcon },
]

const NAV_BOTTOM = [
  { id: 'profile',    label: 'My Profile',  Icon: ProfileIcon },
  { id: 'guide',      label: 'User Guide',  Icon: GuideIcon },
  { id: 'management', label: 'Management',  Icon: ManagementIcon, hasSubNav: true },
]

const SECTION_INFO = {
  dashboards: { label: 'Dashboards', desc: 'Monitor your key metrics and performance at a glance.' },
  tasks:      { label: 'Tasks',      desc: 'Track and manage your team\'s tasks and assignments.' },
  journeys:   { label: 'Journeys',   desc: 'Design and automate customer journeys and workflows.' },
  reviews:    { label: 'Reviews',    desc: 'Review submissions, approvals, and audit trails.' },
  entities:   { label: 'Entities',   desc: 'Manage contacts, leads, accounts, and relationships.' },
  reports:    { label: 'Reports',    desc: 'Analyse data with detailed reports and visualisations.' },
  profile:    { label: 'My Profile', desc: 'Manage your account settings and preferences.' },
  guide:      { label: 'User Guide', desc: 'Browse guides, tutorials, and documentation.' },
  management: { label: 'Management', desc: 'Configure system settings, roles, and permissions.' },
}

const NAV_ALL = [...NAV_MAIN, ...NAV_BOTTOM]

// ─── Sub-panel data ───────────────────────────────────────────────
const SUBNAV_DATA = {
  management: {
    title: 'Management',
    sections: [
      {
        id: 'risk',
        label: 'Risk',
        Icon: SubRiskIcon,
        links: ['Calculator', 'Risk Impact Assessment', 'Configuration', 'Risk Scoping Rules'],
      },
      {
        id: 'policy',
        label: 'Policy',
        Icon: SubPolicyIcon,
        links: ['Search', 'Configuration', 'Data Groups', 'Shared Data Template', 'API Providers'],
      },
      {
        id: 'products',
        label: 'Products',
        Icon: SubProductsIcon,
        links: ['Requirement Sets'],
      },
      {
        id: 'ref-data',
        label: 'Reference Data',
        Icon: SubRefDataIcon,
        links: ['Editor', 'Document Types', 'Document Requirement Metadata'],
      },
      {
        id: 'security',
        label: 'Security',
        Icon: SubSecurityIcon,
        links: ['Security Configuration', 'Dynamic Assignment Configuration', 'Related Party Access Layer Inheritance'],
      },
      {
        id: 'screening',
        label: 'Screening',
        Icon: SubScreeningIcon,
        links: ['Provider Configuration', 'Screening Scoping Rules'],
      },
      {
        id: 'digital-idv',
        label: 'Digital ID&V',
        Icon: SubDigitalIdIcon,
        links: ['Digital ID&V'],
      },
      {
        id: 'journey',
        label: 'Journey',
        Icon: SubJourneyIcon,
        links: ['Builder', 'Review Journey Scheduling', 'Related Party Scoping Rules', 'Review & Approvals Configuration'],
      },
      {
        id: 'config-exchange',
        label: 'Configuration Exchange',
        Icon: SubConfigExchangeIcon,
        links: ['Imports'],
      },
      {
        id: 'tenant',
        label: 'Tenant',
        Icon: SubTenantIcon,
        links: ['View Configuration'],
      },
      {
        id: 'integrations',
        label: 'Integrations',
        Icon: SubIntegrationsIcon,
        links: ['Integration Hub', 'External Data', 'SuperGraph Editor'],
      },
    ],
  },
}

// ─── Themes ───────────────────────────────────────────────────────
const THEMES = [
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

function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
}

function useTheme() {
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

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [activeNav,    setActiveNav]    = useState('dashboards')
  const [openSubNav,   setOpenSubNav]   = useState(null)
  const [sidebarOpen,  setSidebarOpen]  = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [themeId,      setThemeId]      = useTheme()

  const handleNavClick = (id, hasSubNav) => {
    if (hasSubNav) {
      setOpenSubNav(prev => prev === id ? null : id)
      setActiveNav(id)
    } else {
      setActiveNav(id)
      setOpenSubNav(null)
    }
  }

  const activeInfo = SECTION_INFO[activeNav]
  const ActiveIcon = NAV_ALL.find(n => n.id === activeNav)?.Icon ?? DashboardsIcon

  return (
    <div className="app">
      <TopBar
        settingsOpen={settingsOpen}
        onSettingsToggle={() => setSettingsOpen(o => !o)}
        themeId={themeId}
        onThemeChange={setThemeId}
      />
      <div className="app-body">
        <Sidebar
          open={sidebarOpen}
          activeNav={activeNav}
          openSubNav={openSubNav}
          onNavClick={handleNavClick}
          onToggle={() => setSidebarOpen(o => !o)}
        />
        <SubNavPanel data={openSubNav ? SUBNAV_DATA[openSubNav] : null} />
        <main className="content">
          <ContentPlaceholder info={activeInfo} Icon={ActiveIcon} />
        </main>
      </div>
    </div>
  )
}

// ─── TopBar ───────────────────────────────────────────────────────
function TopBar({ settingsOpen, onSettingsToggle, themeId, onThemeChange }) {
  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <span className="top-bar__logo">⬛</span>
        <span className="top-bar__title">My App</span>
      </div>
      <div className="top-bar__spacer" />
      <div className="top-bar__actions">
        <button
          className={`settings-btn${settingsOpen ? ' settings-btn--active' : ''}`}
          onClick={onSettingsToggle}
          title="Theme settings"
        >
          <SettingsIcon />
        </button>
        {settingsOpen && (
          <SettingsPanel
            themeId={themeId}
            onThemeChange={onThemeChange}
            onClose={onSettingsToggle}
          />
        )}
      </div>
    </header>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────
function Sidebar({ open, activeNav, openSubNav, onNavClick, onToggle }) {
  return (
    <aside className={`sidebar${open ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__toggle-row">
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          title={open ? 'Collapse' : 'Expand'}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>

      <nav className="sidebar__nav">
        {NAV_MAIN.map(({ id, label, Icon }) => (
          <NavButton
            key={id}
            label={label}
            Icon={Icon}
            active={activeNav === id && !openSubNav}
            onClick={() => onNavClick(id, false)}
          />
        ))}
      </nav>

      <div className="sidebar__bottom">
        <div className="sidebar__divider" />
        {NAV_BOTTOM.map(({ id, label, Icon, hasSubNav }) => (
          <NavButton
            key={id}
            label={label}
            Icon={Icon}
            active={activeNav === id}
            subNavOpen={hasSubNav && openSubNav === id}
            onClick={() => onNavClick(id, !!hasSubNav)}
          />
        ))}
      </div>
    </aside>
  )
}

function NavButton({ label, Icon, active, subNavOpen, onClick }) {
  return (
    <button
      className={[
        'nav-btn',
        active      ? 'nav-btn--active'       : '',
        subNavOpen  ? 'nav-btn--subnav-open'  : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      title={label}
    >
      <span className="nav-btn__icon"><Icon /></span>
      <span className="nav-btn__label">{label}</span>
    </button>
  )
}

// ─── Sub-nav panel ────────────────────────────────────────────────
function SubNavPanel({ data }) {
  return (
    <div className={`subnav-wrapper${data ? ' subnav-wrapper--open' : ''}`}>
      <div className="subnav-panel">
        {data && (
          <>
            <div className="subnav-panel__header">
              <h2 className="subnav-panel__title">{data.title}</h2>
            </div>
            <div className="subnav-panel__body">
              {data.sections.map((section, idx) => (
                <div key={section.id} className="subnav-section">
                  <div className="subnav-section__head">
                    <div className="subnav-section__icon-box">
                      <section.Icon />
                    </div>
                    <span className="subnav-section__name">{section.label}</span>
                  </div>
                  <div className="subnav-section__links">
                    {section.links.map(link => (
                      <a
                        key={link}
                        href="#"
                        className="subnav-link"
                        onClick={e => e.preventDefault()}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  {idx < data.sections.length - 1 && (
                    <div className="subnav-section__divider" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Content placeholder ──────────────────────────────────────────
function ContentPlaceholder({ info, Icon }) {
  return (
    <div className="content-placeholder">
      <div className="content-placeholder__icon"><Icon /></div>
      <h1 className="content-placeholder__title">{info.label}</h1>
      <p  className="content-placeholder__desc">{info.desc}</p>
    </div>
  )
}

// ─── Settings panel ───────────────────────────────────────────────
function SettingsPanel({ themeId, onThemeChange, onClose }) {
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
