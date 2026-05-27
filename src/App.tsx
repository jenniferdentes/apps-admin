import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import AppsLibrary from './pages/apps/AppsLibrary'
import AddNewApp from './pages/apps/AddNewApp'
import AppDetailPage from './pages/apps/AppDetail'
import ClientApps from './pages/clients/ClientApps'
import ClientAppDetail from './pages/clients/ClientAppDetail'
import AddClientApp from './pages/clients/AddClientApp'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/apps" replace />} />
        <Route path="/apps" element={<AppsLibrary />} />
        <Route path="/apps/new" element={<AddNewApp />} />
        <Route path="/apps/:id" element={<AppDetailPage />} />
        <Route path="/clients" element={<ClientApps />} />
        <Route path="/clients/new-app" element={<AddClientApp />} />
        <Route path="/clients/:appId" element={<ClientAppDetail />} />
      </Route>
    </Routes>
  )
}
