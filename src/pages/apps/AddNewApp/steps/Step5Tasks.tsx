import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import type { AppData, TaskTemplate, ChecklistItem, InstructionSection, InstructionStep } from '../index'

interface Props {
  data: AppData
  update: (partial: Partial<AppData>) => void
  onNext: () => void
  onBack: () => void
}

let idCounter = 100

function uid() {
  return String(++idCounter)
}

interface TaskPanelProps {
  label: 'Onboarding' | 'Offboarding'
  task: TaskTemplate
  onChange: (t: TaskTemplate) => void
}

function TaskPanel({ label, task, onChange }: TaskPanelProps) {
  const videoRef = useRef<HTMLInputElement>(null)

  const chipColor = label === 'Onboarding' ? { bg: '#DCFCE7', color: '#166534' } : { bg: '#FEE2E2', color: '#991B1B' }

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

  function addStep(sectionId: string) {
    updateSection(sectionId, {
      steps: [
        ...(task.sections.find((s) => s.id === sectionId)?.steps ?? []),
        { id: uid(), text: '' },
      ],
    })
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

  function handleVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    onChange({ ...task, video: file })
  }

  return (
    <Box
      sx={{
        border: '1px solid #E2E8F0',
        borderRadius: 1,
        overflow: 'hidden',
        mb: 3,
        maxWidth: 900,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#F8FAFC', px: 2, py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
        <Chip
          label={label}
          size="small"
          sx={{ bgcolor: chipColor.bg, color: chipColor.color, fontWeight: 600, fontSize: '0.75rem', height: 24 }}
        />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Default {label.toLowerCase()} task</Typography>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Task Title */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Task Title</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Placeholder"
            value={task.title}
            onChange={(e) => onChange({ ...task, title: e.target.value })}
          />
        </Box>

        {/* Checklist */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.25 }}>Checklist</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mb: 1.5 }}>
            Step-by-step items champions check off as they work.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {task.checklist.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab', flexShrink: 0 }} />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Create user account in admin panel"
                  value={item.text}
                  onChange={(e) => updateChecklistText(item.id, e.target.value)}
                />
                <IconButton size="small" onClick={() => removeChecklistItem(item.id)} sx={{ color: '#CBD5E1' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addChecklistItem}
            sx={{ mt: 1, color: '#1B2A3B', fontSize: '0.8rem' }}
          >
            Add Item
          </Button>
        </Box>

        {/* Instructions */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.25 }}>Instructions</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mb: 1.5 }}>
            Provide detailed guidance for your champions.
          </Typography>

          {/* Video upload */}
          <Box
            onClick={() => videoRef.current?.click()}
            sx={{
              border: '2px dashed #CBD5E1',
              borderRadius: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              mb: 2,
              '&:hover': { borderColor: '#94A3B8' },
            }}
          >
            <VideoLibraryOutlinedIcon sx={{ color: '#94A3B8', fontSize: 28 }} />
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
              {task.video ? task.video.name : 'Upload Walkthrough Video'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8' }}>MP4, MOV up to 50MB</Typography>
          </Box>
          <input ref={videoRef} type="file" accept="video/mp4,video/quicktime" hidden onChange={handleVideo} />

          {/* Instruction sections */}
          {task.sections.map((section, sIdx) => (
            <Box
              key={section.id}
              sx={{ border: '1px solid #E2E8F0', borderRadius: 1.5, p: 2, mb: 1.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <DragIndicatorIcon sx={{ color: '#CBD5E1', fontSize: 18, cursor: 'grab' }} />
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: '#1B2A3B',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {sIdx + 1}
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Section title (e.g. Access Admin Panel)"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                />
              </Box>
              {section.steps.map((step: InstructionStep, stIdx: number) => (
                <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 4, mb: 1 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#64748B', minWidth: 20 }}>
                    {stIdx + 1}.
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add step"
                    value={step.text}
                    onChange={(e) => updateStep(section.id, step.id, e.target.value)}
                  />
                  <IconButton size="small" onClick={() => removeStep(section.id, step.id)} sx={{ color: '#CBD5E1' }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => addStep(section.id)}
                sx={{ ml: 4, color: '#1B2A3B', fontSize: '0.78rem' }}
              >
                Add Step
              </Button>
            </Box>
          ))}

          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addSection}
            sx={{ color: '#1B2A3B', fontSize: '0.8rem' }}
          >
            Add New Section
          </Button>
        </Box>

        {/* Due days */}
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.75 }}>Due (days after event)</Typography>
          <TextField
            size="small"
            placeholder="Placeholder"
            type="number"
            value={task.dueAfterDays}
            onChange={(e) => onChange({ ...task, dueAfterDays: e.target.value })}
            sx={{ width: 200 }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default function Step5Tasks({ data, update }: Props) {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Default Task Templates
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        Define default champion tasks for each lifecycle event.
      </Typography>

      <TaskPanel
        label="Onboarding"
        task={data.onboardingTask}
        onChange={(t) => update({ onboardingTask: t })}
      />

      <TaskPanel
        label="Offboarding"
        task={data.offboardingTask}
        onChange={(t) => update({ offboardingTask: t })}
      />

    </Box>
  )
}
