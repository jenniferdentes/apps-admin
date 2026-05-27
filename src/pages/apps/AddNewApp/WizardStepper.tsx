import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ButtonBase from '@mui/material/ButtonBase'

interface WizardStepperProps {
  steps: string[]
  activeStep: number
  onExit: () => void
}

export default function WizardStepper({ steps, activeStep, onExit }: WizardStepperProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#EEF1F5',
        borderRadius: 1,
        px: 3,
        py: 1.5,
        gap: 0,
      }}
    >
      {steps.map((label, index) => {
        const completed = index < activeStep
        const active = index === activeStep

        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
              {/* Circle */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: completed || active ? '#1B2A3B' : '#CBD5E1',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {completed ? (
                  <CheckIcon sx={{ fontSize: 14 }} />
                ) : (
                  <Typography sx={{ fontSize: 11, fontWeight: 600, lineHeight: 1 }}>{index + 1}</Typography>
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: active ? 600 : 400,
                  color: active || completed ? '#1B2A3B' : '#94A3B8',
                }}
              >
                {label}
              </Typography>
            </Box>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  bgcolor: index < activeStep ? '#1B2A3B' : '#CBD5E1',
                  mx: 1.5,
                }}
              />
            )}
          </Box>
        )
      })}

      {/* Exit */}
      <Box sx={{ ml: 2 }}>
        <ButtonBase
          onClick={onExit}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748B', borderRadius: 1, px: 0.5, py: 0.25 }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: '0.8rem' }}>Exit</Typography>
        </ButtonBase>
      </Box>
    </Box>
  )
}
