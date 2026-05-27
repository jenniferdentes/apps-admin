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

interface AvailableCompany {
  id: string
  name: string
  initials: string
  avatarColor?: string
  industry: string
  location: string
}

const AVAILABLE_COMPANIES: AvailableCompany[] = [
  { id: 'c1',  name: 'Meridian Capital',       initials: 'MC', industry: 'Financial Services',    location: 'New York, NY'      },
  { id: 'c2',  name: 'Pinecrest Logistics',   initials: 'PL', industry: 'Supply Chain',          location: 'Chicago, IL'       },
  { id: 'c3',  name: 'Brightfield Energy',    initials: 'BE', industry: 'Energy & Utilities',    location: 'Houston, TX'       },
  { id: 'c4',  name: 'Crestview Partners',    initials: 'CP', industry: 'Private Equity',        location: 'San Francisco, CA' },
  { id: 'c5',  name: 'Ironclad Systems',      initials: 'IS', industry: 'Cybersecurity',         location: 'Austin, TX'        },
  { id: 'c6',  name: 'Harborview Media',      initials: 'HM', industry: 'Media & Publishing',    location: 'Los Angeles, CA'   },
  { id: 'c7',  name: 'Westgate Retail',       initials: 'WR', industry: 'Retail & Commerce',     location: 'Seattle, WA'       },
  { id: 'c8',  name: 'Solaris Biotech',       initials: 'SB', industry: 'Biotechnology',         location: 'Boston, MA'        },
  { id: 'c9',  name: 'Evergreen Consulting',  initials: 'EC', industry: 'Management Consulting', location: 'Washington, DC'    },
  { id: 'c10', name: 'Atlas Manufacturing',   initials: 'AM', industry: 'Manufacturing',         location: 'Detroit, MI'       },
  { id: 'c11', name: 'Luminary Studios',      initials: 'LS', industry: 'Entertainment',         location: 'New York, NY'      },
  { id: 'c12', name: 'Vanguard Aerospace',    initials: 'VA', industry: 'Aerospace & Defense',   location: 'Dallas, TX'        },
  { id: 'c13', name: 'Cascade Health Group',  initials: 'CH', industry: 'Healthcare',            location: 'Portland, OR'      },
  { id: 'c14', name: 'Prism Analytics',       initials: 'PA', industry: 'Data & Analytics',      location: 'Denver, CO'        },
  { id: 'c15', name: 'Granite Infrastructure',initials: 'GI', industry: 'Construction',          location: 'Phoenix, AZ'       },
  { id: 'c16', name: 'Novus Financial',       initials: 'NF', industry: 'Banking & Finance',     location: 'Charlotte, NC'     },
]

interface Props {
  open: boolean
  appName: string
  onClose: () => void
  onAdd: (companies: AvailableCompany[]) => void
}

export type { AvailableCompany }

export default function AddCompanyModal({ open, appName, onClose, onAdd }: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(
    () => AVAILABLE_COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
    ),
    [search],
  )

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleClose() {
    setSearch('')
    setSelected(new Set())
    onClose()
  }

  function handleAdd() {
    const toAdd = AVAILABLE_COMPANIES.filter((c) => selected.has(c.id))
    onAdd(toAdd)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}
      slotProps={{ paper: { sx: { width: 520, borderRadius: 1 } } }}>
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2.5, borderBottom: '1px solid #EAECF0', bgcolor: '#FCFBFD', borderRadius: '8px 8px 0 0' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
            Add Company to {appName}
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
          {filtered.map((company) => (
            <Box
              key={company.id}
              onClick={() => toggle(company.id)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 0.5, borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: '#F7F8FC' } }}
            >
              <Checkbox
                size="small"
                checked={selected.has(company.id)}
                onChange={() => toggle(company.id)}
                onClick={(e) => e.stopPropagation()}
                sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#244B72' }, p: 0.5, flexShrink: 0 }}
              />
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#90A4AE', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>
                {company.initials}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', lineHeight: 1.57 }}>
                  {company.name}
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466', letterSpacing: '0.2px', lineHeight: 1.2 }}>
                  {company.industry} · {company.location}
                </Typography>
              </Box>
            </Box>
          ))}
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No companies found.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleClose}
          sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: '0px 1px 2px rgba(16,24,40,0.05)' }}>
          Cancel
        </Button>
        <Button variant="contained" disabled={selected.size === 0} onClick={handleAdd}
          sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
          Add {selected.size > 0 ? `${selected.size} ` : ''}Compan{selected.size !== 1 ? 'ies' : 'y'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
