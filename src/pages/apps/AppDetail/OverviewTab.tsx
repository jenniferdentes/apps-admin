import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
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
import Switch from '@mui/material/Switch'
import CheckIcon from '@mui/icons-material/Check'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AddIcon from '@mui/icons-material/Add'
import type { AppDetail, CheckItem, InstructionSection, InstructionStep, TaskDetail } from './mockData'
import { PROV_CHIPS as PROVISIONING_CHIP, SIGNON_CHIPS as SIGNON_CHIP } from '../../../lib/methodChips'
const CATEGORIES = ['Messaging', 'Collaboration', 'CRM', 'Finance', 'HR', 'Security', 'Productivity', 'Storage', 'Analytics', 'Development', 'Integrations']

function SectionCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, bgcolor: 'background.default', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, pb: 2, borderBottom: '1px solid var(--mui-palette-divider)' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>{title}</Typography>
        {onEdit && (
          <Button size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: '14px !important' }} />} onClick={onEdit}
            sx={{ color: 'primary.main', fontWeight: 500, fontSize: '0.8rem', minWidth: 'auto' }}>
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
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5, fontWeight: 500 }}>{label}</Typography>
      {typeof value === 'string'
        ? <Typography sx={{ fontSize: '0.875rem' }}>{value || <span style={{ color: 'var(--mui-palette-text-disabled)' }}>Not Set</span>}</Typography>
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
                ? <Typography sx={{ fontSize: '0.875rem', color: 'primary.main' }}>{app.websiteUrl}</Typography>
                : <Typography sx={{ fontSize: '0.875rem', color: 'text.disabled' }}>Not Set</Typography>
            } half />
          </Box>
          <ReadField label="Categories" value={
            app.categories.length > 0
              ? <Typography sx={{ fontSize: '0.875rem' }}>{app.categories.join(', ')}</Typography>
              : <Typography sx={{ fontSize: '0.875rem', color: 'text.disabled' }}>Not Set</Typography>
          } />
        </Box>
      )}
    </SectionCard>
  )
}

// ── Type & Events Section ───────────────────────────────────────────────────
const CAPABILITY_ROWS = [
  { id: 'SCIM', field: 'provisioning' as const, label: 'SCIM Provisioning', description: 'Supports automated provisioning via SCIM when configured with the app provider.' },
  { id: 'SSO',  field: 'signOn'       as const, label: 'SSO / SAML / OIDC',  description: 'Federated sign-on via an identity provider such as Microsoft Entra, Okta, or Google.' },
]

function TypeEventsSection({ app, onSave }: { app: AppDetail; onSave: (patch: Partial<AppDetail>) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ provisioning: [...app.provisioning], signOn: [...app.signOn] })

  function save() { onSave(draft); setEditing(false) }
  function cancel() { setDraft({ provisioning: [...app.provisioning], signOn: [...app.signOn] }); setEditing(false) }

  function toggle(field: 'provisioning' | 'signOn', id: string) {
    const cur = draft[field] as string[]
    setDraft({ ...draft, [field]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] } as typeof draft)
  }

  return (
    <SectionCard title="Type & Events" onEdit={editing ? undefined : () => setEditing(true)}>
      {editing ? (
        <Box>
          <Alert severity="warning" sx={{ mb: 3, fontSize: '0.8rem' }}>
            14 clients are registered with this app. Changes here will affect how the app is configured across all of them.
          </Alert>

          <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, overflow: 'hidden', mb: 2.5 }}>
            {CAPABILITY_ROWS.map(({ id, field, label, description }, i) => {
              const enabled = (draft[field] as string[]).includes(id)
              return (
                <Box
                  key={id}
                  onClick={() => toggle(field, id)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2,
                    borderBottom: i < CAPABILITY_ROWS.length - 1 ? '1px solid var(--mui-palette-divider)' : 'none',
                    bgcolor: enabled ? 'background.paper' : 'background.default',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    '&:hover': { bgcolor: enabled ? 'secondary.main' : 'background.paper' },
                  }}
                >
                  <Switch
                    checked={enabled}
                    onChange={() => toggle(field, id)}
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
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.5, mt: 0.25 }}>
                      {description}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: 'background.paper', border: '1px solid var(--mui-palette-divider)', borderRadius: 1, px: 2, py: 1.5, mb: 3 }}>
            <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0, mt: '2px' }} />
            <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--mui-palette-text-primary)' }}>Champion Task provisioning</strong> and <strong style={{ color: 'var(--mui-palette-text-primary)' }}>manual login</strong> are always available — clients can use them regardless of the capabilities enabled above.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
            <Button variant="contained" size="small" onClick={save}>Save</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ReadField label="Provisioning" value={<MethodChips methods={app.provisioning} map={PROVISIONING_CHIP} />} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <ReadField label="Sign-on" value={<MethodChips methods={app.signOn} map={SIGNON_CHIP} />} />
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
            <Box sx={{ width: 120, height: 80, borderRadius: 1.5, bgcolor: bg, border: '1px solid var(--mui-palette-divider)' }} />
            {editing && (
              <Box onClick={() => {}} sx={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, bgcolor: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 700 }}>×</Box>
            )}
          </Box>
        ))}
        {editing && (
          <Box sx={{ width: 120, height: 80, border: '2px dashed #CBD5E1', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: 'divider' } }}>
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
              <Typography sx={{ fontSize: '0.875rem', color: 'primary.main' }}>{app.contactEmail}</Typography>
            } half />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <ReadField label="Phone" value={app.contactPhone || 'Not Set'} half />
            <ReadField label="Support URL" value={
              app.supportUrl ? <Typography sx={{ fontSize: '0.875rem', color: 'primary.main' }}>{app.supportUrl}</Typography>
                : <Typography sx={{ fontSize: '0.875rem', color: 'text.disabled' }}>Not Set</Typography>
            } half />
          </Box>
        </Box>
      )}
    </SectionCard>
  )
}

// ── Tasks Template Section ──────────────────────────────────────────────────
let _tid = 200
function tid() { return String(++_tid) }

function parsePasteLines(text: string): string[] {
  return text.split('\n').map((l) => l.replace(/^[\d]+[.)]\s*|^[-•*]\s*/, '').trim()).filter(Boolean)
}

function TaskEditPanel({ label, task, onChange, autoFocus }: { label: 'Onboarding' | 'Offboarding'; task: TaskDetail; onChange: (t: TaskDetail) => void; autoFocus?: boolean }) {
  const [pasteHint, setPasteHint] = useState<number | null>(null)
  const chipColor = label === 'Onboarding' ? { bg: '#DCFCE7', color: '#166534' } : { bg: '#FEE2E2', color: '#991B1B' }

  function setChecklist(items: CheckItem[]) { onChange({ ...task, checklist: items }) }
  function addChecklistItem() { setChecklist([...task.checklist, { id: tid(), text: '' }]) }
  function removeChecklistItem(id: string) { setChecklist(task.checklist.filter((i) => i.id !== id)) }
  function updateChecklistText(id: string, text: string) { setChecklist(task.checklist.map((i) => i.id === id ? { ...i, text } : i)) }
  function handleChecklistPaste(e: React.ClipboardEvent<HTMLInputElement>, itemId: string) {
    const lines = parsePasteLines(e.clipboardData.getData('text'))
    if (lines.length <= 1) return
    e.preventDefault()
    const idx = task.checklist.findIndex((i) => i.id === itemId)
    setChecklist([...task.checklist.slice(0, idx), ...lines.map((t) => ({ id: tid(), text: t })), ...task.checklist.slice(idx + 1)])
    setPasteHint(lines.length)
    setTimeout(() => setPasteHint(null), 2500)
  }

  function updateSection(sectionId: string, patch: Partial<InstructionSection>) {
    onChange({ ...task, sections: task.sections.map((s) => s.id === sectionId ? { ...s, ...patch } : s) })
  }
  function addSection() { onChange({ ...task, sections: [...task.sections, { id: tid(), title: '', steps: [{ id: tid(), text: '' }] }] }) }
  function removeSection(sectionId: string) { onChange({ ...task, sections: task.sections.filter((s) => s.id !== sectionId) }) }
  function addStep(sectionId: string) {
    const s = task.sections.find((s) => s.id === sectionId)
    if (s) updateSection(sectionId, { steps: [...s.steps, { id: tid(), text: '' }] })
  }
  function updateStep(sectionId: string, stepId: string, text: string) {
    const s = task.sections.find((s) => s.id === sectionId)
    if (s) updateSection(sectionId, { steps: s.steps.map((st) => st.id === stepId ? { ...st, text } : st) })
  }
  function removeStep(sectionId: string, stepId: string) {
    const s = task.sections.find((s) => s.id === sectionId)
    if (s) updateSection(sectionId, { steps: s.steps.filter((st) => st.id !== stepId) })
  }
  function handleStepPaste(e: React.ClipboardEvent<HTMLInputElement>, sectionId: string, stepId: string) {
    const lines = parsePasteLines(e.clipboardData.getData('text'))
    if (lines.length <= 1) return
    e.preventDefault()
    const s = task.sections.find((s) => s.id === sectionId)
    if (!s) return
    const idx = s.steps.findIndex((st) => st.id === stepId)
    updateSection(sectionId, { steps: [...s.steps.slice(0, idx), ...lines.map((t) => ({ id: tid(), text: t })), ...s.steps.slice(idx + 1)] })
    setPasteHint(lines.length)
    setTimeout(() => setPasteHint(null), 2500)
  }

  return (
    <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, overflow: 'hidden', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', px: 2, py: 1.5, borderBottom: '1px solid var(--mui-palette-divider)' }}>
        <Chip label={label} size="small" sx={{ bgcolor: chipColor.bg, color: chipColor.color, fontWeight: 600, fontSize: '0.75rem', height: 24 }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Default {label.toLowerCase()} task</Typography>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Task Name */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Task Name</Typography>
          <TextField fullWidth size="small" placeholder="e.g. Set up account access"
            autoFocus={autoFocus}
            value={task.title} onChange={(e) => onChange({ ...task, title: e.target.value })} />
        </Box>

        {/* Checklist */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.25 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Checklist</Typography>
            {pasteHint !== null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AutoAwesomeIcon sx={{ fontSize: 13, color: '#7C3AED' }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 500 }}>Parsed {pasteHint} items</Typography>
              </Box>
            )}
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5 }}>
            Paste a numbered list to fill these automatically.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {task.checklist.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab', flexShrink: 0 }} />
                <Box sx={{ width: 16, height: 16, borderRadius: '4px', border: '1.5px solid #CBD5E1', flexShrink: 0 }} />
                <TextField fullWidth size="small" placeholder="Add a checklist item…"
                  value={item.text}
                  onChange={(e) => updateChecklistText(item.id, e.target.value)}
                  slotProps={{ htmlInput: { onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => handleChecklistPaste(e, item.id) } }}
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.default' } }}
                />
                <IconButton size="small" onClick={() => removeChecklistItem(item.id)} sx={{ color: '#CBD5E1', '&:hover': { color: '#EF4444' } }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button size="small" startIcon={<AddIcon />} onClick={addChecklistItem} sx={{ mt: 1, color: '#1B2A3B', fontSize: '0.8rem' }}>
            Add Item
          </Button>
        </Box>

        {/* Instructions */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.25 }}>Instructions</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5 }}>
            Paste multi-line content into any step to split it automatically.
          </Typography>
          {task.sections.map((section, sIdx) => (
            <Box key={section.id} sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1.5, p: 2, mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab' }} />
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#1B2A3B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{sIdx + 1}</Box>
                <TextField fullWidth size="small" placeholder="Section title"
                  value={section.title} onChange={(e) => updateSection(section.id, { title: e.target.value })} />
                <IconButton size="small" onClick={() => removeSection(section.id)} sx={{ color: '#CBD5E1', '&:hover': { color: '#EF4444' } }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              {section.steps.map((step: InstructionStep, stIdx: number) => (
                <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 4, mb: 1 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', minWidth: 20 }}>{stIdx + 1}.</Typography>
                  <TextField fullWidth size="small" placeholder="Add step…"
                    value={step.text}
                    onChange={(e) => updateStep(section.id, step.id, e.target.value)}
                    slotProps={{ htmlInput: { onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => handleStepPaste(e, section.id, step.id) } }}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.default' } }}
                  />
                  <IconButton size="small" onClick={() => removeStep(section.id, step.id)} sx={{ color: '#CBD5E1', '&:hover': { color: '#EF4444' } }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => addStep(section.id)} sx={{ ml: 4, color: '#1B2A3B', fontSize: '0.78rem' }}>
                Add Step
              </Button>
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={addSection} sx={{ color: '#1B2A3B', fontSize: '0.8rem' }}>
            Add New Section
          </Button>
        </Box>

        {/* Due date */}
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>Due (days after event)</Typography>
          <TextField size="small" type="number" placeholder="e.g. 3"
            value={task.dueAfterDays || ''}
            onChange={(e) => onChange({ ...task, dueAfterDays: Number(e.target.value) })}
            sx={{ width: 160 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
            <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled', mt: '2px', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled', lineHeight: 1.5 }}>
              Champions receive reminders as the deadline approaches. Incomplete tasks are escalated to their manager — not handled by CubX.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function TaskPanel({ task, type }: { task: AppDetail['onboardingTask']; type: 'Onboarding' | 'Offboarding' }) {
  const chipStyle = type === 'Onboarding'
    ? { bg: '#DCFCE7', color: '#166534' }
    : { bg: '#FEE2E2', color: '#991B1B' }

  return (
    <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, mb: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25, borderBottom: '1px solid var(--mui-palette-divider)', bgcolor: '#FAFAFA' }}>
        <Chip label={type} size="small" sx={{ bgcolor: chipStyle.bg, color: chipStyle.color, fontWeight: 600, fontSize: '0.75rem', height: 22, borderRadius: 100 }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{task.title}</Typography>
        <Typography sx={{ ml: 'auto', fontSize: '0.8rem', color: 'text.secondary' }}>Due {task.dueAfterDays} days after event</Typography>
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

function TasksSection({ app, onSave }: { app: AppDetail; onSave: (patch: Partial<AppDetail>) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ onboardingTask: app.onboardingTask, offboardingTask: app.offboardingTask })

  function save() { onSave(draft); setEditing(false) }
  function cancel() { setDraft({ onboardingTask: app.onboardingTask, offboardingTask: app.offboardingTask }); setEditing(false) }

  return (
    <SectionCard title="Tasks Template" onEdit={editing ? undefined : () => setEditing(true)}>
      {editing ? (
        <Box>
          <TaskEditPanel label="Onboarding" task={draft.onboardingTask} onChange={(t) => setDraft({ ...draft, onboardingTask: t })} autoFocus />
          <TaskEditPanel label="Offboarding" task={draft.offboardingTask} onChange={(t) => setDraft({ ...draft, offboardingTask: t })} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
            <Button variant="contained" size="small" onClick={save}>Save</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <TaskPanel task={app.onboardingTask} type="Onboarding" />
          <TaskPanel task={app.offboardingTask} type="Offboarding" />
        </Box>
      )}
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
      <TasksSection app={app} onSave={onUpdate} />
    </Box>
  )
}
