import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import AddIcon from '@mui/icons-material/Add'
import { REGISTERED_CLIENTS, type RegisteredClient } from './mockData'
import UsersModal from './UsersModal'
import AddCompanyModal from './AddCompanyModal'
import { PROV_CHIPS as PROV_CHIP, SIGNON_CHIPS as SO_CHIP } from '../../../lib/methodChips'

function MethodChips({ methods, map }: { methods: string[]; map: Record<string, { label: string; bg: string; color: string }> }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {methods.map((m) => {
        const cfg = map[m]
        if (!cfg) return null
        return (
          <Chip key={m} label={cfg.label} size="small"
            sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, width: 'fit-content', '& .MuiChip-label': { px: '10px' } }} />
        )
      })}
    </Box>
  )
}

export default function RegisteredClientsTab({ appName, appId }: { appName: string; appId: string }) {
  const [clients] = useState<RegisteredClient[]>(REGISTERED_CLIENTS)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [usersModalClient, setUsersModalClient] = useState<RegisteredClient | null>(null)
  const [addCompanyOpen, setAddCompanyOpen] = useState(false)

  const filtered = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [clients, search],
  )
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)


  return (
    <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', overflow: 'hidden' }}>
      {/* Filter bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderBottom: '1px solid #EAECF0' }}>
        <TextField size="small" placeholder="Search" value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          sx={{ width: 300 }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} /></InputAdornment> } }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddCompanyOpen(true)}
          sx={{ minWidth: 140, height: 36, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
          Add Company
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#FAFAFA' }}>
              {['Company Name', 'Provisioning', 'Sign-on', 'Users', 'Date Added', 'Status', ''].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 500, color: '#64748B', fontSize: '0.8125rem', py: 1.25, borderBottom: '1px solid #EAECF0' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((client) => (
              <TableRow key={client.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                <TableCell sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', fontWeight: 600, bgcolor: '#90A4AE', color: '#fff', flexShrink: 0 }}>
                      {client.initials}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{client.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <MethodChips methods={client.provisioning} map={PROV_CHIP} />
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <MethodChips methods={client.signOn} map={SO_CHIP} />
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography
                    onClick={() => setUsersModalClient(client)}
                    sx={{ fontSize: '0.875rem', textDecoration: 'underline', cursor: 'pointer', color: '#1B2A3B', width: 'fit-content' }}>
                    {client.users}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>{client.dateAdded}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <FiberManualRecordIcon sx={{ fontSize: 10, color: '#22C55E' }} />
                    <Typography sx={{ fontSize: '0.875rem' }}>{client.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1.5 }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination component="div" count={filtered.length} page={page} rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ borderTop: '1px solid #EAECF0' }}
      />

      <UsersModal
        open={usersModalClient !== null}
        client={usersModalClient}
        onClose={() => setUsersModalClient(null)}
      />

      <AddCompanyModal
        open={addCompanyOpen}
        appName={appName}
        appId={appId}
        onClose={() => setAddCompanyOpen(false)}
      />
    </Box>
  )
}
