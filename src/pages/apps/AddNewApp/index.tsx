import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Step1AppName from './steps/Step1AppName'
import Step2Description from './steps/Step2Description'
import Step3TypeEvents from './steps/Step3TypeEvents'
import Step4Support from './steps/Step4Support'
import Step5Tasks from './steps/Step5Tasks'
import Step6Review from './steps/Step6Review'
import WizardStepper from './WizardStepper'

export interface AppData {
  // Step 1
  appName: string
  importedFromEntra: boolean

  // Step 2
  logo: File | null
  logoPreview: string
  description: string
  publisher: string
  websiteUrl: string
  categories: string[]
  screenshots: File[]

  // Step 3
  appType: 'microsoft' | 'manual' | ''
  provisioningMethods: ('SCIM' | 'ChampionTask')[]
  signOnMethods: ('SSO' | 'Manual')[]

  // Step 4
  contactName: string
  contactEmail: string
  contactPhone: string
  supportUrl: string
  documentationUrl: string
  faqUrl: string

  // Step 5
  onboardingTask: TaskTemplate
  offboardingTask: TaskTemplate
}

export interface ChecklistItem {
  id: string
  text: string
}

export interface InstructionStep {
  id: string
  text: string
}

export interface InstructionSection {
  id: string
  title: string
  steps: InstructionStep[]
}

export interface TaskTemplate {
  title: string
  checklist: ChecklistItem[]
  video: File | null
  sections: InstructionSection[]
  dueAfterDays: string
}

const emptyTask = (): TaskTemplate => ({
  title: '',
  checklist: [
    { id: '1', text: '' },
    { id: '2', text: '' },
  ],
  video: null,
  sections: [{ id: '1', title: '', steps: [{ id: '1', text: '' }] }],
  dueAfterDays: '',
})

const initialData: AppData = {
  appName: '',
  importedFromEntra: false,
  logo: null,
  logoPreview: '',
  description: '',
  publisher: '',
  websiteUrl: '',
  categories: [],
  screenshots: [],
  appType: '',
  provisioningMethods: [],
  signOnMethods: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  supportUrl: '',
  documentationUrl: '',
  faqUrl: '',
  onboardingTask: emptyTask(),
  offboardingTask: emptyTask(),
}

const STEPS = ['App Name', 'Description', 'Type & Events', 'Support', 'Tasks', 'Review']

export default function AddNewApp() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<AppData>(initialData)
  const [toastOpen, setToastOpen] = useState(false)

  const update = (partial: Partial<AppData>) => setData((prev) => ({ ...prev, ...partial }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const exit = () => navigate('/apps')

  const canNext =
    step === 0 ? data.appName.trim().length > 0 :
    step === 1 ? data.appName.trim().length > 0 :
    step === 2 ? data.appType !== '' && data.provisioningMethods.length > 0 && data.signOnMethods.length > 0 :
    true

  const stepProps = { data, update, onNext: next, onBack: back }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, pb: 2 }}>
      {/* Page header */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Apps Library
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add New App
      </Typography>

      {/* Card: stepper + content + footer */}
      <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

        {/* Stepper */}
        <WizardStepper steps={STEPS} activeStep={step} onExit={exit} />

        {/* Scrollable step content */}
        <Box sx={{ flex: 1, overflow: 'auto', bgcolor: '#fff', p: 3 }}>
          {step === 0 && <Step1AppName {...stepProps} />}
          {step === 1 && <Step2Description {...stepProps} />}
          {step === 2 && <Step3TypeEvents {...stepProps} />}
          {step === 3 && <Step4Support {...stepProps} />}
          {step === 4 && <Step5Tasks {...stepProps} />}
          {step === 5 && <Step6Review data={data} onBack={back} onSave={() => navigate('/apps')} onEditStep={setStep} />}
        </Box>

        {/* Sticky footer with Back / Next */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderTop: '1px solid #EAECF0', bgcolor: '#fff', flexShrink: 0 }}>
          <Button
            variant="outlined"
            startIcon={<ChevronLeftIcon sx={{ fontSize: 20 }} />}
            onClick={step === 0 ? exit : back}
            sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: '0px 1px 2px rgba(16,24,40,0.05)' }}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            variant="contained"
            endIcon={step < STEPS.length - 1 ? <ChevronRightIcon sx={{ fontSize: 20 }} /> : undefined}
            disabled={!canNext}
            onClick={step === STEPS.length - 1 ? () => { setToastOpen(true); setTimeout(() => navigate('/apps'), 1500) } : next}
            sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
          >
            {step === STEPS.length - 1 ? 'Save to Library' : 'Next Step'}
          </Button>
        </Box>

      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)} sx={{ width: '100%' }}>
          App added to the library
        </Alert>
      </Snackbar>
    </Box>
  )
}
