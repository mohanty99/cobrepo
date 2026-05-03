function Ico({ children, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

export const DashboardsIcon = () => <Ico>
  <rect x="3" y="3" width="8" height="8" rx="1.5"/>
  <rect x="13" y="3" width="8" height="8" rx="1.5"/>
  <rect x="3" y="13" width="8" height="8" rx="1.5"/>
  <rect x="13" y="13" width="8" height="8" rx="1.5"/>
</Ico>

export const TasksIcon = () => <Ico>
  <polyline points="9 11 12 14 22 4"/>
  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
</Ico>

export const JourneysIcon = () => <Ico>
  <circle cx="5"  cy="12" r="2"/>
  <circle cx="19" cy="12" r="2"/>
  <circle cx="12" cy="5"  r="2"/>
  <path d="M7 12h10M12 7v3M7.5 10.5l4-3.5M16.5 10.5l-4-3.5"/>
</Ico>

export const ReviewsIcon = () => <Ico>
  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
  <rect x="9" y="3" width="6" height="4" rx="1"/>
  <line x1="9" y1="12" x2="15" y2="12"/>
  <line x1="9" y1="16" x2="13" y2="16"/>
</Ico>

export const EntitiesIcon = () => <Ico>
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 20c0-3.87 3.58-7 8-7s8 3.13 8 7"/>
</Ico>

export const ReportsIcon = () => <Ico>
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6"  y1="20" x2="6"  y2="14"/>
  <line x1="2"  y1="20" x2="22" y2="20"/>
</Ico>

export const ProfileIcon = () => <Ico>
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="9"  r="3"/>
  <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.832 2.849"/>
</Ico>

export const GuideIcon = () => <Ico>
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  <line x1="10" y1="7" x2="16" y2="7"/>
  <line x1="10" y1="11" x2="14" y2="11"/>
</Ico>

export const ManagementIcon = () => <Ico>
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</Ico>

export const ChevronLeftIcon  = () => <Ico size={16}><polyline points="15 18 9 12 15 6"/></Ico>
export const ChevronRightIcon = () => <Ico size={16}><polyline points="9 18 15 12 9 6"/></Ico>
export const SettingsIcon     = () => <Ico size={18}>
  <circle cx="12" cy="12" r="3"/>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
</Ico>
