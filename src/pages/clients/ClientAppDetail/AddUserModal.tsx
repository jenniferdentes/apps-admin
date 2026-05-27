import { useState, useMemo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

interface AvailableUser {
  name: string
  initials: string
  avatarColor: string
  jobTitle: string
  site: string
}

const AVAILABLE_USERS: AvailableUser[] = [
  { name: 'Michael Thompson', initials: 'MT', avatarColor: '#7E57C2', jobTitle: 'Software Engineer',    site: 'Creative Sparks'  },
  { name: 'Alicia Ramirez',   initials: 'AR', avatarColor: '#EC407A', jobTitle: 'Product Manager',     site: 'Northshore Hub'   },
  { name: 'David Nguyen',     initials: 'DN', avatarColor: '#26A69A', jobTitle: 'Data Analyst',        site: 'Maplewood Hub'    },
  { name: 'Sophia Patel',     initials: 'SP', avatarColor: '#FFA726', jobTitle: 'UX Designer',         site: 'Riverside Clinic' },
  { name: "Liam O'Connor",    initials: 'LO', avatarColor: '#D500F9', jobTitle: 'DevOps Engineer',     site: 'Creative Sparks'  },
  { name: 'Emily Davis',      initials: 'ED', avatarColor: '#EC407A', jobTitle: 'Marketing Specialist', site: 'Maplewood Hub'   },
  { name: 'James Wilson',     initials: 'JW', avatarColor: '#26A69A', jobTitle: 'Backend Developer',   site: 'Northshore Hub'   },
  { name: 'Olivia Martinez',  initials: 'OM', avatarColor: '#FFA726', jobTitle: 'QA Engineer',         site: 'Creative Sparks'  },
  { name: 'Benjamin Clark',   initials: 'BC', avatarColor: '#7E57C2', jobTitle: 'Scrum Master',        site: 'Riverside Clinic' },
  { name: 'Chloe Kim',        initials: 'CK', avatarColor: '#D500F9', jobTitle: 'Frontend Developer',  site: 'Creative Sparks'  },
  { name: 'Ethan Brown',      initials: 'EB', avatarColor: '#26A69A', jobTitle: 'Security Analyst',    site: 'Maplewood Hub'    },
  { name: 'Isabella Garcia',  initials: 'IG', avatarColor: '#EC407A', jobTitle: 'HR Coordinator',      site: 'Northshore Hub'   },
  { name: 'Noah Hernandez',   initials: 'NH', avatarColor: '#FFA726', jobTitle: 'Financial Analyst',   site: 'Riverside Clinic' },
  { name: 'Mia Anderson',     initials: 'MA', avatarColor: '#7E57C2', jobTitle: 'Content Strategist',  site: 'Creative Sparks'  },
  { name: 'Alexander Scott',  initials: 'AS', avatarColor: '#D500F9', jobTitle: 'Operations Manager',  site: 'Northshore Hub'   },
  { name: 'Jane Cooper',      initials: 'JC', avatarColor: '#26A69A', jobTitle: 'Customer Support',    site: 'Maplewood Hub'    },
]

interface Props {
  open: boolean
  appName: string
  onClose: () => void
}

export default function AddUserModal({ open, appName, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(
    () => AVAILABLE_USERS.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      u.site.toLowerCase().includes(search.toLowerCase()),
    ),
    [search],
  )

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function handleClose() {
    setSearch('')
    setSelected(new Set())
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}
      slotProps={{ paper: { sx: { width: 520, borderRadius: 1 } } }}>
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2.5, borderBottom: '1px solid #EAECF0', bgcolor: '#FCFBFD', borderRadius: '8px 8px 0 0' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
            Add Users to {appName}
          </Typography>
          <IconButton size="small" onClick={handleClose} sx={{ ml: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: '#94A3B8' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ height: 400, overflowY: 'auto' }}>
          {filtered.map((user) => (
            <Box
              key={user.name}
              onClick={() => toggle(user.name)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 0.5, borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: '#F7F8FC' } }}
            >
              <Checkbox
                size="small"
                checked={selected.has(user.name)}
                onChange={() => toggle(user.name)}
                onClick={(e) => e.stopPropagation()}
                sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#244B72' }, p: 0.5, flexShrink: 0 }}
              />
              <Avatar sx={{ width: 32, height: 32, bgcolor: user.avatarColor, fontSize: '0.75rem', fontWeight: 400, flexShrink: 0 }}>
                {user.initials}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', lineHeight: 1.57 }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466', letterSpacing: '0.2px', lineHeight: 1.2 }}>
                  {user.jobTitle} · {user.site}
                </Typography>
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

      <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleClose}
          sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: '0px 1px 2px rgba(16,24,40,0.05)' }}>
          Cancel
        </Button>
        <Button variant="contained" disabled={selected.size === 0} onClick={handleClose}
          sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
          Add {selected.size > 0 ? `${selected.size} ` : ''}User{selected.size !== 1 ? 's' : ''}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
