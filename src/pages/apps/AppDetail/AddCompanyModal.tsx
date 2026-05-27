import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import CheckIcon from '@mui/icons-material/Check'

export interface AvailableCompany {
  id: string
  name: string
  initials: string
  avatarColor?: string
  industry: string
  location: string
}

const AVAILABLE_COMPANIES: AvailableCompany[] = [
  { id: 'c1',  name: 'Meridian Capital',        initials: 'MC', industry: 'Financial Services',    location: 'New York, NY'      },
  { id: 'c2',  name: 'Pinecrest Logistics',      initials: 'PL', industry: 'Supply Chain',          location: 'Chicago, IL'       },
  { id: 'c3',  name: 'Brightfield Energy',       initials: 'BE', industry: 'Energy & Utilities',    location: 'Houston, TX'       },
  { id: 'c4',  name: 'Crestview Partners',       initials: 'CP', industry: 'Private Equity',        location: 'San Francisco, CA' },
  { id: 'c5',  name: 'Ironclad Systems',         initials: 'IS', industry: 'Cybersecurity',         location: 'Austin, TX'        },
  { id: 'c6',  name: 'Harborview Media',         initials: 'HM', industry: 'Media & Publishing',    location: 'Los Angeles, CA'   },
  { id: 'c7',  name: 'Westgate Retail',          initials: 'WR', industry: 'Retail & Commerce',     location: 'Seattle, WA'       },
  { id: 'c8',  name: 'Solaris Biotech',          initials: 'SB', industry: 'Biotechnology',         location: 'Boston, MA'        },
  { id: 'c9',  name: 'Evergreen Consulting',     initials: 'EC', industry: 'Management Consulting', location: 'Washington, DC'    },
  { id: 'c10', name: 'Atlas Manufacturing',      initials: 'AM', industry: 'Manufacturing',         location: 'Detroit, MI'       },
  { id: 'c11', name: 'Luminary Studios',         initials: 'LS', industry: 'Entertainment',         location: 'New York, NY'      },
  { id: 'c12', name: 'Vanguard Aerospace',       initials: 'VA', industry: 'Aerospace & Defense',   location: 'Dallas, TX'        },
  { id: 'c13', name: 'Cascade Health Group',     initials: 'CH', industry: 'Healthcare',            location: 'Portland, OR'      },
  { id: 'c14', name: 'Prism Analytics',          initials: 'PA', industry: 'Data & Analytics',      location: 'Denver, CO'        },
  { id: 'c15', name: 'Granite Infrastructure',   initials: 'GI', industry: 'Construction',          location: 'Phoenix, AZ'       },
  { id: 'c16', name: 'Novus Financial',          initials: 'NF', industry: 'Banking & Finance',     location: 'Charlotte, NC'     },
]

interface Props {
  open: boolean
  appName: string
  appId: string
  onClose: () => void
}

export default function AddCompanyModal({ open, appName, appId, onClose }: Props) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(
    () => AVAILABLE_COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
    ),
    [search],
  )

  function handleClose() {
    setSearch('')
    setSelectedId(null)
    onClose()
  }

  function handleContinue() {
    if (!selectedId) return
    const company = AVAILABLE_COMPANIES.find((c) => c.id === selectedId)
    navigate('/clients/new-app', { state: { appId, companyId: selectedId, companyName: company?.name } })
    handleClose()
  }

  const selectedCompany = AVAILABLE_COMPANIES.find((c) => c.id === selectedId)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}
      slotProps={{ paper: { sx: { width: 520, borderRadius: 1 } } }}>
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2.5, borderBottom: '1px solid #EAECF0', bgcolor: '#FCFBFD', borderRadius: '8px 8px 0 0' }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
              Add Company to {appName}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mt: 0.25 }}>
              Select a company to configure this app for
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleClose} sx={{ ml: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search companies..."
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

        <Box sx={{ height: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {filtered.map((company) => {
            const isSelected = selectedId === company.id
            return (
              <Box
                key={company.id}
                onClick={() => setSelectedId(isSelected ? null : company.id)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  py: 1.25, px: 1.5, borderRadius: 1, cursor: 'pointer',
                  border: isSelected ? '1.5px solid #244B72' : '1.5px solid transparent',
                  bgcolor: isSelected ? '#EBF0F5' : '#fff',
                  '&:hover': { bgcolor: isSelected ? '#EBF0F5' : '#F7F8FC' },
                  transition: 'background-color 0.1s, border-color 0.1s',
                }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#90A4AE', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                  {company.initials}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', lineHeight: 1.57 }}>
                    {company.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466', letterSpacing: '0.2px' }}>
                    {company.industry} · {company.location}
                  </Typography>
                </Box>
                {isSelected && (
                  <Box sx={{ width: 22, height: 22, borderRadius: '99px', bgcolor: '#244B72', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckIcon sx={{ fontSize: 13, color: '#fff' }} />
                  </Box>
                )}
              </Box>
            )
          })}
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No companies found.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleClose}
          sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" disabled={!selectedId} onClick={handleContinue}
          sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
          {selectedCompany ? `Continue with ${selectedCompany.name}` : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
