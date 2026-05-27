import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Pagination from '@mui/material/Pagination'
import InputAdornment from '@mui/material/InputAdornment'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import Autocomplete from '@mui/material/Autocomplete'
import Popover from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AddIcon from '@mui/icons-material/Add'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const STEPS = ['Select App', 'Provisioning & Sign-on', 'Rules', 'Champion Election', 'Champion Tasks', 'Review']

interface CatalogApp {
  id: string
  name: string
  publisher: string
  logoColor: string
  logoInitial: string
  category: string
}

const CATALOG_APPS: CatalogApp[] = [
  { id: '1',  name: 'Microsoft Teams',  publisher: 'Microsoft Corporation',      logoColor: '#5558AF', logoInitial: 'T', category: 'Collaboration' },
  { id: '2',  name: 'Slack',            publisher: 'Salesforce.com, Inc.',        logoColor: '#4A154B', logoInitial: 'S', category: 'Collaboration' },
  { id: '3',  name: 'Zoom',             publisher: 'Zoom Video Communications',  logoColor: '#2D8CFF', logoInitial: 'Z', category: 'Communication' },
  { id: '4',  name: 'Google Meet',      publisher: 'Google LLC',                 logoColor: '#1A73E8', logoInitial: 'G', category: 'Communication' },
  { id: '5',  name: 'Webex',            publisher: 'Cisco Systems, Inc.',         logoColor: '#00BCEB', logoInitial: 'W', category: 'Communication' },
  { id: '6',  name: 'Skype',            publisher: 'Microsoft Corporation',       logoColor: '#00AFF0', logoInitial: 'S', category: 'Communication' },
  { id: '7',  name: 'Discord',          publisher: 'Discord Inc.',                logoColor: '#5865F2', logoInitial: 'D', category: 'Collaboration' },
  { id: '8',  name: 'BlueJeans',        publisher: 'Verizon Communications Inc.',logoColor: '#007DFF', logoInitial: 'B', category: 'Communication' },
  { id: '9',  name: 'Asana',            publisher: 'Asana, Inc.',                 logoColor: '#E8544A', logoInitial: 'A', category: 'Project Management' },
  { id: '10', name: 'Trello',           publisher: 'Atlassian Corporation',       logoColor: '#0052CC', logoInitial: 'T', category: 'Project Management' },
  { id: '11', name: 'Jira',             publisher: 'Atlassian Corporation',       logoColor: '#0052CC', logoInitial: 'J', category: 'Project Management' },
  { id: '12', name: 'Notion',           publisher: 'Notion Labs, Inc.',           logoColor: '#191919', logoInitial: 'N', category: 'Productivity' },
  { id: '13', name: 'Confluence',       publisher: 'Atlassian Corporation',       logoColor: '#0052CC', logoInitial: 'C', category: 'Collaboration' },
  { id: '14', name: 'GitHub',           publisher: 'GitHub, Inc.',                logoColor: '#24292E', logoInitial: 'G', category: 'Development' },
  { id: '15', name: 'Figma',            publisher: 'Figma, Inc.',                 logoColor: '#F24E1E', logoInitial: 'F', category: 'Design' },
  { id: '16', name: 'Salesforce',       publisher: 'Salesforce.com, Inc.',        logoColor: '#00A1E0', logoInitial: 'S', category: 'CRM' },
  { id: '17', name: 'HubSpot',          publisher: 'HubSpot, Inc.',              logoColor: '#FF7A59', logoInitial: 'H', category: 'CRM' },
  { id: '18', name: 'Workday',          publisher: 'Workday, Inc.',              logoColor: '#E3421B', logoInitial: 'W', category: 'HR' },
  { id: '19', name: 'Gusto',            publisher: 'Gusto, Inc.',                 logoColor: '#F45D48', logoInitial: 'G', category: 'HR' },
  { id: '20', name: 'Docusign',         publisher: 'DocuSign, Inc.',             logoColor: '#FF6D00', logoInitial: 'D', category: 'Productivity' },
  { id: '21', name: 'Dropbox',          publisher: 'Dropbox, Inc.',              logoColor: '#0061FF', logoInitial: 'D', category: 'Productivity' },
  { id: '22', name: 'Box',              publisher: 'Box, Inc.',                  logoColor: '#0061D5', logoInitial: 'B', category: 'Productivity' },
  { id: '23', name: 'ServiceNow',       publisher: 'ServiceNow, Inc.',           logoColor: '#62D84E', logoInitial: 'S', category: 'IT Management' },
  { id: '24', name: 'Okta',             publisher: 'Okta, Inc.',                  logoColor: '#007DC1', logoInitial: 'O', category: 'Security' },
]

const CATEGORIES = ['All categories', 'Collaboration', 'Communication', 'Project Management', 'Productivity', 'CRM', 'HR', 'Development', 'Design', 'Security', 'IT Management']

const PAGE_SIZE = 12

// ── Shared stepper bar ──────────────────────────────────────────────────────

function WizardStepper({ activeStep, onExit }: { activeStep: number; onExit: () => void }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      bgcolor: '#EBF0F5', px: 2, py: 2,
      borderRadius: '8px 8px 0 0', borderBottom: '1px solid #EAECF0',
    }}>
      <Box sx={{ width: 60 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {STEPS.map((label, idx) => {
          const completed = idx < activeStep
          const active = idx === activeStep
          return (
            <React.Fragment key={label}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                <Box sx={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: completed || active ? '#244B72' : '#9AA2B2',
                  color: '#fff',
                }}>
                  {completed
                    ? <CheckIcon sx={{ fontSize: 14 }} />
                    : <Typography sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: 1, letterSpacing: '0.4px' }}>{idx + 1}</Typography>
                  }
                </Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: active || completed ? 500 : 400, color: active || completed ? '#202938' : '#4A5466' }}>
                  {label}
                </Typography>
              </Box>
              {idx < STEPS.length - 1 && (
                <Box sx={{ flex: 1, height: '1px', bgcolor: '#D0D5DD', mx: 1 }} />
              )}
            </React.Fragment>
          )
        })}
      </Box>

      <Box sx={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonBase onClick={onExit} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#244B72', borderRadius: 1, px: 0.75, py: 0.5 }}>
          <CloseIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>Exit</Typography>
        </ButtonBase>
      </Box>
    </Box>
  )
}

// ── Selected-app header bar (shown on steps 2–5) ────────────────────────────

function AppBar({ app, chips }: { app: CatalogApp; chips?: React.ReactNode }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: 2,
      border: '1px solid #EAECF0', borderRadius: 1, p: 1.5,
      boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', bgcolor: '#fff',
    }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: app.logoColor, fontSize: '0.8rem', fontWeight: 700, borderRadius: 1, border: '1px solid #EAECF0', flexShrink: 0 }}>
        {app.logoInitial}
      </Avatar>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938' }}>{app.name}</Typography>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{app.publisher}</Typography>
      {chips}
    </Box>
  )
}

// ── Step 1: Select App ──────────────────────────────────────────────────────

function Step1SelectApp({
  selected, onSelect,
}: {
  selected: string | null
  onSelect: (id: string | null) => void
}) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All categories')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() =>
    CATALOG_APPS.filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.publisher.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All categories' || app.category === category
      return matchesSearch && matchesCategory
    }),
    [search, category],
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
      {/* Title + filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
          Select App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              size="small" placeholder="Search" value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              sx={{ width: 300 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20, color: '#9AA2B2' }} /></InputAdornment> } }}
            />
            <FormControl size="small" sx={{ width: 180 }}>
              <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} sx={{ fontSize: '0.875rem' }}>
                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            onClick={() => navigate('/apps/new')}
            sx={{ fontWeight: 500, textTransform: 'none', boxShadow: 'none', '&:hover': { boxShadow: 'none' }, px: 2.5 }}>
            Add Custom App
          </Button>
        </Box>
      </Box>

      {/* Grid */}
      {paginated.length > 0 ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          {paginated.map((app) => {
            const isSelected = selected === app.id
            return (
              <Box key={app.id} onClick={() => onSelect(isSelected ? null : app.id)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2, p: 2,
                  border: `1px solid ${isSelected ? '#244B72' : '#EAECF0'}`,
                  borderRadius: 1, cursor: 'pointer',
                  bgcolor: isSelected ? '#EBF0F5' : '#fff',
                  boxShadow: '0px 1px 1px rgba(0,0,0,0.08)',
                  transition: 'border-color 0.15s, background-color 0.15s',
                  '&:hover': { borderColor: '#244B72', bgcolor: isSelected ? '#EBF0F5' : '#F7F8FC' },
                }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: app.logoColor, fontSize: '1rem', fontWeight: 700, borderRadius: '12px', border: '1px solid #EAECF0', flexShrink: 0 }}>
                  {app.logoInitial}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px', lineHeight: 1.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {app.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', lineHeight: 1.43, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {app.publisher}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">No apps found.</Typography>
        </Box>
      )}

      {/* Pagination row */}
      <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid #EAECF0' }}>
        <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} shape="rounded" size="small" showFirstButton showLastButton />
      </Box>
    </Box>
  )
}

// ── Step 2: Provisioning & Sign-on ──────────────────────────────────────────

function Step2Provisioning({ app }: { app: CatalogApp }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <AppBar app={app} />
      <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
        Provisioning & sign-on
      </Typography>
    </Box>
  )
}

// ── Step 3: Rules ───────────────────────────────────────────────────────────

const RULE_FIELDS = ['Site', 'Department', 'Job Title']

const FAKE_USER_COUNTS: Record<string, number> = {
  'New York': 142, 'London': 98, 'Tokyo': 87, 'Sydney': 54, 'Berlin': 61,
  'Los Angeles': 113, 'Paris': 72, 'Singapore': 45, 'Toronto': 66, 'Dubai': 38,
  'Product': 87, 'Engineering': 134, 'Design': 43, 'Marketing': 67, 'Sales': 98,
  'HR': 32, 'Finance': 41, 'Operations': 56, 'Legal': 18, 'Support': 74,
  'Manager': 89, 'Director': 34, 'VP': 12, 'Engineer': 156, 'Analyst': 67,
  'Coordinator': 45, 'Specialist': 78, 'Lead': 43, 'Associate': 92,
  'Remote': 198, 'On-site': 267, 'Hybrid': 143, 'Flexible': 87,
  'Product Manager': 23, 'Data Scientist': 18, 'UX Designer': 12, 'Marketing Specialist': 15,
  'Sales Executive': 21, 'HR Coordinator': 9, 'Financial Analyst': 14, 'DevOps Engineer': 17,
  'Graphic Designer': 8, 'Social Media Manager': 11, 'Technical Writer': 7, 'Network Administrator': 6,
  'Sarah Johnson': 12, 'Michael Chen': 18, 'Emily Rodriguez': 15, 'David Kim': 11, 'Jessica Torres': 9,
}

const FIELD_VALUES: Record<string, string[]> = {
  Site: ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Los Angeles', 'Paris', 'Singapore', 'Toronto', 'Dubai'],
  Department: ['Product', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Legal', 'Support'],
  Role: ['Manager', 'Director', 'VP', 'Engineer', 'Analyst', 'Coordinator', 'Specialist', 'Lead', 'Associate'],
  Location: ['Remote', 'On-site', 'Hybrid', 'Flexible'],
  'Job Title': ['Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Specialist', 'Sales Executive', 'HR Coordinator', 'Financial Analyst', 'DevOps Engineer', 'Graphic Designer', 'Social Media Manager', 'Technical Writer', 'Network Administrator'],
  Manager: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Torres'],
}

interface Rule {
  id: string
  field: string
  values: string[]
}

interface PopoverState {
  ruleId: string
  section: 'include' | 'exclude'
  anchor: HTMLElement
}

function RuleRow({
  rule,
  onFieldChange,
  onRemoveValue,
  onDeleteRule,
  onOpenPicker,
}: {
  rule: Rule
  onFieldChange: (id: string, field: string) => void
  onRemoveValue: (id: string, value: string) => void
  onDeleteRule: (id: string) => void
  onOpenPicker: (e: React.MouseEvent<HTMLElement>, id: string) => void
}) {
  return (
    <Box sx={{
      position: 'relative',
      bgcolor: '#FCFBFD', border: '1px solid #EAECF0', borderRadius: '8px',
      px: '14px', pt: '12px', pb: '14px', mb: 1.5,
      display: 'flex', flexDirection: 'column', gap: 1.5,
    }}>
      <IconButton
        size="small"
        onClick={() => onDeleteRule(rule.id)}
        sx={{ position: 'absolute', top: 6, right: 6, color: '#C4CAD4', '&:hover': { color: '#DE5243', bgcolor: '#FCF4F2' } }}
      >
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>

      {/* Field selector + "is any of" */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size="small" sx={{ width: 180 }}>
          <Select
            value={rule.field}
            onChange={(e) => onFieldChange(rule.id, e.target.value)}
            sx={{ fontSize: '0.875rem' }}
          >
            {RULE_FIELDS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>is any of</Typography>
      </Box>

      {/* Value chips + add button */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75 }}>
        {rule.values.map((v) => (
          <Chip
            key={v}
            label={v}
            size="small"
            onDelete={() => onRemoveValue(rule.id, v)}
            deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }}
          />
        ))}
        <Box
          component="button"
          onClick={(e) => onOpenPicker(e as React.MouseEvent<HTMLElement>, rule.id)}
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.5,
            border: '1.5px dashed #0C2E50', borderRadius: 100,
            px: 1.25, py: '3px',
            bgcolor: 'transparent', cursor: 'pointer',
            color: '#244B72', fontSize: '0.8125rem', fontWeight: 500,
            '&:hover': { bgcolor: '#EBF0F5' },
          }}
        >
          <AddIcon sx={{ fontSize: 13 }} />
          Add {rule.field}
        </Box>
      </Box>
    </Box>
  )
}

function Step3Rules({ app }: { app: CatalogApp }) {
  const [includeRules, setIncludeRules] = useState<Rule[]>([
    { id: 'i1', field: 'Site', values: [] },
  ])
  const [excludeRules, setExcludeRules] = useState<Rule[]>([])
  const [showExclude, setShowExclude] = useState(false)
  const [popover, setPopover] = useState<PopoverState | null>(null)
  const [popoverSearch, setPopoverSearch] = useState('')

  const popoverRule = popover
    ? (popover.section === 'include' ? includeRules : excludeRules).find((r) => r.id === popover.ruleId) ?? null
    : null
  const allOptions = popoverRule ? (FIELD_VALUES[popoverRule.field] ?? []) : []
  const filteredOptions = allOptions.filter((v) => v.toLowerCase().includes(popoverSearch.toLowerCase()))

  function openPicker(e: React.MouseEvent<HTMLElement>, ruleId: string, section: 'include' | 'exclude') {
    setPopover({ ruleId, section, anchor: e.currentTarget })
    setPopoverSearch('')
  }

  function closePicker() {
    setPopover(null)
    setPopoverSearch('')
  }

  function toggleValue(value: string) {
    if (!popover || !popoverRule) return
    const setter = popover.section === 'include' ? setIncludeRules : setExcludeRules
    setter((prev) => prev.map((r) => {
      if (r.id !== popover.ruleId) return r
      const has = r.values.includes(value)
      return { ...r, values: has ? r.values.filter((v) => v !== value) : [...r.values, value] }
    }))
  }

  const matchCount = useMemo(() => {
    const included = includeRules.reduce((sum, rule) =>
      sum + rule.values.reduce((s, v) => s + (FAKE_USER_COUNTS[v] ?? 0), 0), 0)
    const excluded = excludeRules.reduce((sum, rule) =>
      sum + rule.values.reduce((s, v) => s + Math.floor((FAKE_USER_COUNTS[v] ?? 0) * 0.4), 0), 0)
    return Math.max(0, included - excluded)
  }, [includeRules, excludeRules])

  function addRule(setter: React.Dispatch<React.SetStateAction<Rule[]>>, prefix: string) {
    setter((prev) => [...prev, { id: `${prefix}${Date.now()}`, field: 'Site', values: [] }])
  }

  function deleteRule(setter: React.Dispatch<React.SetStateAction<Rule[]>>, id: string) {
    setter((prev) => prev.filter((r) => r.id !== id))
  }

  function changeField(setter: React.Dispatch<React.SetStateAction<Rule[]>>, id: string, field: string) {
    setter((prev) => prev.map((r) => r.id === id ? { ...r, field, values: [] } : r))
  }

  function removeValue(setter: React.Dispatch<React.SetStateAction<Rule[]>>, id: string, value: string) {
    setter((prev) => prev.map((r) => r.id === id ? { ...r, values: r.values.filter((v) => v !== value) } : r))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AppBar
        app={app}
        chips={
          <Chip label="SCIM" size="small" sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        }
      />

      <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
        Set Scoping Rules
      </Typography>

      {/* Include section */}
      <Box>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', mb: 1.5 }}>
          People who match all of
        </Typography>
        {includeRules.map((rule) => (
          <RuleRow
            key={rule.id}
            rule={rule}
            onFieldChange={(id, field) => changeField(setIncludeRules, id, field)}
            onRemoveValue={(id, value) => removeValue(setIncludeRules, id, value)}
            onDeleteRule={(id) => deleteRule(setIncludeRules, id)}
            onOpenPicker={(e, id) => openPicker(e, id, 'include')}
          />
        ))}
        <Button
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={() => addRule(setIncludeRules, 'i')}
          sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', p: 0, minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
        >
          Add Rule
        </Button>
      </Box>

      <Divider />

      {/* Exclude section */}
      {!showExclude ? (
        <Button
          startIcon={<BlockOutlinedIcon sx={{ fontSize: 16 }} />}
          onClick={() => { setShowExclude(true); addRule(setExcludeRules, 'e') }}
          sx={{ color: '#DE5243', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', p: 0, alignSelf: 'flex-start', minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
        >
          Add Exclusion
        </Button>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
            <BlockOutlinedIcon sx={{ fontSize: 18, color: '#DE5243' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#DE5243' }}>Except</Typography>
          </Box>
          {excludeRules.map((rule) => (
            <RuleRow
              key={rule.id}
              rule={rule}
              onFieldChange={(id, field) => changeField(setExcludeRules, id, field)}
              onRemoveValue={(id, value) => removeValue(setExcludeRules, id, value)}
              onDeleteRule={(id) => deleteRule(setExcludeRules, id)}
              onOpenPicker={(e, id) => openPicker(e, id, 'exclude')}
            />
          ))}
          <Button
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={() => addRule(setExcludeRules, 'e')}
            sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', p: 0, minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
          >
            Add Rule
          </Button>
        </Box>
      )}

      {/* Result bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#F7F8FC', borderRadius: '12px', px: '20px', py: '14px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#244B72' }}>{matchCount.toLocaleString()}</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>people match these rules</Typography>
      </Box>

      {/* Value picker popover */}
      <Popover
        open={Boolean(popover)}
        anchorEl={popover?.anchor}
        onClose={closePicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 280, borderRadius: 1, mt: 0.5, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)' } } }}
      >
        <Box sx={{ p: 1.5, borderBottom: '1px solid #EAECF0' }}>
          <TextField
            fullWidth
            size="small"
            placeholder={`Search ${popoverRule?.field ?? ''}...`}
            value={popoverSearch}
            onChange={(e) => setPopoverSearch(e.target.value)}
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box sx={{ maxHeight: 260, overflowY: 'auto', py: 0.5 }}>
          {filteredOptions.map((option) => (
            <Box
              key={option}
              onClick={() => toggleValue(option)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75, cursor: 'pointer', '&:hover': { bgcolor: '#F7F8FC' } }}
            >
              <Checkbox
                size="small"
                checked={popoverRule?.values.includes(option) ?? false}
                sx={{ p: 0, color: '#D0D5DD', '&.Mui-checked': { color: '#244B72' } }}
              />
              <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{option}</Typography>
            </Box>
          ))}
          {filteredOptions.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2, textAlign: 'center' }}>
              No options found.
            </Typography>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

// ── Step 4: Champion Election ───────────────────────────────────────────────

const DIRECT_USERS = [
  { id: 'u1', name: 'Sara Conner',  initials: 'SC', avatarColor: '#EC407A', jobTitle: 'HR Coordinator' },
  { id: 'u2', name: 'Jamie Vang',   initials: 'JV', avatarColor: '#26A69A', jobTitle: 'IT Manager' },
  { id: 'u3', name: 'Alex Brown',   initials: 'AB', avatarColor: '#7E57C2', jobTitle: 'Operations Lead' },
  { id: 'u4', name: 'Nina Okafor',  initials: 'NO', avatarColor: '#F59E0B', jobTitle: 'HR Coordinator' },
  { id: 'u5', name: 'Tom Smith',    initials: 'TS', avatarColor: '#8B5CF6', jobTitle: 'DevOps Engineer' },
  { id: 'u6', name: 'Carlos Reyes', initials: 'CR', avatarColor: '#7E57C2', jobTitle: 'Security Analyst' },
  { id: 'u7', name: 'Maria Lopez',  initials: 'ML', avatarColor: '#FFA726', jobTitle: 'Scrum Master' },
  { id: 'u8', name: 'Derek Chen',   initials: 'DC', avatarColor: '#26A69A', jobTitle: 'Backend Developer' },
]

function Step4ChampionElection({ app }: { app: CatalogApp }) {
  const [mode, setMode] = useState<'dynamic' | 'direct' | null>(null)
  const [scope, setScope] = useState('Company')
  const [jobTitle, setJobTitle] = useState('')
  const [search, setSearch] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = DIRECT_USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.jobTitle.toLowerCase().includes(search.toLowerCase())
  )

  function toggleUser(id: string) {
    setSelectedUsers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const MODES = [
    { value: 'dynamic' as const, label: 'Dynamic', subtitle: 'Org-chart based · scope + job title' },
    { value: 'direct'  as const, label: 'Direct',  subtitle: 'Specific named users' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AppBar app={app} />

      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px', mb: 0.5 }}>
          Champion Election
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', lineHeight: 1.57 }}>
          Sets how champions are selected when a task fires.
        </Typography>
      </Box>

      {/* Mode cards */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {MODES.map((m) => {
          const selected = mode === m.value
          return (
            <Box key={m.value} onClick={() => setMode(m.value)}
              sx={{
                flex: 1,
                border: selected ? '2px solid #85A4C2' : '1px solid #EAECF0',
                borderRadius: 1, p: 1.5, cursor: 'pointer',
                bgcolor: selected ? '#F7F8FC' : '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                '&:hover': { bgcolor: selected ? '#F7F8FC' : '#FCFBFD', borderColor: selected ? '#85A4C2' : '#D0D5DD' },
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', lineHeight: 1.57, mb: 0.25 }}>{m.label}</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', lineHeight: 1.43 }}>{m.subtitle}</Typography>
              </Box>
              {selected && (
                <Box sx={{ width: 24, height: 24, borderRadius: '99px', bgcolor: '#244B72', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckIcon sx={{ fontSize: 14, color: '#fff' }} />
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      {/* Dynamic config */}
      {mode === 'dynamic' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', mb: 0.75 }}>Scope</Typography>
              <FormControl size="small" sx={{ width: 180 }}>
                <Select value={scope} onChange={(e) => setScope(e.target.value)} sx={{ fontSize: '0.875rem' }}>
                  {['Client', 'Company', 'Site'].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', mb: 0.75 }}>Job Title</Typography>
              <Autocomplete
                size="small"
                options={FIELD_VALUES['Job Title']}
                value={jobTitle || null}
                onChange={(_, value) => setJobTitle(value ?? '')}
                sx={{ width: 260 }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select job title" />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#EBF0F5', borderRadius: 1, px: 2, py: 1.5 }}>
            <InfoOutlinedIcon sx={{ fontSize: 18, color: '#244B72', flexShrink: 0, mt: '1px' }} />
            <Typography sx={{ fontSize: '0.875rem', color: '#244B72', lineHeight: 1.57 }}>
              When a task fires, the first available champion matching this scope and job title will receive it. If they don't accept, it moves to the next match.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Direct config */}
      {mode === 'direct' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField size="small" placeholder="Search users" value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} /></InputAdornment> } }}
          />

          {selectedUsers.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {selectedUsers.map((id) => {
                const u = DIRECT_USERS.find((u) => u.id === id)!
                return (
                  <Chip key={id}
                    avatar={<Avatar sx={{ bgcolor: `${u.avatarColor} !important`, fontSize: '0.7rem !important', fontWeight: 600 }}>{u.initials}</Avatar>}
                    label={u.name} size="small"
                    onDelete={() => toggleUser(id)}
                    deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
                    sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 500, fontSize: '0.8125rem', height: 28, borderRadius: 100 }}
                  />
                )
              })}
            </Box>
          )}

          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, overflow: 'hidden', maxHeight: 300, overflowY: 'auto' }}>
            {filteredUsers.length > 0 ? filteredUsers.map((u, i) => {
              const checked = selectedUsers.includes(u.id)
              return (
                <Box key={u.id} onClick={() => toggleUser(u.id)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25,
                    borderBottom: i < filteredUsers.length - 1 ? '1px solid #EAECF0' : 'none',
                    cursor: 'pointer',
                    bgcolor: checked ? '#F0F5FA' : '#fff',
                    '&:hover': { bgcolor: checked ? '#EBF0F5' : '#F7F8FC' },
                  }}
                >
                  <Checkbox size="small" checked={checked}
                    onChange={() => toggleUser(u.id)}
                    onClick={(e) => e.stopPropagation()}
                    sx={{ p: 0, color: '#D0D5DD', '&.Mui-checked': { color: '#244B72' } }}
                  />
                  <Avatar sx={{ width: 32, height: 32, bgcolor: u.avatarColor, fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                    {u.initials}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938' }}>{u.name}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466' }}>{u.jobTitle}</Typography>
                  </Box>
                </Box>
              )
            }) : (
              <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 3, textAlign: 'center' }}>No users found.</Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#EBF0F5', borderRadius: 1, px: 2, py: 1.5 }}>
            <InfoOutlinedIcon sx={{ fontSize: 18, color: '#244B72', flexShrink: 0, mt: '1px' }} />
            <Typography sx={{ fontSize: '0.875rem', color: '#244B72', lineHeight: 1.57 }}>
              When a task fires, it is sent to all selected champions. The first to accept becomes the responsible champion.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

// ── Step 5: Champion Tasks ──────────────────────────────────────────────────

interface CItem { id: string; text: string }
interface IStep { id: string; text: string }
interface ISection { id: string; title: string; steps: IStep[] }

function TaskSetupCard({ type, title, onTitleChange, checklistItems, onAddChecklist, onRemoveChecklist, onEditChecklist, sections, onAddSection, onRemoveSection, onEditSectionTitle, onAddStep, onRemoveStep, onEditStep, dueDays, onDueDaysChange }: {
  type: 'onboarding' | 'offboarding'
  title: string
  onTitleChange: (v: string) => void
  checklistItems: CItem[]
  onAddChecklist: () => void
  onRemoveChecklist: (id: string) => void
  onEditChecklist: (id: string, text: string) => void
  sections: ISection[]
  onAddSection: () => void
  onRemoveSection: (id: string) => void
  onEditSectionTitle: (id: string, title: string) => void
  onAddStep: (sId: string) => void
  onRemoveStep: (sId: string, stId: string) => void
  onEditStep: (sId: string, stId: string, text: string) => void
  dueDays: number
  onDueDaysChange: (v: number) => void
}) {
  const isOnboarding = type === 'onboarding'
  return (
    <Box sx={{ border: '1px solid #EAECF0', borderRadius: '8px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderBottom: '1px solid #EAECF0' }}>
        <Chip label={isOnboarding ? 'Onboarding' : 'Offboarding'} size="small"
          sx={{ bgcolor: isOnboarding ? '#EDFCF2' : '#FCF4F2', color: isOnboarding ? '#095C37' : '#A63224', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
          Default {isOnboarding ? 'onboarding' : 'offboarding'} task
        </Typography>
      </Box>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Task Title */}
        <Box sx={{ pb: 2, borderBottom: '1px solid #EAECF0' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', mb: 0.75 }}>Task Title</Typography>
          <TextField fullWidth size="small" value={title} onChange={(e) => onTitleChange(e.target.value)} />
        </Box>

        {/* Checklist */}
        <Box sx={{ pb: 2, borderBottom: '1px solid #EAECF0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>Checklist</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mt: 0.5 }}>Step-by-step items champions check off as they work.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {checklistItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff', border: '1px solid #EAECF0', borderRadius: '8px', px: '13px', py: '9px', boxShadow: '0px 2px 2px rgba(0,0,0,0.03), 0px 4px 3px rgba(0,0,0,0.05)' }}>
                <DragIndicatorIcon sx={{ fontSize: 20, color: '#C4CAD4', flexShrink: 0 }} />
                <InputBase value={item.text} onChange={(e) => onEditChecklist(item.id, e.target.value)}
                  sx={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', '& input': { p: 0 } }} />
                <IconButton size="small" onClick={() => onRemoveChecklist(item.id)} sx={{ color: '#C4CAD4', p: 0.25, '&:hover': { color: '#DE5243' } }}>
                  <CloseIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon sx={{ fontSize: 18 }} />} onClick={onAddChecklist}
              sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', alignSelf: 'flex-start', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
              Add Item
            </Button>
          </Box>
        </Box>

        {/* Instructions */}
        <Box sx={{ pb: 2, borderBottom: '1px solid #EAECF0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>Instructions</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mt: 0.5 }}>Provide detailed guidance for your champions.</Typography>
          </Box>
          {/* Video upload zone */}
          <Box sx={{ bgcolor: '#F7F8FC', border: '2px dashed #D0D5DD', borderRadius: '16px', py: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { bgcolor: '#EBF0F5' } }}>
            <VideocamOutlinedIcon sx={{ fontSize: 28, color: '#4A5466' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', letterSpacing: '0.1px' }}>Upload Walkthrough Video</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#9AA2B2', letterSpacing: '0.4px' }}>MP4, MOV up to 50MB</Typography>
          </Box>
          {/* Instruction sections */}
          {sections.map((section, sIdx) => (
            <Box key={section.id} sx={{ bgcolor: '#fff', border: '1px solid #EAECF0', borderRadius: '8px', px: '13px', py: '9px', boxShadow: '0px 2px 2px rgba(0,0,0,0.03), 0px 4px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DragIndicatorIcon sx={{ fontSize: 20, color: '#C4CAD4', flexShrink: 0 }} />
                <Box sx={{ width: 22, height: 22, borderRadius: '99px', bgcolor: '#42A5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff', lineHeight: 1 }}>{sIdx + 1}</Typography>
                </Box>
                <InputBase value={section.title} onChange={(e) => onEditSectionTitle(section.id, e.target.value)}
                  sx={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', '& input': { p: 0 } }} />
                <IconButton size="small" onClick={() => onRemoveSection(section.id)} sx={{ color: '#C4CAD4', p: 0.25, '&:hover': { color: '#DE5243' } }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
              <Box sx={{ pl: '36px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.steps.map((step, stIdx) => (
                  <Box key={step.id}>
                    {stIdx > 0 && <Divider sx={{ mb: 1 }} />}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', flexShrink: 0 }}>{stIdx + 1}.</Typography>
                        <InputBase value={step.text} onChange={(e) => onEditStep(section.id, step.id, e.target.value)}
                          sx={{ flex: 1, fontSize: '0.875rem', color: '#4A5466', '& input': { p: 0 } }} />
                      </Box>
                      <IconButton size="small" onClick={() => onRemoveStep(section.id, step.id)} sx={{ color: '#C4CAD4', p: 0.25, flexShrink: 0, '&:hover': { color: '#DE5243' } }}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <Button startIcon={<AddIcon sx={{ fontSize: 14 }} />} onClick={() => onAddStep(section.id)}
                  sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.8125rem', textTransform: 'none', alignSelf: 'flex-start', p: 0, mt: 0.25, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                  Add Step
                </Button>
              </Box>
            </Box>
          ))}
          <Button startIcon={<AddIcon sx={{ fontSize: 18 }} />} onClick={onAddSection}
            sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', alignSelf: 'flex-start', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
            Add New Section
          </Button>
        </Box>

        {/* Due days */}
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', mb: 0.75 }}>Due (days after event)</Typography>
          <TextField size="small" type="number" value={dueDays}
            onChange={(e) => onDueDaysChange(parseInt(e.target.value) || 0)}
            sx={{ width: '100%' }}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        </Box>

      </Box>
    </Box>
  )
}

function Step4ChampionTasks({ app }: { app: CatalogApp }) {
  const [onTitle, setOnTitle] = useState(`Set up ${app.name} workspace access`)
  const [onChecklist, setOnChecklist] = useState<CItem[]>([
    { id: 'c1', text: `Create user account in ${app.name} admin panel` },
    { id: 'c2', text: 'Assign user to correct groups and permissions' },
    { id: 'c3', text: 'Set license type based on user role' },
    { id: 'c4', text: 'Confirm user received activation email and can log in' },
  ])
  const [onSections, setOnSections] = useState<ISection[]>([
    { id: 's1', title: `Access ${app.name} Admin`, steps: [
      { id: 'st1', text: `Go to ${app.name.toLowerCase()}.com/admin and sign in` },
      { id: 'st2', text: 'Navigate to Members → Invite People' },
    ]},
  ])
  const [onDays, setOnDays] = useState(3)

  const [offTitle, setOffTitle] = useState(`Remove ${app.name} workspace access`)
  const [offChecklist, setOffChecklist] = useState<CItem[]>([
    { id: 'c1', text: `Deactivate user in ${app.name} admin panel` },
    { id: 'c2', text: 'Reassign open tasks to another team member' },
  ])
  const [offSections, setOffSections] = useState<ISection[]>([
    { id: 's1', title: 'Deactivate the user account', steps: [
      { id: 'st1', text: 'Go to admin panel and find the user' },
      { id: 'st2', text: 'Click Deactivate. This revokes access immediately.' },
    ]},
  ])
  const [offDays, setOffDays] = useState(1)

  function addChecklist(setter: React.Dispatch<React.SetStateAction<CItem[]>>) {
    setter((p) => [...p, { id: `c${Date.now()}`, text: 'New checklist item' }])
  }
  function removeChecklist(setter: React.Dispatch<React.SetStateAction<CItem[]>>, id: string) {
    setter((p) => p.filter((c) => c.id !== id))
  }
  function editChecklist(setter: React.Dispatch<React.SetStateAction<CItem[]>>, id: string, text: string) {
    setter((p) => p.map((c) => c.id === id ? { ...c, text } : c))
  }
  function addSection(setter: React.Dispatch<React.SetStateAction<ISection[]>>) {
    setter((p) => [...p, { id: `s${Date.now()}`, title: 'New Section', steps: [] }])
  }
  function removeSection(setter: React.Dispatch<React.SetStateAction<ISection[]>>, id: string) {
    setter((p) => p.filter((s) => s.id !== id))
  }
  function editSectionTitle(setter: React.Dispatch<React.SetStateAction<ISection[]>>, id: string, title: string) {
    setter((p) => p.map((s) => s.id === id ? { ...s, title } : s))
  }
  function addStep(setter: React.Dispatch<React.SetStateAction<ISection[]>>, sId: string) {
    setter((p) => p.map((s) => s.id === sId ? { ...s, steps: [...s.steps, { id: `st${Date.now()}`, text: 'New step' }] } : s))
  }
  function removeStep(setter: React.Dispatch<React.SetStateAction<ISection[]>>, sId: string, stId: string) {
    setter((p) => p.map((s) => s.id === sId ? { ...s, steps: s.steps.filter((st) => st.id !== stId) } : s))
  }
  function editStep(setter: React.Dispatch<React.SetStateAction<ISection[]>>, sId: string, stId: string, text: string) {
    setter((p) => p.map((s) => s.id === sId ? { ...s, steps: s.steps.map((st) => st.id === stId ? { ...st, text } : st) } : s))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AppBar app={app} />
      <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
        Champion Tasks
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TaskSetupCard type="onboarding"
          title={onTitle} onTitleChange={setOnTitle}
          checklistItems={onChecklist} onAddChecklist={() => addChecklist(setOnChecklist)} onRemoveChecklist={(id) => removeChecklist(setOnChecklist, id)} onEditChecklist={(id, t) => editChecklist(setOnChecklist, id, t)}
          sections={onSections} onAddSection={() => addSection(setOnSections)} onRemoveSection={(id) => removeSection(setOnSections, id)} onEditSectionTitle={(id, t) => editSectionTitle(setOnSections, id, t)}
          onAddStep={(sId) => addStep(setOnSections, sId)} onRemoveStep={(sId, stId) => removeStep(setOnSections, sId, stId)} onEditStep={(sId, stId, t) => editStep(setOnSections, sId, stId, t)}
          dueDays={onDays} onDueDaysChange={setOnDays}
        />
        <TaskSetupCard type="offboarding"
          title={offTitle} onTitleChange={setOffTitle}
          checklistItems={offChecklist} onAddChecklist={() => addChecklist(setOffChecklist)} onRemoveChecklist={(id) => removeChecklist(setOffChecklist, id)} onEditChecklist={(id, t) => editChecklist(setOffChecklist, id, t)}
          sections={offSections} onAddSection={() => addSection(setOffSections)} onRemoveSection={(id) => removeSection(setOffSections, id)} onEditSectionTitle={(id, t) => editSectionTitle(setOffSections, id, t)}
          onAddStep={(sId) => addStep(setOffSections, sId)} onRemoveStep={(sId, stId) => removeStep(setOffSections, sId, stId)} onEditStep={(sId, stId, t) => editStep(setOffSections, sId, stId, t)}
          dueDays={offDays} onDueDaysChange={setOffDays}
        />
      </Box>
    </Box>
  )
}

// ── Step 5: Review ─────────────────────────────────────────────────────────

function Step5Review({ app }: { app: CatalogApp }) {
  const endpoint = `https://api.${app.name.toLowerCase().replace(/\s+/g, '')}.com/scim/v2`

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
        Review and Confirm
      </Typography>

      <Box sx={{ bgcolor: '#fff', border: '1px solid #EAECF0', borderRadius: '8px', boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', p: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* App header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: app.logoColor, fontSize: '1rem', fontWeight: 700, borderRadius: '8px', border: '1px solid #EAECF0', flexShrink: 0 }}>
            {app.logoInitial}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px', lineHeight: 1.75 }}>
              {app.name}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938', lineHeight: 1.43 }}>
              {app.publisher}
            </Typography>
          </Box>
        </Box>

        {/* Provisioning */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px' }}>Provisioning:</Typography>
          <Chip label="SCIM" size="small" sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        </Box>

        {/* Sign-on */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px' }}>Sign-on</Typography>
          <Chip label="SSO" size="small" sx={{ bgcolor: '#EDE7F6', color: '#512DA8', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        </Box>

        <Divider />

        {/* Provisioning Configuration */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
            Provisioning Configuration
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>API Endpoint:</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{endpoint}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Connection Status:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CheckIcon sx={{ fontSize: 16, color: '#16B364' }} />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#16B364', letterSpacing: '0.1px' }}>Verified</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Access Rules */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
            Access Rules
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Site:</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>New York, London, Tokyo, Sydney, Berlin</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Job Title:</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>Product Manager, Data Scientist, UX Designer</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>In Scope:</Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#244B72', letterSpacing: '0.1px' }}>312 users</Typography>
          </Box>
        </Box>

        <Divider />

        {/* Champion Election */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
            Champion Election
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Mode:</Typography>
            <Chip label="Dynamic" size="small" sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Scope:</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>Company</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', flexShrink: 0 }}>Job Title:</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>HR Coordinator</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#EBF0F5', borderRadius: 1, px: 2, py: 1.25 }}>
            <InfoOutlinedIcon sx={{ fontSize: 16, color: '#244B72', flexShrink: 0, mt: '2px' }} />
            <Typography sx={{ fontSize: '0.8125rem', color: '#244B72', lineHeight: 1.57 }}>
              First-come, first-served — the first available match will receive the task.
            </Typography>
          </Box>
        </Box>

        {/* Footer note */}
        <Typography sx={{ fontSize: '0.8125rem', color: '#4A5466', letterSpacing: '0.2px' }}>
          Additional users matching access rules will be provisioned automatically.
        </Typography>

      </Box>
    </Box>
  )
}

// ── Root component ──────────────────────────────────────────────────────────

export default function AddClientApp() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)

  const selectedApp = CATALOG_APPS.find((a) => a.id === selectedId) ?? null

  function handleBack() {
    if (activeStep === 0) navigate('/clients')
    else setActiveStep((s) => s - 1)
  }

  function handleNext() {
    if (activeStep < STEPS.length - 1) setActiveStep((s) => s + 1)
  }

  const canNext = activeStep === 0 ? !!selectedId : true

  return (
    <Box sx={{ p: 3, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {/* Stepper + content card */}
      <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', mb: 2 }}>
        <WizardStepper activeStep={activeStep} onExit={() => navigate('/clients')} />

        <Box sx={{ bgcolor: '#fff', p: 3, flex: 1, overflow: 'auto', borderRadius: '0 0 8px 8px' }}>
          {activeStep === 0 && (
            <Step1SelectApp
              selected={selectedId}
              onSelect={setSelectedId}
            />
          )}
          {activeStep === 1 && selectedApp && (
            <Step2Provisioning app={selectedApp} />
          )}
          {activeStep === 2 && selectedApp && (
            <Step3Rules app={selectedApp} />
          )}
          {activeStep === 3 && selectedApp && (
            <Step4ChampionElection app={selectedApp} />
          )}
          {activeStep === 4 && selectedApp && (
            <Step4ChampionTasks app={selectedApp} />
          )}
          {activeStep === 5 && selectedApp && (
            <Step5Review app={selectedApp} />
          )}
        </Box>
      </Box>

      {/* Back / Next — outside the card, always at the bottom */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Button
          variant="outlined"
          startIcon={<ChevronLeftIcon sx={{ fontSize: 20 }} />}
          onClick={handleBack}
          sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: '0px 1px 2px rgba(16,24,40,0.05)' }}
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          variant="contained"
          endIcon={activeStep < STEPS.length - 1 ? <ChevronRightIcon sx={{ fontSize: 20 }} /> : undefined}
          disabled={!canNext}
          onClick={activeStep === STEPS.length - 1 ? () => { setToastOpen(true); setTimeout(() => navigate('/clients'), 1500) } : handleNext}
          sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
        >
          {activeStep === STEPS.length - 1 ? 'Add App' : 'Next'}
        </Button>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)} sx={{ width: '100%' }}>
          {selectedApp ? `${selectedApp.name} added successfully` : 'App added successfully'}
        </Alert>
      </Snackbar>
    </Box>
  )
}
