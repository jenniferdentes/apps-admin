import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined'
import OverviewTab from './OverviewTab'
import RegisteredClientsTab from './RegisteredClientsTab'
import { getAppDetail, type AppDetail } from './mockData'

export default function AppDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState(0)
  const [app, setApp] = useState<AppDetail | undefined>(() => getAppDetail(id ?? ''))

  if (!app) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>App not found.</Typography>
      </Box>
    )
  }

  function handleUpdate(patch: Partial<AppDetail>) {
    setApp((prev) => prev ? { ...prev, ...patch } : prev)
  }

  return (
    <Box sx={{ p: 4, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        <Link to="/apps" style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
          Apps Library
        </Link>
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>{app.name}</Typography>

      {/* App header card */}
      <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', p: 2.5, mb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 52, height: 52, bgcolor: app.logoColor, fontSize: '1.1rem', fontWeight: 700, borderRadius: 1 }}>
            {app.logoInitial}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{app.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
              <CorporateFareOutlinedIcon sx={{ fontSize: 14, color: '#64748B' }} />
              <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>{app.companies} companies</Typography>
            </Box>
          </Box>
        </Box>
        <IconButton size="small" sx={{ border: '1px solid #E2E8F0', borderRadius: 1.5 }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', px: 0, mt: 2, mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 44,
            '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 400, fontSize: '0.875rem', color: '#64748B', px: 2 },
            '& .Mui-selected': { fontWeight: 600, color: '#1B2A3B' },
            '& .MuiTabs-indicator': { bgcolor: '#1B2A3B', height: 2 },
          }}>
          <Tab label="Overview" />
          <Tab label="Registered Clients" />
        </Tabs>
      </Box>

      {/* Tab content */}
      {tab === 0 && <OverviewTab app={app} onUpdate={handleUpdate} />}
      {tab === 1 && <RegisteredClientsTab appName={app.name} />}
    </Box>
  )
}
