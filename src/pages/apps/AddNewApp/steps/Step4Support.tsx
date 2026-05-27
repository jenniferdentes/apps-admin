import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import type { AppData } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step4Support({ data, update }: Props) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Support &amp; Resources
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Add contact details and helpful links. These appear in the end-user portal so people know who to call when
        something&apos;s wrong.
      </Typography>

      <Box sx={{ bgcolor: '#F8FAFC', borderRadius: 1, p: 3 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 2.5 }}>Details</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Contact Name</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.contactName}
              onChange={(e) => update({ contactName: e.target.value })}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Contact Email</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              type="email"
              value={data.contactEmail}
              onChange={(e) => update({ contactEmail: e.target.value })}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Contact Phone</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              type="tel"
              value={data.contactPhone}
              onChange={(e) => update({ contactPhone: e.target.value })}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Support URL</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.supportUrl}
              onChange={(e) => update({ supportUrl: e.target.value })}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Documentation URL</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.documentationUrl}
              onChange={(e) => update({ documentationUrl: e.target.value })}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>FAQ URL</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Placeholder"
              value={data.faqUrl}
              onChange={(e) => update({ faqUrl: e.target.value })}
            />
          </Box>
        </Box>
      </Box>

    </Box>
  )
}
