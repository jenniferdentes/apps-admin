import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'

interface FlowItem {
  label: string
  sublabel?: string
  path: string
  state?: Record<string, unknown>
  logoColor: string
  logoInitial: string
}

interface FlowGroup {
  section: string
  items: FlowItem[]
}

const FLOWS: FlowGroup[] = [
  {
    section: 'Apps',
    items: [
      { label: 'Apps Library',  path: '/apps',      logoColor: '#244B72', logoInitial: 'AL' },
      { label: 'Add New App',   path: '/apps/new',  logoColor: '#512DA8', logoInitial: '+' },
      { label: 'App Detail',    sublabel: 'Docusign', path: '/apps/1', logoColor: '#FF6D00', logoInitial: 'D' },
    ],
  },
  {
    section: 'Clients',
    items: [
      { label: 'Client Apps',     path: '/clients',          logoColor: '#244B72', logoInitial: 'CA' },
      { label: 'Add Client App',  path: '/clients/new-app',  logoColor: '#512DA8', logoInitial: '+' },
      { label: 'App Detail',      sublabel: 'Docusign', path: '/clients/1', logoColor: '#FF6D00', logoInitial: 'D' },
    ],
  },
]

export default function DemoLauncher() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function go(path: string, state?: Record<string, unknown>) {
    navigate(path, { state })
    setOpen(false)
  }

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1.5 }}>

      {/* Panel */}
      {open && (
        <Box sx={{ width: 272, bgcolor: '#fff', borderRadius: 1, boxShadow: '0px 8px 32px rgba(0,0,0,0.16)', border: '1px solid #EAECF0', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid #EAECF0', bgcolor: '#FCFBFD' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#202938' }}>Demo Flows</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ p: 0.25, color: '#64748B' }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <Box sx={{ py: 0.75 }}>
            {FLOWS.map((group, gi) => (
              <Box key={group.section}>
                {gi > 0 && <Divider sx={{ my: 0.75 }} />}
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.07em', textTransform: 'uppercase', px: 2, pb: 0.5, pt: 0.25 }}>
                  {group.section}
                </Typography>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path && !item.state
                  return (
                    <Box key={item.label + item.path} onClick={() => go(item.path, item.state)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 0.875, cursor: 'pointer', bgcolor: isActive ? '#EBF0F5' : 'transparent', '&:hover': { bgcolor: isActive ? '#EBF0F5' : '#F7F8FC' } }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: item.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6875rem', fontWeight: 700, color: '#fff', letterSpacing: '0.01em' }}>
                        {item.logoInitial}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 400, color: '#202938', lineHeight: 1.4 }}>
                          {item.label}
                        </Typography>
                        {item.sublabel && (
                          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.3 }}>
                            {item.sublabel}
                          </Typography>
                        )}
                      </Box>
                      {isActive && (
                        <Box sx={{ ml: 'auto', width: 6, height: 6, borderRadius: '99px', bgcolor: '#244B72', flexShrink: 0 }} />
                      )}
                    </Box>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* FAB */}
      <Box onClick={() => setOpen((prev) => !prev)}
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.875, bgcolor: open ? '#5B21B6' : '#7C3AED', color: '#fff', borderRadius: '100px', px: 2, py: 1.125, cursor: 'pointer', boxShadow: '0px 4px 14px rgba(124,58,237,0.45)', userSelect: 'none', transition: 'background-color 0.15s', '&:hover': { bgcolor: '#5B21B6' } }}>
        <ExploreOutlinedIcon sx={{ fontSize: 18 }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>Demo</Typography>
      </Box>

    </Box>
  )
}
