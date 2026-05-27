import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import type { AppData } from '../index'

interface Props {
  data: AppData
  onBack: () => void
  onSave: () => void
  onEditStep: (step: number) => void
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        border: '1px solid #E2E8F0',
        borderRadius: 1,
        mb: 2.5,
        overflow: 'hidden',
        maxWidth: 960,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
          bgcolor: '#fff',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</Typography>
        <Button size="small" onClick={onEdit} sx={{ color: '#1B2A3B', fontWeight: 500, fontSize: '0.8rem', minWidth: 'auto' }}>
          Edit
        </Button>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2, bgcolor: '#fff' }}>{children}</Box>
    </Box>
  )
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', gap: 3, py: 0.75 }}>
      <Typography sx={{ fontSize: '0.8rem', color: '#64748B', width: 140, flexShrink: 0 }}>{label}</Typography>
      <Box sx={{ flex: 1 }}>
        {typeof value === 'string' ? (
          <Typography sx={{ fontSize: '0.875rem' }}>{value || '—'}</Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  )
}

export default function Step6Review({ data, onEditStep }: Props) {
  const provisioningLabels: Record<string, string> = { SCIM: 'SCIM', ChampionTask: 'Champion Task' }
  const signOnLabels: Record<string, string> = { SSO: 'SSO', Manual: 'Manual' }
  const appTypeLabel = data.appType === 'microsoft' ? 'Microsoft Integration' : data.appType === 'manual' ? 'Manual Provisioning' : '—'

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Review &amp; Save
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Review the configuration before adding this app to the catalogue.
      </Typography>

      {/* Description */}
      <ReviewCard title="Description" onEdit={() => onEditStep(1)}>
        <ReviewRow label="App Name" value={data.appName} />
        <ReviewRow label="Publisher" value={data.publisher} />
        <ReviewRow label="Description" value={data.description} />
        <ReviewRow
          label="Categories"
          value={
            data.categories.length > 0 ? (
              <Typography sx={{ fontSize: '0.875rem' }}>{data.categories.join(', ')}</Typography>
            ) : (
              <Typography sx={{ fontSize: '0.875rem', color: '#94A3B8' }}>—</Typography>
            )
          }
        />
      </ReviewCard>

      {/* Type & Events */}
      <ReviewCard title="Type & Events" onEdit={() => onEditStep(2)}>
        <ReviewRow label="App Type" value={appTypeLabel} />
        <ReviewRow
          label="Provisioning"
          value={
            data.provisioningMethods.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                {data.provisioningMethods.map((m) => (
                  <Chip
                    key={m}
                    label={provisioningLabels[m]}
                    size="small"
                    sx={{ bgcolor: '#EEF2FF', color: '#4338CA', fontWeight: 500, fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            ) : (
              '—'
            )
          }
        />
        <ReviewRow
          label="Sign-on"
          value={
            data.signOnMethods.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                {data.signOnMethods.map((m) => (
                  <Chip
                    key={m}
                    label={signOnLabels[m]}
                    size="small"
                    sx={{ bgcolor: '#EEF2FF', color: '#4338CA', fontWeight: 500, fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            ) : (
              '—'
            )
          }
        />
      </ReviewCard>

      {/* Support */}
      <ReviewCard title="Support" onEdit={() => onEditStep(3)}>
        <ReviewRow label="Contact" value={data.contactName} />
        <ReviewRow label="Email" value={data.contactEmail} />
        <ReviewRow label="Phone" value={data.contactPhone} />
        <ReviewRow label="Support URL" value={data.supportUrl} />
        <ReviewRow label="Documentation URL" value={data.documentationUrl} />
        <ReviewRow label="FAQ URL" value={data.faqUrl} />
      </ReviewCard>

    </Box>
  )
}
