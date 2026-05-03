import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { SUBNAV_DATA } from '../data/navItems'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import SubNavPanel from './SubNavPanel'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [themeId, setThemeId] = useTheme()
  const location = useLocation()

  const subNavData = location.pathname === '/management'
    ? SUBNAV_DATA.management
    : null

  return (
    <div className="app">
      <TopBar themeId={themeId} onThemeChange={setThemeId} />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />
        <SubNavPanel data={subNavData} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
