import { useState, useMemo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
export interface ClientLike { name: string; users: number }

interface User {
  id: string
  name: string
  initials: string
  avatarColor: string
  company: string
  jobTitle: string
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Micheal Thompson', initials: 'MT', avatarColor: '#26A69A', company: 'Greenwood Medical Center', jobTitle: 'Surgical Technician' },
  { id: '2', name: 'Jessica Stone', initials: 'JS', avatarColor: '#7E57C2', company: 'Riverside Clinic', jobTitle: 'Physician Assistant' },
  { id: '3', name: 'Derek Lee', initials: 'DL', avatarColor: '#D500F9', company: 'Maplewood Hospital', jobTitle: 'Radiology Specialist' },
  { id: '4', name: 'Amanda Foster', initials: 'AF', avatarColor: '#FFA726', company: 'Sunset Health Partners', jobTitle: 'Clinical Coordinator' },
  { id: '5', name: 'Carlos Rivera', initials: 'CR', avatarColor: '#EC407A', company: 'Northshore Medical', jobTitle: 'Healthcare IT Specialist' },
  { id: '6', name: 'Patricia Nguyen', initials: 'PN', avatarColor: '#26A69A', company: 'Valley Primary Care', jobTitle: 'Practice Manager' },
  { id: '7', name: 'Kevin Wright', initials: 'KW', avatarColor: '#7E57C2', company: 'Central Hospital Group', jobTitle: 'Systems Administrator' },
  { id: '8', name: 'Rachel Kim', initials: 'RK', avatarColor: '#D500F9', company: 'Harbor Health Clinic', jobTitle: 'Nurse Practitioner' },
  { id: '9', name: 'Daniel Torres', initials: 'DT', avatarColor: '#FFA726', company: 'Eastside Medical', jobTitle: 'IT Support Analyst' },
  { id: '10', name: 'Laura Bennett', initials: 'LB', avatarColor: '#EC407A', company: 'Pinewood Family Care', jobTitle: 'Patient Services Rep' },
  { id: '11', name: 'Marcus Johnson', initials: 'MJ', avatarColor: '#26A69A', company: 'Summit Healthcare', jobTitle: 'Network Engineer' },
  { id: '12', name: 'Sophia Patel', initials: 'SP', avatarColor: '#7E57C2', company: 'Lakewood Diagnostics', jobTitle: 'Data Analyst' },
  { id: '13', name: 'Tyler Adams', initials: 'TA', avatarColor: '#D500F9', company: 'Metro Surgical Center', jobTitle: 'Security Specialist' },
  { id: '14', name: 'Emily Chen', initials: 'EC', avatarColor: '#FFA726', company: 'Westfield Urgent Care', jobTitle: 'Clinical Informatics' },
  { id: '15', name: 'Brandon Scott', initials: 'BS', avatarColor: '#EC407A', company: 'Clearview Wellness', jobTitle: 'EHR Administrator' },
  { id: '16', name: 'Natalie Flores', initials: 'NF', avatarColor: '#26A69A', company: 'Redwood Medical Grp', jobTitle: 'Telehealth Coordinator' },
  { id: '17', name: 'Andrew Mitchell', initials: 'AM', avatarColor: '#7E57C2', company: 'Oceanside Clinic', jobTitle: 'Compliance Officer' },
  { id: '18', name: 'Samantha Price', initials: 'SP', avatarColor: '#D500F9', company: 'Brightside Healthcare', jobTitle: 'Benefits Coordinator' },
]

interface Props {
  open: boolean
  client: ClientLike | null
  onClose: () => void
}

export default function UsersModal({ open, client, onClose }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => MOCK_USERS.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.company.toLowerCase().includes(search.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(search.toLowerCase())
    ),
    [search],
  )

  function handleClose() {
    setSearch('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}
      slotProps={{ paper: { sx: { width: 600, borderRadius: 1 } } }}>
      <DialogTitle sx={{ pb: 0.5, pt: 2.5, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.3 }}>
              Users{client ? ` - ${client.name}` : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {client?.users ?? 0} users
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleClose} sx={{ mt: -0.5, mr: -0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
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

        <Box sx={{ maxHeight: 420, overflowY: 'auto' }}>
          {filtered.map((user, idx) => (
            <Box key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.25,
                borderBottom: idx < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
              }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: user.avatarColor,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                {user.initials}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.3 }}>
                  {user.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.15 }}>
                  <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466' }}>
                    {user.company}
                  </Typography>
                  <Box sx={{ width: '1px', height: 12, bgcolor: '#D1D5DB', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466' }}>
                    {user.jobTitle}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No users found.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
