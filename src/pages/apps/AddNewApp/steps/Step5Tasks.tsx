import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import type { AppData, TaskTemplate, ChecklistItem, InstructionSection, InstructionStep } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

let idCounter = 100
function uid() { return String(++idCounter) }

type ActionType = 'Onboarding' | 'Offboarding'

function parsePaste(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^[\d]+[.)]\s*|^[-•*]\s*/, '').trim())
    .filter(Boolean)
}

interface TaskPanelProps {
  label: ActionType
  task: TaskTemplate
  onChange: (t: TaskTemplate) => void
  onRemove: () => void
}

function TaskPanel({ label, task, onChange, onRemove }: TaskPanelProps) {
  const videoRef = useRef<HTMLInputElement>(null)
  const [pasteHint, setPasteHint] = useState<number | null>(null)

  const chipColor = label === 'Onboarding'
    ? { bg: '#DCFCE7', color: '#166534' }
    : { bg: '#FEE2E2', color: '#991B1B' }

  function updateChecklist(items: ChecklistItem[]) {
    onChange({ ...task, checklist: items })
  }

  function addChecklistItem() {
    updateChecklist([...task.checklist, { id: uid(), text: '' }])
  }

  function removeChecklistItem(id: string) {
    updateChecklist(task.checklist.filter((i) => i.id !== id))
  }

  function updateChecklistText(id: string, text: string) {
    updateChecklist(task.checklist.map((i) => (i.id === id ? { ...i, text } : i)))
  }

  function handleChecklistPaste(e: React.ClipboardEvent<HTMLInputElement>, itemId: string) {
    const text = e.clipboardData.getData('text')
    const lines = parsePaste(text)
    if (lines.length <= 1) return
    e.preventDefault()
    const idx = task.checklist.findIndex((i) => i.id === itemId)
    const before = task.checklist.slice(0, idx)
    const after = task.checklist.slice(idx + 1)
    const newItems = lines.map((t) => ({ id: uid(), text: t }))
    updateChecklist([...before, ...newItems, ...after])
    setPasteHint(lines.length)
    setTimeout(() => setPasteHint(null), 2500)
  }

  function addSection() {
    onChange({
      ...task,
      sections: [...task.sections, { id: uid(), title: '', steps: [{ id: uid(), text: '' }] }],
    })
  }

  function updateSection(sectionId: string, patch: Partial<InstructionSection>) {
    onChange({
      ...task,
      sections: task.sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
    })
  }

  function removeSection(sectionId: string) {
    onChange({ ...task, sections: task.sections.filter((s) => s.id !== sectionId) })
  }

  function addStep(sectionId: string) {
    const section = task.sections.find((s) => s.id === sectionId)
    if (!section) return
    updateSection(sectionId, { steps: [...section.steps, { id: uid(), text: '' }] })
  }

  function updateStep(sectionId: string, stepId: string, text: string) {
    const section = task.sections.find((s) => s.id === sectionId)
    if (!section) return
    updateSection(sectionId, {
      steps: section.steps.map((st) => (st.id === stepId ? { ...st, text } : st)),
    })
  }

  function removeStep(sectionId: string, stepId: string) {
    const section = task.sections.find((s) => s.id === sectionId)
    if (!section) return
    updateSection(sectionId, { steps: section.steps.filter((st) => st.id !== stepId) })
  }

  function handleStepPaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    sectionId: string,
    stepId: string,
  ) {
    const text = e.clipboardData.getData('text')
    const lines = parsePaste(text)
    if (lines.length <= 1) return
    e.preventDefault()
    const section = task.sections.find((s) => s.id === sectionId)
    if (!section) return
    const idx = section.steps.findIndex((st) => st.id === stepId)
    const before = section.steps.slice(0, idx)
    const after = section.steps.slice(idx + 1)
    const newSteps = lines.map((t) => ({ id: uid(), text: t }))
    updateSection(sectionId, { steps: [...before, ...newSteps, ...after] })
    setPasteHint(lines.length)
    setTimeout(() => setPasteHint(null), 2500)
  }

  function handleVideo(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...task, video: e.target.files?.[0] ?? null })
  }

  return (
    <Box sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1, overflow: 'hidden', mb: 3, maxWidth: 900 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper', px: 2, py: 1.5, borderBottom: '1px solid var(--mui-palette-divider)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip label={label} size="small"
            sx={{ bgcolor: chipColor.bg, color: chipColor.color, fontWeight: 600, fontSize: '0.75rem', height: 24 }} />
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Default {label.toLowerCase()} task
          </Typography>
        </Box>
        <Tooltip title="Remove this task template">
          <IconButton size="small" onClick={onRemove} sx={{ color: 'text.disabled', '&:hover': { color: '#EF4444', bgcolor: '#FEF2F2' } }}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Task Name */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Task Name</Typography>
          <TextField fullWidth size="small" placeholder="e.g. Set up Docusign account access"
            value={task.title}
            onChange={(e) => onChange({ ...task, title: e.target.value })}
          />
        </Box>

        {/* Checklist */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.25 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Checklist</Typography>
            {pasteHint !== null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AutoAwesomeIcon sx={{ fontSize: 13, color: '#7C3AED' }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 500 }}>
                  Parsed {pasteHint} items
                </Typography>
              </Box>
            )}
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5 }}>
            Step-by-step items champions check off as they work. Paste a numbered list to fill these automatically.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {task.checklist.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab', flexShrink: 0 }} />
                <Box sx={{ width: 16, height: 16, borderRadius: '4px', border: '1.5px solid #CBD5E1', flexShrink: 0 }} />
                <TextField fullWidth size="small"
                  placeholder="Add a checklist item…"
                  value={item.text}
                  onChange={(e) => updateChecklistText(item.id, e.target.value)}
                  slotProps={{ htmlInput: { onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => handleChecklistPaste(e, item.id) } }}
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.default' } }}
                />
                <IconButton size="small" onClick={() => removeChecklistItem(item.id)} sx={{ color: 'text.disabled', '&:hover': { color: '#EF4444' } }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button size="small" startIcon={<AddIcon />} onClick={addChecklistItem}
            sx={{ mt: 1, color: '#1B2A3B', fontSize: '0.8rem' }}>
            Add Item
          </Button>
        </Box>

        {/* Instructions */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.25 }}>Instructions</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5 }}>
            Detailed guidance for champions. Paste multi-line content into any step to split it automatically.
          </Typography>

          <Box onClick={() => videoRef.current?.click()}
            sx={{ border: '2px dashed #CBD5E1', borderRadius: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', mb: 2, '&:hover': { borderColor: 'text.disabled' } }}>
            <VideoLibraryOutlinedIcon sx={{ color: 'text.disabled', fontSize: 28 }} />
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
              {task.video ? task.video.name : 'Upload Walkthrough Video'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled' }}>MP4, MOV up to 50MB</Typography>
          </Box>
          <input ref={videoRef} type="file" accept="video/mp4,video/quicktime" hidden onChange={handleVideo} />

          {task.sections.map((section, sIdx) => (
            <Box key={section.id} sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1.5, p: 2, mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab' }} />
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#1B2A3B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {sIdx + 1}
                </Box>
                <TextField fullWidth size="small" placeholder="Section title (e.g. Access Admin Panel)"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                />
                <IconButton size="small" onClick={() => removeSection(section.id)} sx={{ color: 'text.disabled', '&:hover': { color: '#EF4444' } }}>
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
                  <IconButton size="small" onClick={() => removeStep(section.id, step.id)} sx={{ color: 'text.disabled', '&:hover': { color: '#EF4444' } }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => addStep(section.id)}
                sx={{ ml: 4, color: '#1B2A3B', fontSize: '0.78rem' }}>
                Add Step
              </Button>
            </Box>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={addSection}
            sx={{ color: '#1B2A3B', fontSize: '0.8rem' }}>
            Add New Section
          </Button>
        </Box>

        {/* Due date */}
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>Due (days after event)</Typography>
          <TextField size="small" type="number" placeholder="e.g. 3"
            value={task.dueAfterDays}
            onChange={(e) => onChange({ ...task, dueAfterDays: e.target.value })}
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

export default function Step5Tasks({ data, update }: Props) {
  const [addedTypes, setAddedTypes] = useState<ActionType[]>([])
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const availableTypes: ActionType[] = (['Onboarding', 'Offboarding'] as ActionType[]).filter(
    (t) => !addedTypes.includes(t),
  )

  function addTask(type: ActionType) {
    setAddedTypes((prev) => [...prev, type])
    setMenuAnchor(null)
  }

  function removeTask(type: ActionType) {
    setAddedTypes((prev) => prev.filter((t) => t !== type))
  }

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>Default Task Templates</Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Define default champion tasks for each lifecycle event. Add only the actions relevant to this app.
      </Typography>

      {addedTypes.length === 0 && (
        <Box sx={{ border: '2px dashed var(--mui-palette-divider)', borderRadius: 1, py: 4, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 3, bgcolor: 'background.paper' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path opacity="0.2" d="M39 9V40.5C39 40.8978 38.842 41.2794 38.5607 41.5607C38.2794 41.842 37.8978 42 37.5 42H10.5C10.1022 42 9.72064 41.842 9.43934 41.5607C9.15804 41.2794 9 40.8978 9 40.5V9C9 8.60218 9.15804 8.22064 9.43934 7.93934C9.72064 7.65804 10.1022 7.5 10.5 7.5H18C17.0243 8.79713 16.4977 10.3768 16.5 12V13.5H31.5V12C31.5023 10.3768 30.9757 8.79713 30 7.5H37.5C37.8978 7.5 38.2794 7.65804 38.5607 7.93934C38.842 8.22064 39 8.60218 39 9Z" fill="#244B72"/>
            <path d="M31.5 28.4997C31.5 28.8976 31.342 29.2791 31.0607 29.5604C30.7794 29.8417 30.3978 29.9997 30 29.9997H18C17.6022 29.9997 17.2206 29.8417 16.9393 29.5604C16.658 29.2791 16.5 28.8976 16.5 28.4997C16.5 28.1019 16.658 27.7204 16.9393 27.4391C17.2206 27.1578 17.6022 26.9997 18 26.9997H30C30.3978 26.9997 30.7794 27.1578 31.0607 27.4391C31.342 27.7204 31.5 28.1019 31.5 28.4997ZM30 20.9997H18C17.6022 20.9997 17.2206 21.1578 16.9393 21.4391C16.658 21.7204 16.5 22.1019 16.5 22.4997C16.5 22.8976 16.658 23.2791 16.9393 23.5604C17.2206 23.8417 17.6022 23.9997 18 23.9997H30C30.3978 23.9997 30.7794 23.8417 31.0607 23.5604C31.342 23.2791 31.5 22.8976 31.5 22.4997C31.5 22.1019 31.342 21.7204 31.0607 21.4391C30.7794 21.1578 30.3978 20.9997 30 20.9997ZM40.5 8.99973V40.4997C40.5 41.2954 40.1839 42.0584 39.6213 42.621C39.0587 43.1837 38.2956 43.4997 37.5 43.4997H10.5C9.70435 43.4997 8.94129 43.1837 8.37868 42.621C7.81607 42.0584 7.5 41.2954 7.5 40.4997V8.99973C7.5 8.20408 7.81607 7.44102 8.37868 6.87841C8.94129 6.3158 9.70435 5.99973 10.5 5.99973H17.2988C18.1416 5.05609 19.1742 4.30109 20.329 3.78415C21.4838 3.26721 22.7348 3 24 3C25.2652 3 26.5162 3.26721 27.671 3.78415C28.8258 4.30109 29.8584 5.05609 30.7013 5.99973H37.5C38.2956 5.99973 39.0587 6.3158 39.6213 6.87841C40.1839 7.44102 40.5 8.20408 40.5 8.99973ZM18 11.9997H30C30 10.4084 29.3679 8.88231 28.2426 7.75709C27.1174 6.63187 25.5913 5.99973 24 5.99973C22.4087 5.99973 20.8826 6.63187 19.7574 7.75709C18.6321 8.88231 18 10.4084 18 11.9997ZM37.5 8.99973H32.4844C32.8256 9.96313 33 10.9777 33 11.9997V13.4997C33 13.8976 32.842 14.2791 32.5607 14.5604C32.2794 14.8417 31.8978 14.9997 31.5 14.9997H16.5C16.1022 14.9997 15.7206 14.8417 15.4393 14.5604C15.158 14.2791 15 13.8976 15 13.4997V11.9997C15 10.9777 15.1744 9.96313 15.5156 8.99973H10.5V40.4997H37.5V8.99973Z" fill="#244B72"/>
          </svg>
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.43 }}>
            No task templates added yet.
          </Typography>
        </Box>
      )}

      {addedTypes.map((type) => (
        <TaskPanel
          key={type}
          label={type}
          task={type === 'Onboarding' ? data.onboardingTask : data.offboardingTask}
          onChange={(t) => update(type === 'Onboarding' ? { onboardingTask: t } : { offboardingTask: t })}
          onRemove={() => removeTask(type)}
        />
      ))}

      {availableTypes.length > 0 && (
        <>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{ borderColor: 'divider', color: '#1B2A3B', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none' }}
          >
            Add Task
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            slotProps={{ paper: { sx: { mt: 0.5, borderRadius: 1, boxShadow: '0px 4px 16px rgba(0,0,0,0.1)', minWidth: 180 } } }}
          >
            {availableTypes.map((type) => (
              <MenuItem key={type} onClick={() => addTask(type)} sx={{ fontSize: '0.875rem', gap: 1.5, py: 1 }}>
                <Box sx={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  bgcolor: type === 'Onboarding' ? '#166534' : '#991B1B',
                }} />
                {type}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  )
}
