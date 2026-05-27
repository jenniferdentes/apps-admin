import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SearchIcon from '@mui/icons-material/Search'
import UsersModal from '../../apps/AppDetail/UsersModal'
import { PROV_CHIPS as PROV_CHIP, SIGNON_CHIPS as SO_CHIP } from '../../../lib/methodChips'

type ProvMethod = 'SCIM' | 'ChampionTask'
type SOMethod = 'SSO' | 'Manual'

interface ClientApp {
  id: string
  name: string
  logoColor: string
  logoInitial: string
  provisioning: ProvMethod[]
  signOn: SOMethod[]
  users: number
  status: 'Active' | 'Inactive'
}

const CLIENT_APPS: ClientApp[] = [
  { id: '1', name: 'Docusign', logoColor: '#FF6D00', logoInitial: 'D', provisioning: ['SCIM'], signOn: ['SSO'], users: 102, status: 'Active' },
  { id: '2', name: 'Asana', logoColor: '#E8544A', logoInitial: 'A', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 88, status: 'Active' },
  { id: '3', name: 'Zoom', logoColor: '#2D8CFF', logoInitial: 'Z', provisioning: ['SCIM'], signOn: ['SSO'], users: 210, status: 'Active' },
  { id: '4', name: 'Salesforce', logoColor: '#00A1E0', logoInitial: 'S', provisioning: ['SCIM'], signOn: ['SSO'], users: 76, status: 'Active' },
  { id: '5', name: 'Gusto', logoColor: '#F45D48', logoInitial: 'G', provisioning: ['ChampionTask'], signOn: ['Manual'], users: 43, status: 'Active' },
  { id: '6', name: 'Microsoft Teams', logoColor: '#5558AF', logoInitial: 'T', provisioning: ['SCIM'], signOn: ['SSO'], users: 315, status: 'Active' },
  { id: '7', name: 'Slack', logoColor: '#4A154B', logoInitial: 'S', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 298, status: 'Active' },
  { id: '8', name: 'Notion', logoColor: '#191919', logoInitial: 'N', provisioning: ['ChampionTask'], signOn: ['Manual'], users: 57, status: 'Active' },
  { id: '9', name: 'Trello', logoColor: '#0052CC', logoInitial: 'T', provisioning: ['SCIM'], signOn: ['SSO'], users: 34, status: 'Active' },
  { id: '10', name: 'GitHub', logoColor: '#24292E', logoInitial: 'G', provisioning: ['SCIM'], signOn: ['SSO'], users: 128, status: 'Active' },
  { id: '11', name: 'Jira', logoColor: '#0052CC', logoInitial: 'J', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 95, status: 'Active' },
  { id: '12', name: 'Confluence', logoColor: '#0052CC', logoInitial: 'C', provisioning: ['SCIM'], signOn: ['SSO'], users: 81, status: 'Active' },
  { id: '13', name: 'Figma', logoColor: '#F24E1E', logoInitial: 'F', provisioning: ['ChampionTask'], signOn: ['SSO'], users: 47, status: 'Active' },
  { id: '14', name: 'HubSpot', logoColor: '#FF7A59', logoInitial: 'H', provisioning: ['SCIM'], signOn: ['SSO'], users: 63, status: 'Active' },
  { id: '15', name: 'Workday', logoColor: '#E3421B', logoInitial: 'W', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO', 'Manual'], users: 412, status: 'Active' },
]


const HORIZONTAL_TABS = ['Users', 'Companies', 'Sites', 'Locations', 'Apps']

export default function ClientApps() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Apps')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [usersModalApp, setUsersModalApp] = useState<ClientApp | null>(null)

  const filtered = useMemo(
    () => CLIENT_APPS.filter((a) => a.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ p: 4, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#4A5466', fontWeight: 500, mb: 0.5 }}>
            Client Manager
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#202938' }}>
            Finity_Development
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<SettingsOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={{
            borderColor: '#D0D3E8',
            color: '#244B72',
            bgcolor: '#F7F8FC',
            fontWeight: 500,
            fontSize: '0.875rem',
            textTransform: 'none',
            borderRadius: 1,
            px: 2,
            py: 0.75,
            '&:hover': { borderColor: '#244B72', bgcolor: '#EBF0F5' },
          }}
        >
          Client Settings
        </Button>
      </Box>

      {/* Horizontal pill tabs */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', bgcolor: '#fff', borderRadius: 1, p: 0.75, gap: 0.5, border: '1px solid #EAECF0' }}>
          {HORIZONTAL_TABS.map((tab) => {
            const isActive = tab === activeTab
            return (
              <Box
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  bgcolor: isActive ? '#EBF0F5' : 'transparent',
                  color: '#244B72',
                  fontWeight: isActive ? 500 : 500,
                  fontSize: isActive ? '0.875rem' : '1rem',
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  '&:hover': { bgcolor: isActive ? '#EBF0F5' : '#F7F8FC' },
                }}
              >
                {tab}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Content area */}
      <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Filter bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid #EAECF0' }}>
          <TextField
            size="small"
            placeholder="Search apps"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            sx={{ width: 300 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" size="small" onClick={() => navigate('/clients/new-app')}
            sx={{ minWidth: 140, height: 36, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
            Add New App
          </Button>
        </Box>

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {filtered.length} apps
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={0} sx={{ flex: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {['App Name', 'Provisioning', 'Sign-on', 'Users', 'Status', ''].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 500, color: '#64748B', fontSize: '0.8125rem', bgcolor: '#FAFAFA', borderBottom: '1px solid #EAECF0' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((app) => (
                <TableRow key={app.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: app.logoColor, fontSize: '0.875rem', fontWeight: 700, borderRadius: 1.5, flexShrink: 0 }}>
                        {app.logoInitial}
                      </Avatar>
                      <Typography sx={{ fontSize: '0.875rem' }}>{app.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {app.provisioning.map((m) => (
                        <Chip key={m} label={PROV_CHIP[m].label} size="small"
                          sx={{ bgcolor: PROV_CHIP[m].bg, color: PROV_CHIP[m].color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {app.signOn.map((m) => (
                        <Chip key={m} label={SO_CHIP[m].label} size="small"
                          sx={{ bgcolor: SO_CHIP[m].bg, color: SO_CHIP[m].color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography onClick={() => setUsersModalApp(app)}
                      sx={{ fontSize: '0.875rem', color: '#244B72', textDecoration: 'underline', cursor: 'pointer', width: 'fit-content' }}>
                      {app.users}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 10, color: '#16B364' }} />
                      <Typography sx={{ fontSize: '0.875rem' }}>{app.status}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, width: 120 }}>
                    <Button variant="text" size="small" onClick={() => navigate(`/clients/${app.id}`)}
                      sx={{ color: '#244B72', fontWeight: 500, p: 0, minWidth: 'auto', fontSize: '0.875rem' }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ borderTop: '1px solid #EAECF0', mt: 'auto' }}
        />
      </Box>

      <UsersModal
        open={usersModalApp !== null}
        client={usersModalApp}
        onClose={() => setUsersModalApp(null)}
      />
    </Box>
  )
}
