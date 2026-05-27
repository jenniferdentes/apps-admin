import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AddIcon from '@mui/icons-material/Add'
import type { AppData } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

const CATEGORIES = [
  'Messaging', 'Collaboration', 'CRM', 'Finance', 'HR', 'Security',
  'Productivity', 'Storage', 'Analytics', 'Development', 'Integrations',
]

function ImportedBadge() {
  return (
    <Chip
      label="Imported"
      size="small"
      sx={{ fontSize: '0.7rem', height: 22, bgcolor: '#E0F2FE', color: '#0284C7', fontWeight: 500 }}
    />
  )
}

function FieldLabel({ text, imported }: { text: string; imported?: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{text}</Typography>
      {imported && <ImportedBadge />}
    </Box>
  )
}

export default function Step2Description({ data, update }: Props) {
  const logoInputRef = useRef<HTMLInputElement>(null)
  const screenshotInputRef = useRef<HTMLInputElement>(null)

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    update({ logo: file, logoPreview: preview })
  }

  function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    update({ screenshots: [...data.screenshots, ...files] })
  }

  const imported = data.importedFromEntra

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Description
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Define how this app appears across CubX — to admins and end users.{' '}
        {imported && (
          <>Fields marked <strong>Imported</strong> were pulled from Microsoft Entra and can be overridden.</>
        )}
      </Typography>

      {/* Logo */}
      <Box sx={{ mb: 4 }}>
        <FieldLabel text="App Logo" imported={imported && !!data.logoPreview} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              border: '2px dashed #CBD5E1',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {data.logoPreview ? (
              <img src={data.logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <ImageOutlinedIcon sx={{ color: '#CBD5E1', fontSize: 32 }} />
            )}
          </Box>
          <Box>
            <Button variant="outlined" size="small" onClick={() => logoInputRef.current?.click()} sx={{ mb: 0.5 }}>
              {data.logoPreview ? 'Replace Logo' : 'Upload Logo'}
            </Button>
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              PNG, JPEG, Gif. Max 2MB
            </Typography>
          </Box>
        </Box>
        <input ref={logoInputRef} type="file" accept="image/*" hidden onChange={handleLogoChange} />
      </Box>

      <Box sx={{ bgcolor: '#F8FAFC', borderRadius: 1, p: 3, mb: 4 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 2 }}>Details</Typography>

        {/* App Name */}
        <Box sx={{ mb: 2 }}>
          <FieldLabel text="App Name" imported={imported} />
          <TextField
            fullWidth
            size="small"
            value={data.appName}
            onChange={(e) => update({ appName: e.target.value })}
            sx={{ maxWidth: 720 }}
          />
        </Box>

        {/* Description */}
        <Box sx={{ mb: 2 }}>
          <FieldLabel text="Description" imported={imported && !!data.description} />
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            placeholder="Placeholder"
            value={data.description}
            onChange={(e) => update({ description: e.target.value })}
            sx={{ maxWidth: 720 }}
          />
        </Box>

        {/* Publisher + Website */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <FieldLabel text="Publisher / vendor" imported={imported && !!data.publisher} />
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.publisher}
              onChange={(e) => update({ publisher: e.target.value })}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FieldLabel text="Website URL" imported={imported && !!data.websiteUrl} />
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.websiteUrl}
              onChange={(e) => update({ websiteUrl: e.target.value })}
            />
          </Box>
        </Box>

        {/* Categories */}
        <Box>
          <FieldLabel text={imported ? 'Categories' : 'App Category'} imported={imported && data.categories.length > 0} />
          <FormControl size="small" sx={{ maxWidth: 720, width: '100%' }}>
            <Select
              multiple={imported}
              value={imported ? data.categories : (data.categories[0] ?? '')}
              onChange={(e) => {
                const val = e.target.value
                update({ categories: Array.isArray(val) ? val : val ? [val] : [] })
              }}
              input={<OutlinedInput />}
              displayEmpty
              renderValue={(selected) => {
                if (!selected || (Array.isArray(selected) && selected.length === 0)) {
                  return <Typography sx={{ color: '#94A3B8', fontSize: '0.875rem' }}>Select</Typography>
                }
                if (Array.isArray(selected)) {
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((val) => (
                        <Chip
                          key={val}
                          label={val}
                          size="small"
                          onDelete={() => update({ categories: data.categories.filter((c) => c !== val) })}
                          onMouseDown={(e) => e.stopPropagation()}
                        />
                      ))}
                    </Box>
                  )
                }
                return selected
              }}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Screenshots */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1.5 }}>Screenshots</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {data.screenshots.map((file, i) => (
            <Box
              key={i}
              sx={{
                width: 80,
                height: 80,
                border: '1px solid #E2E8F0',
                borderRadius: 1.5,
                overflow: 'hidden',
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`screenshot-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
          <Box
            onClick={() => screenshotInputRef.current?.click()}
            sx={{
              width: 80,
              height: 80,
              border: '2px dashed #CBD5E1',
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#94A3B8' },
            }}
          >
            <AddIcon sx={{ color: '#CBD5E1', fontSize: 24 }} />
          </Box>
        </Box>
        <input ref={screenshotInputRef} type="file" accept="image/*" multiple hidden onChange={handleScreenshot} />
      </Box>

    </Box>
  )
}
