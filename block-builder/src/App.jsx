import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboards from './pages/Dashboards'
import Tasks from './pages/Tasks'
import Journeys from './pages/Journeys'
import Reviews from './pages/Reviews'
import Entities from './pages/Entities'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import UserGuide from './pages/UserGuide'
import ManagementHome from './pages/management/ManagementHome'
import ManagementSubPage from './pages/management/ManagementSubPage'
import JourneyBuilder from './pages/management/journey/Builder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboards" replace />} />
          <Route path="dashboards" element={<Dashboards />} />
          <Route path="tasks"      element={<Tasks />} />
          <Route path="journeys"   element={<Journeys />} />
          <Route path="reviews"    element={<Reviews />} />
          <Route path="entities"   element={<Entities />} />
          <Route path="reports"    element={<Reports />} />
          <Route path="profile"    element={<Profile />} />
          <Route path="guide"      element={<UserGuide />} />
          <Route path="management">
            <Route index element={<ManagementHome />} />
            <Route path="journey/builder" element={<JourneyBuilder />} />
            <Route path=":sectionId/:pageSlug" element={<ManagementSubPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
