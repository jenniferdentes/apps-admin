import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { AppData } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

interface AppTypeCard {
  value: 'microsoft' | 'manual'
  label: string
  subtitle: string
}

const APP_TYPES: AppTypeCard[] = [
  { value: 'microsoft', label: 'Microsoft Integration', subtitle: 'Supports SCIM and SSO' },
  { value: 'manual', label: 'Manual Provisioning', subtitle: 'Champion tasks only' },
]

type ProvisioningMethod = 'SCIM' | 'ChampionTask'
type SignOnMethod = 'SSO' | 'Manual'

const PROVISIONING_OPTIONS: { value: ProvisioningMethod; label: string }[] = [
  { value: 'SCIM', label: 'SCIM' },
  { value: 'ChampionTask', label: 'Champion Task' },
]

const SIGNON_OPTIONS: { value: SignOnMethod; label: string }[] = [
  { value: 'SSO', label: 'SSO' },
  { value: 'Manual', label: 'Manual' },
]

function ToggleChip({
  label,
  selected,
  onToggle,
}: {
  label: string
  selected: boolean
  onToggle: () => void
}) {
  return (
    <Chip
      label={label}
      onClick={onToggle}
      icon={selected ? <CheckCircleIcon sx={{ fontSize: 16, color: '#fff !important' }} /> : undefined}
      sx={{
        borderRadius: 20,
        height: 36,
        fontWeight: 500,
        fontSize: '0.875rem',
        bgcolor: selected ? '#1B2A3B' : '#fff',
        color: selected ? '#fff' : '#1B2A3B',
        border: '1px solid',
        borderColor: selected ? '#1B2A3B' : '#CBD5E1',
        '& .MuiChip-icon': { ml: 1 },
        '&:hover': { bgcolor: selected ? '#243447' : '#F1F5F9' },
        cursor: 'pointer',
      }}
    />
  )
}

export default function Step3TypeEvents({ data, update }: Props) {
  const availableProvisioning: ProvisioningMethod[] =
    data.appType === 'manual' ? ['ChampionTask'] : ['SCIM', 'ChampionTask']

  const availableSignOn: SignOnMethod[] = data.appType === 'manual' ? ['Manual'] : ['SSO', 'Manual']

  function toggleProvisioning(method: ProvisioningMethod) {
    const current = data.provisioningMethods
    update({
      provisioningMethods: current.includes(method)
        ? current.filter((m) => m !== method)
        : [...current, method],
    })
  }

  function toggleSignOn(method: SignOnMethod) {
    const current = data.signOnMethods
    update({
      signOnMethods: current.includes(method)
        ? current.filter((m) => m !== method)
        : [...current, method],
    })
  }

  function handleAppType(type: 'microsoft' | 'manual') {
    update({
      appType: type,
      provisioningMethods: type === 'manual' ? ['ChampionTask'] : [],
      signOnMethods: type === 'manual' ? ['Manual'] : [],
    })
  }

  const provisioningNote =
    data.appType === 'microsoft'
      ? 'Both SCIM and Champion task are available for clients to configure.'
      : 'Champion Task is the only provisioning method for manual apps.'

  const signOnNote =
    data.appType === 'microsoft'
      ? 'Both SSO and Manual are available for clients to configure.'
      : 'Manual login is the only sign-on method for manual apps.'

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        App type &amp; Events
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Choose the app type and set how users are provisioned for each event. Sign-on method applies to the whole app.
      </Typography>

      {/* App Type */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1.5 }}>App Type</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {APP_TYPES.map((t) => {
            const selected = data.appType === t.value
            return (
              <Box
                key={t.value}
                onClick={() => handleAppType(t.value)}
                sx={{
                  width: 220,
                  border: '1.5px solid',
                  borderColor: selected ? '#1B2A3B' : '#E2E8F0',
                  borderRadius: 1,
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  '&:hover': { borderColor: '#94A3B8' },
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.25 }}>{t.label}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>{t.subtitle}</Typography>
                </Box>
                {selected && <CheckCircleIcon sx={{ color: '#1B2A3B', fontSize: 20 }} />}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Provisioning Method */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Provisioning Method</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <ArrowForwardIcon sx={{ fontSize: 14, color: '#64748B' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>{provisioningNote}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
          {PROVISIONING_OPTIONS.filter((o) => availableProvisioning.includes(o.value)).map((o) => (
            <ToggleChip
              key={o.value}
              label={o.label}
              selected={data.provisioningMethods.includes(o.value)}
              onToggle={() => toggleProvisioning(o.value)}
            />
          ))}
        </Box>
      </Box>

      {/* Sign-on Method */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Sign-on Method</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <ArrowForwardIcon sx={{ fontSize: 14, color: '#64748B' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>{signOnNote}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
          {SIGNON_OPTIONS.filter((o) => availableSignOn.includes(o.value)).map((o) => (
            <ToggleChip
              key={o.value}
              label={o.label}
              selected={data.signOnMethods.includes(o.value)}
              onToggle={() => toggleSignOn(o.value)}
            />
          ))}
        </Box>
      </Box>

    </Box>
  )
}
