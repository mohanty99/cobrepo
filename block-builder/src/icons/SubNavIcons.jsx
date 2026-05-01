function Ico({ children }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

export const SubRiskIcon = () => <Ico>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9"  x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</Ico>

export const SubPolicyIcon = () => <Ico>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <polyline points="9 12 11 14 15 10"/>
</Ico>

export const SubProductsIcon = () => <Ico>
  <rect x="2" y="7" width="20" height="14" rx="2"/>
  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  <line x1="12" y1="12" x2="12" y2="16"/>
  <line x1="10" y1="14" x2="14" y2="14"/>
</Ico>

export const SubRefDataIcon = () => <Ico>
  <circle cx="11" cy="11" r="8"/>
  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  <line x1="11" y1="8"  x2="11" y2="14"/>
  <line x1="8"  y1="11" x2="14" y2="11"/>
</Ico>

export const SubSecurityIcon = () => <Ico>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <line x1="12" y1="8"  x2="12" y2="12"/>
  <line x1="12" y1="16" x2="12.01" y2="16"/>
</Ico>

export const SubScreeningIcon = () => <Ico>
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</Ico>

export const SubDigitalIdIcon = () => <Ico>
  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <line x1="12" y1="19" x2="12" y2="23"/>
  <line x1="8"  y1="23" x2="16" y2="23"/>
</Ico>

export const SubJourneyIcon = () => <Ico>
  <rect x="2"  y="3"  width="6" height="6" rx="1"/>
  <rect x="16" y="3"  width="6" height="6" rx="1"/>
  <rect x="9"  y="15" width="6" height="6" rx="1"/>
  <path d="M5 9v4h14V9"/>
  <line x1="12" y1="13" x2="12" y2="15"/>
</Ico>

export const SubConfigExchangeIcon = () => <Ico>
  <polyline points="17 1 21 5 17 9"/>
  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
  <polyline points="7 23 3 19 7 15"/>
  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
</Ico>

export const SubTenantIcon = () => <Ico>
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M3 9h18"/>
  <path d="M9 21V9"/>
  <rect x="12" y="13" width="4" height="3" rx="0.5"/>
  <rect x="5"  y="13" width="2" height="2" rx="0.5"/>
  <rect x="5"  y="5"  width="2" height="2" rx="0.5"/>
  <rect x="10" y="5"  width="2" height="2" rx="0.5"/>
  <rect x="15" y="5"  width="2" height="2" rx="0.5"/>
</Ico>

export const SubIntegrationsIcon = () => <Ico>
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
