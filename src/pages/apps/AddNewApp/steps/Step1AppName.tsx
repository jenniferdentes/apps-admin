import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import SearchIcon from '@mui/icons-material/Search'
import type { AppData } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

interface EntraApp {
  name: string
  icon: string
  publisher: string
  description: string
}

const ENTRA_APPS: EntraApp[] = [
  { name: 'Slack', icon: '🟦', publisher: 'Slack Technologies Inc.', description: 'Messaging and collaboration platform' },
  { name: 'Salesforce', icon: '☁️', publisher: 'Salesforce.com', description: 'CRM and sales platform' },
  { name: 'Safari', icon: '🧭', publisher: 'Apple Inc.', description: 'Web browser' },
  { name: 'SAP', icon: '🔷', publisher: 'SAP SE', description: 'Enterprise resource planning' },
  { name: 'ServiceNow', icon: '🟩', publisher: 'ServiceNow Inc.', description: 'IT service management' },
  { name: 'Zoom', icon: '🎥', publisher: 'Zoom Video Communications', description: 'Video conferencing platform' },
  { name: 'Dropbox', icon: '📦', publisher: 'Dropbox Inc.', description: 'Cloud file storage' },
  { name: 'Microsoft Teams', icon: '🟪', publisher: 'Microsoft Corporation', description: 'Collaboration and communication' },
]

export default function Step1AppName({ data, update, onNext }: Props) {
  const [query, setQuery] = useState(data.appName)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = query.trim()
    ? ENTRA_APPS.filter((a) => a.name.toLowerCase().startsWith(query.trim().toLowerCase()))
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectApp(app: EntraApp) {
    update({
      appName: app.name,
      importedFromEntra: true,
      publisher: app.publisher,
      description: app.description,
      logoPreview: '',
    })
    setQuery(app.name)
    setOpen(false)
    onNext()
  }

  function continueManually() {
    update({ appName: query.trim(), importedFromEntra: false })
    setOpen(false)
    onNext()
  }

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Find App
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Type the app name to get started. If it exists in the Microsoft Entra gallery we'll suggest it — select it to
        auto-import details. Otherwise just type the name and continue.
      </Typography>

      <Box ref={containerRef} sx={{ position: 'relative', maxWidth: 720 }}>
        <TextField
          fullWidth
          placeholder="e.g. Slack, Dropbox, Zoom..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          size="small"
        />

        {open && query.trim() && (
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10,
              mt: 0.5,
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <MenuList disablePadding>
              {filtered.map((app) => (
                <MenuItem
                  key={app.name}
                  onClick={() => selectApp(app)}
                  sx={{ py: 1.25, gap: 1.5, '&:hover': { bgcolor: '#F1F5F9' } }}
                >
                  <Box sx={{ fontSize: 20, lineHeight: 1 }}>{app.icon}</Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{app.name}</Typography>
                </MenuItem>
              ))}

              {/* Continue with typed name */}
              <MenuItem
                onClick={continueManually}
                sx={{ py: 1.25, justifyContent: 'space-between', '&:hover': { bgcolor: '#F1F5F9' } }}
              >
                <Typography sx={{ fontSize: '0.875rem' }}>
                  Continue with &ldquo;{query}&rdquo;
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8' }}>Add manually</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        )}
      </Box>

    </Box>
  )
}
