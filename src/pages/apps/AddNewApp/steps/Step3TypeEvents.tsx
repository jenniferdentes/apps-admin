import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import type { AppData } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

const CAPABILITIES = [
  {
    id: 'SCIM' as const,
    label: 'SCIM Provisioning',
    description: 'Supports automated provisioning via SCIM when configured with the app provider.',
    category: 'provisioning',
  },
  {
    id: 'SSO' as const,
    label: 'SSO / SAML / OIDC',
    description: 'Federated sign-on via an identity provider such as Microsoft Entra, Okta, or Google.',
    category: 'sign-on',
  },
]

export default function Step3TypeEvents({ data, update }: Props) {
  // Ensure manual fallbacks are always present
  useEffect(() => {
    const patch: Partial<AppData> = {}
    if (!data.provisioningMethods.includes('ChampionTask'))
      patch.provisioningMethods = [...data.provisioningMethods, 'ChampionTask']
    if (!data.signOnMethods.includes('Manual'))
      patch.signOnMethods = [...data.signOnMethods, 'Manual']
    if (Object.keys(patch).length > 0) update(patch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleScim() {
    const has = data.provisioningMethods.includes('SCIM')
    update({
      provisioningMethods: has
        ? data.provisioningMethods.filter((m) => m !== 'SCIM')
        : [...data.provisioningMethods, 'SCIM'],
    })
  }

  function toggleSso() {
    const has = data.signOnMethods.includes('SSO')
    update({
      signOnMethods: has
        ? data.signOnMethods.filter((m) => m !== 'SSO')
        : [...data.signOnMethods, 'SSO'],
    })
  }

  const scimOn = data.provisioningMethods.includes('SCIM')
  const ssoOn = data.signOnMethods.includes('SSO')

  const toggles = [
    { cap: CAPABILITIES[0], enabled: scimOn, onToggle: toggleScim },
    { cap: CAPABILITIES[1], enabled: ssoOn,  onToggle: toggleSso  },
  ]

  return (
    <Box sx={{ maxWidth: 680 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Capabilities
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Enable the integration capabilities this app supports. These become available options when clients configure the app.
      </Typography>

      {/* Capability switches */}
      <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, overflow: 'hidden', mb: 2.5 }}>
        {toggles.map(({ cap, enabled, onToggle }, i) => (
          <Box
            key={cap.id}
            onClick={onToggle}
            sx={{
              display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2,
              borderBottom: i < toggles.length - 1 ? '1px solid var(--mui-palette-divider)' : 'none',
              bgcolor: enabled ? 'background.paper' : 'background.default',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
              '&:hover': { bgcolor: enabled ? 'secondary.main' : 'background.paper' },
            }}
          >
            <Switch
              checked={enabled}
              onChange={onToggle}
              onClick={(e) => e.stopPropagation()}
              size="small"
              sx={{
                flexShrink: 0,
                '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'text.primary', letterSpacing: '0.1px', lineHeight: 1.5 }}>
                {cap.label}
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.5, mt: 0.25 }}>
                {cap.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Always-available note */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: 'background.paper', border: '1px solid var(--mui-palette-divider)', borderRadius: 1, px: 2, py: 1.5 }}>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0, mt: '2px' }} />
        <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.6 }}>
          <strong style={{ color: 'inherit' }}>Champion Task provisioning</strong> and <strong style={{ color: 'inherit' }}>manual login</strong> are always available — clients can use them regardless of the capabilities enabled above.
        </Typography>
      </Box>
    </Box>
  )
}
