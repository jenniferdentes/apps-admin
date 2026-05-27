import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { APPS, type AppRow } from './data'
import { PROV_CHIPS as PROVISIONING_CHIP, SIGNON_CHIPS as SIGNON_CHIP } from '../../../lib/methodChips'

function MethodChips<T extends string>({
  methods,
  map,
}: {
  methods: T[]
  map: Record<string, { label: string; bg: string; color: string }>
}) {
  if (methods.length === 0) return <Typography variant="body2" color="text.secondary">—</Typography>
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {methods.map((m) => {
        const cfg = map[m]
        return (
          <Chip
            key={m}
            label={cfg.label}
            size="small"
            sx={{
              bgcolor: cfg.bg,
              color: cfg.color,
              fontWeight: 600,
              fontSize: '0.8125rem',
              height: 24,
              borderRadius: 100,
              '& .MuiChip-label': { px: '10px' },
            }}
          />
        )
      })}
    </Box>
  )
}

function AppNameCell({ app }: { app: AppRow }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: app.logoColor,
          fontSize: '0.875rem',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {app.logoInitial}
      </Avatar>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '0.875rem' }}>{app.name}</Typography>
        {app.isCubxApp && (
          <Chip
            label="Cubx App"
            size="small"
            sx={{
              bgcolor: '#E3F2FD',
              color: '#1565C0',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 22,
              borderRadius: 100,
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default function AppsLibrary() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filtered = useMemo(
    () =>
      APPS.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()))
      ),
    [search],
  )

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ p: 4, pb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Page title */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Apps Library
      </Typography>

      {/* Action bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <TextField
          size="small"
          placeholder="Search apps"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          sx={{ width: 320 }}
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
        <Button
          variant="contained"
          onClick={() => navigate('/apps/new')}
          sx={{ minWidth: 140 }}
        >
          Add New App
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {filtered.length} apps
      </Typography>

      {/* Table */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ borderRadius: 1, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Table stickyHeader sx={{ flex: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 280, fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  App Name
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  Categories
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  Provisioning
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  Sign-on
                </TableCell>
                <TableCell sx={{ width: 140, fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  Companies
                </TableCell>
                <TableCell sx={{ width: 110, fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem', bgcolor: '#FCFBFD' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((app) => (
                <TableRow
                  key={app.id}
                  hover
                  sx={{ cursor: 'pointer', '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell sx={{ py: 1.5 }}>
                    <AppNameCell app={app} />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography variant="body2" color="text.primary">
                      {app.categories.join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <MethodChips methods={app.provisioning} map={PROVISIONING_CHIP} />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <MethodChips methods={app.signOn} map={SIGNON_CHIP} />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography variant="body2" color="text.primary">
                      {app.companies}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => navigate(`/apps/${app.id}`)}
                      sx={{ color: '#244B72', fontWeight: 500, p: 0, minWidth: 'auto' }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ borderTop: '1px solid #EAECF0', mt: 'auto' }}
          />
        </TableContainer>
      </Box>
    </Box>
  )
}
