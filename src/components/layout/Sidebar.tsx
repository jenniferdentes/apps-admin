import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutlined'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'

const NAV_TOP = [
  { icon: <PeopleOutlineIcon fontSize="small" />, label: 'People', path: '/people' },
  { icon: <AttachMoneyIcon fontSize="small" />, label: 'Finance', path: '/finance' },
  { icon: <SecurityOutlinedIcon fontSize="small" />, label: 'Security', path: '/security' },
  { icon: <CorporateFareOutlinedIcon fontSize="small" />, label: 'Apps Library', path: '/apps' },
  { icon: <AssignmentOutlinedIcon fontSize="small" />, label: 'Tasks', path: '/tasks' },
]

const NAV_BOTTOM = [
  { icon: <PersonOutlineIcon fontSize="small" />, label: 'Client Manager', path: '/clients' },
  { icon: <ListOutlinedIcon fontSize="small" />, label: 'Lists', path: '/lists' },
  { icon: <CampaignOutlinedIcon fontSize="small" />, label: 'Announcements', path: '/announcements' },
  { icon: <FlagOutlinedIcon fontSize="small" />, label: 'Flags', path: '/flags' },
]

function NavIcon({ icon, label, path, active }: { icon: React.ReactNode; label: string; path: string; active: boolean }) {
  const navigate = useNavigate()
  return (
    <Tooltip title={label} placement="right">
      <Box
        onClick={() => navigate(path)}
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          cursor: 'pointer',
          color: active ? '#fff' : 'rgba(255,255,255,0.5)',
          bgcolor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' },
          transition: 'all 0.15s',
        }}
      >
        {icon}
      </Box>
    </Tooltip>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <Box
      sx={{
        width: 64,
        flexShrink: 0,
        bgcolor: '#1B2A3B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        gap: 0.5,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#2DD4BF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: '#1B2A3B',
          }}
        >
          C
        </Box>
      </Box>

      {NAV_TOP.map((item) => (
        <NavIcon key={item.label} {...item} active={isActive(item.path)} />
      ))}

      <Box sx={{ flex: 1 }} />

      {NAV_BOTTOM.map((item) => (
        <NavIcon key={item.label} {...item} active={isActive(item.path)} />
      ))}

      {/* User avatar */}
      <Box sx={{ mt: 1 }}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: '#64748B' }}>MO</Avatar>
      </Box>
    </Box>
  )
}
