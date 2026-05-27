import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddIcon from '@mui/icons-material/Add'
import type { AppDetail } from './mockData'
import { PROV_CHIPS as PROVISIONING_CHIP, SIGNON_CHIPS as SIGNON_CHIP } from '../../../lib/methodChips'
const CATEGORIES = ['Messaging', 'Collaboration', 'CRM', 'Finance', 'HR', 'Security', 'Productivity', 'Storage', 'Analytics', 'Development', 'Integrations']

function SectionCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, pb: 2, borderBottom: '1px solid #EAECF0' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>{title}</Typography>
        {onEdit && (
          <Button size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: '14px !important' }} />} onClick={onEdit}
            sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.8rem', minWidth: 'auto' }}>
            Edit
          </Button>
        )}
      </Box>
      <Box sx={{ px: 3, py: 2.5 }}>{children}</Box>
    </Box>
  )
}

function ReadField({ label, value, half }: { label: string; value: React.ReactNode; half?: boolean }) {
  return (
    <Box sx={{ mb: 2, width: half ? '50%' : '100%', pr: half ? 2 : 0 }}>
      <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mb: 0.5, fontWeight: 500 }}>{label}</Typography>
      {typeof value === 'string'
        ? <Typography sx={{ fontSize: '0.875rem' }}>{value || <span style={{ color: '#94A3B8' }}>Not Set</span>}</Typography>
        : value}
    </Box>
  )
}

function MethodChips({ methods, map }: { methods: string[]; map: Record<string, { label: string; bg: string; color: string }> }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
      {methods.map((m) => {
        const cfg = map[m]
        if (!cfg) return null
        return (
          <Chip key={m} label={cfg.label} size="small"
            sx={{ bgcolor: cfg.bg, color: cfg.color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        )
      })}
    </Box>
  )
}

function ToggleChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <Chip label={label} onClick={onToggle}
      icon={selected ? <CheckCircleIcon sx={{ fontSize: 16, color: '#fff !important' }} /> : undefined}
      sx={{ borderRadius: 20, height: 36, fontWeight: 500, fontSize: '0.875rem', bgcolor: selected ? '#1B2A3B' : '#fff', color: selected ? '#fff' : '#1B2A3B', border: '1px solid', borderColor: selected ? '#1B2A3B' : '#CBD5E1', '& .MuiChip-icon': { ml: 1 }, '&:hover': { bgcolor: selected ? '#243447' : '#F1F5F9' }, cursor: 'pointer' }} />
  )
}

// ── App Details Section ─────────────────────────────────────────────────────
function AppDetailsSection({ app, onSave }: { app: AppDetail; onSave: (patch: Partial<AppDetail>) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: app.name, description: app.description, publisher: app.publisher, websiteUrl: app.websiteUrl, categories: app.categories })

  function save() { onSave(draft); setEditing(false) }
  function cancel() { setDraft({ name: app.name, description: app.description, publisher: app.publisher, websiteUrl: app.websiteUrl, categories: app.categories }); setEditing(false) }

  return (
    <SectionCard title="App Details" onEdit={editing ? undefined : () => setEditing(true)}>
      {editing ? (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>App Name</Typography>
            <TextField fullWidth size="small" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Description</Typography>
            <TextField fullWidth multiline rows={3} size="small" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Publisher</Typography>
              <TextField fullWidth size="small" value={draft.publisher} onChange={(e) => setDraft({ ...draft, publisher: e.target.value })} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Website</Typography>
              <TextField fullWidth size="small" value={draft.websiteUrl} onChange={(e) => setDraft({ ...draft, websiteUrl: e.target.value })} />
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Categories</Typography>
            <FormControl size="small" fullWidth>
              <Select multiple value={draft.categories} input={<OutlinedInput />}
                onChange={(e) => setDraft({ ...draft, categories: e.target.value as string[] })}
                renderValue={(sel) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(sel as string[]).map((v) => (
                      <Chip key={v} label={v} size="small" onDelete={() => setDraft({ ...draft, categories: draft.categories.filter((c) => c !== v) })} onMouseDown={(e) => e.stopPropagation()} />
                    ))}
                  </Box>
                )}>
                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
            <Button variant="contained" size="small" onClick={save}>Save</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <ReadField label="App Name" value={app.name} />
          <ReadField label="Description" value={app.description} />
          <Box sx={{ display: 'flex' }}>
            <ReadField label="Publisher" value={app.publisher} half />
            <ReadField label="Website" value={
              app.websiteUrl
                ? <Typography sx={{ fontSize: '0.875rem', color: '#244B72' }}>{app.websiteUrl}</Typography>
                : <Typography sx={{ fontSize: '0.875rem', color: '#94A3B8' }}>Not Set</Typography>
            } half />
          </Box>
          <ReadField label="Categories" value={
            app.categories.length > 0
              ? <Typography sx={{ fontSize: '0.875rem' }}>{app.categories.join(', ')}</Typography>
              : <Typography sx={{ fontSize: '0.875rem', color: '#94A3B8' }}>Not Set</Typography>
          } />
        </Box>
      )}
    </SectionCard>
  )
}

// ── Type & Events Section ───────────────────────────────────────────────────
function TypeEventsSection({ app, onSave }: { app: AppDetail; onSave: (patch: Partial<AppDetail>) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ appType: app.appType, provisioning: [...app.provisioning], signOn: [...app.signOn] })

  function save() { onSave(draft); setEditing(false) }
  function cancel() { setDraft({ appType: app.appType, provisioning: [...app.provisioning], signOn: [...app.signOn] }); setEditing(false) }

  const toggleProv = (m: string) => {
    const cur = draft.provisioning as string[]
    setDraft({ ...draft, provisioning: cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m] } as typeof draft)
  }
  const toggleSO = (m: string) => {
    const cur = draft.signOn as string[]
    setDraft({ ...draft, signOn: cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m] } as typeof draft)
  }

  return (
    <SectionCard title="Type & Events" onEdit={editing ? undefined : () => setEditing(true)}>
      {editing ? (
        <Box>
          <Alert severity="warning" sx={{ mb: 3, fontSize: '0.8rem' }}>
            14 clients are registered with this app. Changes here will affect how the app is configured across all of them.
          </Alert>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1.5 }}>App Type</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[{ value: 'microsoft', label: 'Microsoft Integration', sub: 'Supports SCIM and SSO' }, { value: 'manual', label: 'Manual Provisioning', sub: 'Champion tasks only' }].map((t) => (
                <Box key={t.value} onClick={() => setDraft({ ...draft, appType: t.value as 'microsoft' | 'manual' })}
                  sx={{ width: 200, border: '1.5px solid', borderColor: draft.appType === t.value ? '#1B2A3B' : '#E2E8F0', borderRadius: 1, p: 2, cursor: 'pointer', bgcolor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{t.label}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>{t.sub}</Typography>
                  </Box>
                  {draft.appType === t.value && <CheckCircleIcon sx={{ color: '#1B2A3B', fontSize: 18 }} />}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>Provisioning Method</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['SCIM', 'ChampionTask'].map((m) => (
                <ToggleChip key={m} label={PROVISIONING_CHIP[m].label} selected={(draft.provisioning as string[]).includes(m)} onToggle={() => toggleProv(m)} />
              ))}
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>Sign-on Method</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['SSO', 'Manual'].map((m) => (
                <ToggleChip key={m} label={SIGNON_CHIP[m].label} selected={(draft.signOn as string[]).includes(m)} onToggle={() => toggleSO(m)} />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
            <Button variant="contained" size="small" onClick={save}>Save</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <ReadField label="App Type" value={app.appType === 'microsoft' ? 'Microsoft Integration' : 'Manual Provisioning'} />
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ReadField label="Provisioning" value={<MethodChips methods={app.provisioning} map={PROVISIONING_CHIP} />} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <ReadField label="Provisioning" value={<MethodChips methods={app.signOn} map={SIGNON_CHIP} />} />
            </Box>
          </Box>
        </Box>
      )}
    </SectionCard>
  )
}

// ── Screenshots Section ─────────────────────────────────────────────────────
function ScreenshotsSection() {
  const [editing, setEditing] = useState(false)
  const placeholders = ['#C8D8E8', '#D8C8E8', '#C8E8D8']

  return (
    <SectionCard title="Screenshots" onEdit={() => setEditing(!editing)}>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {placeholders.map((bg, i) => (
          <Box key={i} sx={{ position: 'relative' }}>
            <Box sx={{ width: 120, height: 80, borderRadius: 1.5, bgcolor: bg, border: '1px solid #E2E8F0' }} />
            {editing && (
              <Box onClick={() => {}} sx={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, bgcolor: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 700 }}>×</Box>
            )}
          </Box>
        ))}
        {editing && (
          <Box sx={{ width: 120, height: 80, border: '2px dashed #CBD5E1', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: '#94A3B8' } }}>
            <AddIcon sx={{ color: '#CBD5E1' }} />
          </Box>
        )}
      </Box>
      {editing && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Button variant="outlined" size="small" onClick={() => setEditing(false)}>Cancel</Button>
          <Button variant="contained" size="small" onClick={() => setEditing(false)}>Save</Button>
        </Box>
      )}
    </SectionCard>
  )
}

// ── Support Section ─────────────────────────────────────────────────────────
function SupportSection({ app, onSave }: { app: AppDetail; onSave: (patch: Partial<AppDetail>) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ contactName: app.contactName, contactEmail: app.contactEmail, contactPhone: app.contactPhone, supportUrl: app.supportUrl })

  function save() { onSave(draft); setEditing(false) }
  function cancel() { setDraft({ contactName: app.contactName, contactEmail: app.contactEmail, contactPhone: app.contactPhone, supportUrl: app.supportUrl }); setEditing(false) }

  return (
    <SectionCard title="Support Information" onEdit={editing ? undefined : () => setEditing(true)}>
      {editing ? (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Name</Typography>
              <TextField fullWidth size="small" value={draft.contactName} onChange={(e) => setDraft({ ...draft, contactName: e.target.value })} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Email</Typography>
              <TextField fullWidth size="small" value={draft.contactEmail} onChange={(e) => setDraft({ ...draft, contactEmail: e.target.value })} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Phone</Typography>
              <TextField fullWidth size="small" placeholder="Add phone number" value={draft.contactPhone} onChange={(e) => setDraft({ ...draft, contactPhone: e.target.value })} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.75 }}>Support URL</Typography>
              <TextField fullWidth size="small" value={draft.supportUrl} onChange={(e) => setDraft({ ...draft, supportUrl: e.target.value })} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
            <Button variant="contained" size="small" onClick={save}>Save</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex' }}>
            <ReadField label="Name" value={app.contactName} half />
            <ReadField label="Email" value={
              <Typography sx={{ fontSize: '0.875rem', color: '#244B72' }}>{app.contactEmail}</Typography>
            } half />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <ReadField label="Phone" value={app.contactPhone || 'Not Set'} half />
            <ReadField label="Support URL" value={
              app.supportUrl ? <Typography sx={{ fontSize: '0.875rem', color: '#244B72' }}>{app.supportUrl}</Typography>
                : <Typography sx={{ fontSize: '0.875rem', color: '#94A3B8' }}>Not Set</Typography>
            } half />
          </Box>
        </Box>
      )}
    </SectionCard>
  )
}

// ── Tasks Template Section ──────────────────────────────────────────────────
function TaskPanel({ task, type }: { task: AppDetail['onboardingTask']; type: 'Onboarding' | 'Offboarding' }) {
  const chipStyle = type === 'Onboarding'
    ? { bg: '#DCFCE7', color: '#166534' }
    : { bg: '#FEE2E2', color: '#991B1B' }

  return (
    <Box sx={{ border: '1px solid #E2E8F0', borderRadius: 1, mb: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25, borderBottom: '1px solid #E2E8F0', bgcolor: '#FAFAFA' }}>
        <Chip label={type} size="small" sx={{ bgcolor: chipStyle.bg, color: chipStyle.color, fontWeight: 600, fontSize: '0.75rem', height: 22, borderRadius: 100 }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{task.title}</Typography>
        <Typography sx={{ ml: 'auto', fontSize: '0.8rem', color: '#64748B' }}>Due {task.dueAfterDays} days after event</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0, p: 2 }}>
        <Box sx={{ flex: 1, pr: 3 }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Checklist</Typography>
          {task.checklist.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
              <CheckIcon sx={{ fontSize: 14, color: '#22C55E', mt: '2px', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.8125rem' }}>{item.text}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>Instructions</Typography>
          {task.sections.map((section, i) => (
            <Box key={section.id} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#1B2A3B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</Box>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>{section.title}</Typography>
              </Box>
              {section.steps.map((step, si) => (
                <Typography key={step.id} sx={{ fontSize: '0.8rem', color: '#374151', ml: 3.5, mb: 0.25 }}>{si + 1}. {step.text}</Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function TasksSection({ app }: { app: AppDetail }) {
  return (
    <SectionCard title="Tasks Template" onEdit={() => {}}>
      <TaskPanel task={app.onboardingTask} type="Onboarding" />
      <TaskPanel task={app.offboardingTask} type="Offboarding" />
    </SectionCard>
  )
}

// ── Main Export ─────────────────────────────────────────────────────────────
interface Props { app: AppDetail; onUpdate: (patch: Partial<AppDetail>) => void }

export default function OverviewTab({ app, onUpdate }: Props) {
  return (
    <Box>
      <AppDetailsSection app={app} onSave={onUpdate} />
      <TypeEventsSection app={app} onSave={onUpdate} />
      <ScreenshotsSection />
      <SupportSection app={app} onSave={onUpdate} />
      <TasksSection app={app} />
    </Box>
  )
}
