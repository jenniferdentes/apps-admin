import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CheckIcon from '@mui/icons-material/Check'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import DoneIcon from '@mui/icons-material/Done'
import SyncIcon from '@mui/icons-material/Sync'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SearchIcon from '@mui/icons-material/Search'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Autocomplete from '@mui/material/Autocomplete'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import AddUserModal from './AddUserModal'
import { PROV_CHIPS as PROV_CHIP, SIGNON_CHIPS as SO_CHIP } from '../../../lib/methodChips'

interface AppUser {
  id: string
  name: string
  initials: string
  avatarColor: string
  email: string
  jobTitle: string
  site: string
  departments: string
  dateAdded: string
  status: 'Active' | 'Inactive'
}

const APP_USERS: AppUser[] = [
  { id: '1',  name: 'Xin Yue',         initials: 'XY', avatarColor: '#26A69A', email: 'jcooper@company.com',  jobTitle: 'Software Developer',  site: 'Creative Sparks',   departments: 'Product, Software', dateAdded: 'Jan 15, 2026', status: 'Active' },
  { id: '2',  name: 'Alex Brown',       initials: 'AB', avatarColor: '#7E57C2', email: 'abrown@company.com',   jobTitle: 'Product Manager',     site: 'Creative Sparks',   departments: 'Product',           dateAdded: 'Mar 10, 2024', status: 'Active' },
  { id: '3',  name: 'Sara Conner',      initials: 'SC', avatarColor: '#EC407A', email: 'sconner@company.com',  jobTitle: 'UX Designer',         site: 'Riverside Clinic',  departments: 'Design',            dateAdded: 'Feb 20, 2025', status: 'Active' },
  { id: '4',  name: 'Lisa Kim',         initials: 'LK', avatarColor: '#FFA726', email: 'lkim@company.com',     jobTitle: 'Data Analyst',        site: 'Maplewood Hub',     departments: 'Analytics, Data',   dateAdded: 'Apr 25, 2025', status: 'Active' },
  { id: '5',  name: 'Tom Smith',        initials: 'TS', avatarColor: '#D500F9', email: 'tsmith@company.com',   jobTitle: 'DevOps Engineer',     site: 'Creative Sparks',   departments: 'Engineering',       dateAdded: 'Jun 15, 2024', status: 'Active' },
  { id: '6',  name: 'Jamie Vang',       initials: 'JV', avatarColor: '#26A69A', email: 'jvang@company.com',    jobTitle: 'QA Engineer',         site: 'Northshore Hub',    departments: 'Engineering',       dateAdded: 'Aug 5, 2024',  status: 'Active' },
  { id: '7',  name: 'Maria Lopez',      initials: 'ML', avatarColor: '#7E57C2', email: 'mlopez@company.com',   jobTitle: 'Scrum Master',        site: 'Creative Sparks',   departments: 'Product',           dateAdded: 'Sep 12, 2024', status: 'Active' },
  { id: '8',  name: 'Derek Chen',       initials: 'DC', avatarColor: '#FFA726', email: 'dchen@company.com',    jobTitle: 'Backend Developer',   site: 'Riverside Clinic',  departments: 'Software',          dateAdded: 'Nov 1, 2024',  status: 'Active' },
  { id: '9',  name: 'Priya Sharma',     initials: 'PS', avatarColor: '#EC407A', email: 'psharma@company.com',  jobTitle: 'Data Scientist',      site: 'Maplewood Hub',     departments: 'Analytics',         dateAdded: 'Dec 18, 2024', status: 'Active' },
  { id: '10', name: 'Ben Wallace',      initials: 'BW', avatarColor: '#D500F9', email: 'bwallace@company.com', jobTitle: 'Frontend Developer',  site: 'Creative Sparks',   departments: 'Software',          dateAdded: 'Jan 9, 2025',  status: 'Active' },
  { id: '11', name: 'Nina Okafor',      initials: 'NO', avatarColor: '#26A69A', email: 'nokafor@company.com',  jobTitle: 'HR Coordinator',      site: 'Northshore Hub',    departments: 'Human Resources',   dateAdded: 'Feb 3, 2025',  status: 'Active' },
  { id: '12', name: 'Carlos Reyes',     initials: 'CR', avatarColor: '#7E57C2', email: 'creyes@company.com',   jobTitle: 'Security Analyst',    site: 'Creative Sparks',   departments: 'IT, Security',      dateAdded: 'Mar 22, 2025', status: 'Active' },
]

const SITES = ['All sites', 'Creative Sparks', 'Riverside Clinic', 'Maplewood Hub', 'Northshore Hub']

interface ChampionUser {
  id: string
  initials: string
  name: string
  email: string
  avatarColor: string
}

interface ChampionElectionData {
  mode: 'dynamic' | 'direct'
  scope: string
  jobTitle: string
  directUsers: ChampionUser[]
}

interface TaskData {
  title: string
  dueAfterDays: number
  checklist: string[]
  instructions: { title: string; steps: string[] }[]
}

const CLIENT_APPS: Record<string, {
  name: string
  logoColor: string
  logoInitial: string
  provisioning: string
  provisioningDesc: string
  signOn: string
  signOnDesc: string
  users: number
  scimEndpoint: string
  apiToken: string
  lastSync: string
  primaryChampion: { initials: string; name: string; email: string }
  backupChampion: { initials: string; name: string; email: string }
  championElection: ChampionElectionData
  onboarding: TaskData
  offboarding: TaskData
  rules: {
    matchCount: number
    include: { field: string; values: string[] }[]
    exclude: { field: string; values: string[] }[]
  }
}> = {
  '1': {
    name: 'Docusign',
    logoColor: '#FF6D00', logoInitial: 'D',
    provisioning: 'SCIM', provisioningDesc: 'Users are automatically provisioned and deprovisioned via API whenever directory changes occur',
    signOn: 'SSO', signOnDesc: 'Users sign in with their Microsoft account',
    users: 102,
    scimEndpoint: 'https://api.docusign.com/scim/v2',
    apiToken: '••••••••••••••abc123def',
    lastSync: 'Feb 12, 2026 at 9:15 AM',
    primaryChampion: { initials: 'SC', name: 'Sara Conner', email: 'sconner@company.com' },
    backupChampion: { initials: 'JV', name: 'Jamie Vang', email: 'jvang@company.com' },
    championElection: { mode: 'dynamic', scope: 'Company', jobTitle: 'HR Coordinator', directUsers: [] },
    onboarding: {
      title: 'Set up Docusign account access',
      dueAfterDays: 3,
      checklist: ['Create user account in Docusign admin panel', 'Assign user to correct groups and templates', 'Set permission profile based on user role', 'Confirm user received activation email and can log in'],
      instructions: [
        { title: 'Access Docusign Admin', steps: ['Go to admindemo.docusign.com and sign in', 'Navigate to Users → Add User'] },
        { title: 'Configure permissions', steps: ['Assign the correct permission profile based on their role.'] },
      ],
    },
    offboarding: {
      title: 'Remove Docusign account access',
      dueAfterDays: 3,
      checklist: ['Deactivate user in Docusign admin panel', 'Reassign open envelopes to another user'],
      instructions: [
        { title: 'Deactivate the user account', steps: ['Go to admin panel, find the user and click Close. This revokes access immediately.'] },
      ],
    },
    rules: {
      matchCount: 847,
      include: [
        { field: 'Site', values: ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'] },
        { field: 'Job Title', values: ['Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Specialist', 'Sales Executive', 'HR Coordinator', 'Financial Analyst', 'Customer Support Representative', 'Operations Manager', 'Content Strategist', 'Quality Assurance Tester', 'Business Analyst'] },
        { field: 'Department', values: ['Product', 'Engineering', 'Design'] },
      ],
      exclude: [
        { field: 'Site', values: ['Los Angeles', 'Paris'] },
      ],
    },
  },
  '2': {
    name: 'Asana',
    logoColor: '#E8544A', logoInitial: 'A',
    provisioning: 'Champion Task', provisioningDesc: 'Users are provisioned manually by the designated app champion',
    signOn: 'SSO', signOnDesc: 'Users sign in with their Microsoft account',
    users: 88,
    scimEndpoint: 'https://api.asana.com/scim/v2',
    apiToken: '••••••••••••••xyz789ghi',
    lastSync: 'Feb 10, 2026 at 11:30 AM',
    primaryChampion: { initials: 'SC', name: 'Sara Conner', email: 'sconner@company.com' },
    backupChampion: { initials: 'JV', name: 'Jamie Vang', email: 'jvang@company.com' },
    championElection: { mode: 'direct', scope: 'Company', jobTitle: '', directUsers: [
      { id: '3', initials: 'SC', name: 'Sara Conner', email: 'sconner@company.com', avatarColor: '#EC407A' },
      { id: '6', initials: 'JV', name: 'Jamie Vang', email: 'jvang@company.com', avatarColor: '#26A69A' },
    ]},
    onboarding: {
      title: 'Set up Asana workspace access',
      dueAfterDays: 3,
      checklist: ['Create user account in Asana admin panel', 'Assign user to correct teams and projects', 'Set license type based on user role', 'Confirm user received activation email and can log in'],
      instructions: [
        { title: 'Access Asana Admin', steps: ['Go to app.asana.com/admin and sign in', 'Navigate to Members → Invite Members'] },
        { title: 'Invite new user', steps: ['Enter their work email. Assign the correct role based on their position.'] },
      ],
    },
    offboarding: {
      title: 'Remove Asana workspace access',
      dueAfterDays: 3,
      checklist: ['Deactivate user in Asana admin panel', 'Reassign open tasks to another team member'],
      instructions: [
        { title: 'Deactivate the user account', steps: ['Go to admin panel, find the user and click Deactivate. This revokes access immediately.'] },
      ],
    },
    rules: {
      matchCount: 312,
      include: [
        { field: 'Site', values: ['New York', 'London'] },
        { field: 'Department', values: ['Product', 'Engineering', 'Design', 'Marketing'] },
      ],
      exclude: [],
    },
  },
}


const TABS = ['Overview', 'Rules', 'Tasks', 'Users']

interface DetailRule {
  id: string
  field: string
  values: string[]
}

const RULE_FIELDS_DETAIL = ['Site', 'Department', 'Job Title']

const FIELD_VALUES_DETAIL: Record<string, string[]> = {
  Site: ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Los Angeles', 'Paris', 'Chicago', 'Toronto', 'Singapore'],
  Department: ['Product', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Legal', 'IT'],
  'Job Title': ['Product Manager', 'Data Scientist', 'UX Designer', 'Marketing Specialist', 'Sales Executive', 'HR Coordinator', 'Financial Analyst', 'Customer Support Representative', 'Operations Manager', 'Content Strategist', 'Quality Assurance Tester', 'Business Analyst', 'Software Developer', 'Frontend Developer', 'Backend Developer'],
}

const FAKE_USER_COUNTS_DETAIL: Record<string, number> = {
  'New York': 142, 'London': 98, 'Tokyo': 76, 'Sydney': 54, 'Berlin': 43, 'Los Angeles': 67, 'Paris': 38, 'Chicago': 81, 'Toronto': 49, 'Singapore': 62,
  Product: 87, Engineering: 124, Design: 43, Marketing: 62, Sales: 98, HR: 31, Finance: 47, Operations: 55, Legal: 22, IT: 38,
  'Product Manager': 34, 'Data Scientist': 28, 'UX Designer': 19, 'Marketing Specialist': 31, 'Sales Executive': 52, 'HR Coordinator': 18, 'Financial Analyst': 24, 'Customer Support Representative': 43, 'Operations Manager': 21, 'Content Strategist': 15, 'Quality Assurance Tester': 22, 'Business Analyst': 29, 'Software Developer': 67, 'Frontend Developer': 38, 'Backend Developer': 45,
}

const PROV_DESCS: Record<string, string> = {
  'SCIM': 'Users are automatically provisioned and deprovisioned via API whenever directory changes occur',
  'Champion Task': 'Users are provisioned manually by the designated app champion',
}

const SO_DESCS: Record<string, string> = {
  'SSO': 'Users sign in with their Microsoft account',
  'Manual': 'Users log in manually with a username and password',
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, border: '1px solid #EAECF0', borderRadius: 1, px: 1.625, py: 1.125, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', bgcolor: '#fff' }}>
      <DoneIcon sx={{ fontSize: 20, color: '#244B72', flexShrink: 0 }} />
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px' }}>
        {text}
      </Typography>
    </Box>
  )
}

function InstructionCard({ index, title, steps }: { index: number; title: string; steps: string[] }) {
  return (
    <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, px: 1.625, py: 1.125, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', bgcolor: '#fff', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 22, height: 22, borderRadius: '99px', bgcolor: '#42A5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff', lineHeight: 1 }}>{index}</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px' }}>{title}</Typography>
      </Box>
      <Box sx={{ pl: 4.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {steps.map((step, i) => (
          <Box key={i}>
            {i > 0 && <Divider sx={{ mb: 1 }} />}
            <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', lineHeight: 1.43 }}>
              {i + 1}. {step}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function TaskBlock({ type, task }: { type: 'onboarding' | 'offboarding'; task: TaskData }) {
  const isOnboarding = type === 'onboarding'
  return (
    <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid #EAECF0', flexWrap: 'wrap', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip label={isOnboarding ? 'Onboarding' : 'Offboarding'} size="small"
            sx={{
              bgcolor: isOnboarding ? '#EDFCF2' : '#FCF4F2',
              color: isOnboarding ? '#095C37' : '#A63224',
              fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100,
              '& .MuiChip-label': { px: '10px' },
            }} />
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
            {task.title}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>
          Due {task.dueAfterDays} days after event
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, px: 2, py: 1.5, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', letterSpacing: '0.1px', mb: 0.5 }}>Checklist</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {task.checklist.map((item, i) => <ChecklistItem key={i} text={item} />)}
          </Box>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', letterSpacing: '0.1px', mb: 0.5 }}>Instructions</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {task.instructions.map((instr, i) => <InstructionCard key={i} index={i + 1} title={instr.title} steps={instr.steps} />)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function SectionCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: 1, p: 3, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px' }}>
          {title}
        </Typography>
        {onEdit && (
          <Button variant="text" size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={onEdit}
            sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', p: '6px 8px', minWidth: 'auto' }}>
            Edit
          </Button>
        )}
      </Box>
      {children}
    </Box>
  )
}

function DetailRuleRow({ rule, variant, onFieldChange, onRemoveValue, onDeleteRule, onOpenPicker }: {
  rule: DetailRule
  variant: 'include' | 'exclude'
  onFieldChange: (id: string, field: string) => void
  onRemoveValue: (id: string, value: string) => void
  onDeleteRule: (id: string) => void
  onOpenPicker: (e: React.MouseEvent<HTMLElement>, ruleId: string, section: 'include' | 'exclude') => void
}) {
  const isExclude = variant === 'exclude'
  return (
    <Box sx={{ position: 'relative', bgcolor: '#FCFBFD', border: '1px solid #EAECF0', borderRadius: '8px', px: '14px', pt: '12px', pb: '14px', mb: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <IconButton size="small" onClick={() => onDeleteRule(rule.id)}
        sx={{ position: 'absolute', top: 6, right: 6, color: '#C4CAD4', '&:hover': { color: '#DE5243', bgcolor: '#FCF4F2' } }}>
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size="small" sx={{ width: 160 }}>
          <Select value={rule.field} onChange={(e) => onFieldChange(rule.id, e.target.value)} sx={{ fontSize: '0.875rem' }}>
            {RULE_FIELDS_DETAIL.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>is any of</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75 }}>
        {rule.values.map((v) => (
          <Chip key={v} label={v} size="small"
            onDelete={() => onRemoveValue(rule.id, v)}
            deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: isExclude ? '#FCF4F2' : '#EBF0F5', color: isExclude ? '#C83E2E' : '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        ))}
        <Box component="button" onClick={(e) => onOpenPicker(e, rule.id, variant)}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, border: `1.5px dashed ${isExclude ? '#C83E2E' : '#0C2E50'}`, borderRadius: 100, px: 1.25, py: '3px', bgcolor: 'transparent', cursor: 'pointer', color: isExclude ? '#C83E2E' : '#244B72', fontSize: '0.8125rem', fontWeight: 500, '&:hover': { bgcolor: isExclude ? '#FCF4F2' : '#EBF0F5' } }}>
          <AddIcon sx={{ fontSize: 13 }} />
          Add {rule.field}
        </Box>
      </Box>
    </Box>
  )
}

function ReadOnlyRuleRow({ field, values, variant }: { field: string; values: string[]; variant: 'include' | 'exclude' }) {
  const isExclude = variant === 'exclude'
  return (
    <Box sx={{ bgcolor: '#FCFBFD', border: '1px solid #EAECF0', borderRadius: '8px', px: '14px', py: '12px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box sx={{ bgcolor: isExclude ? '#FCF4F2' : '#D3F8DF', color: isExclude ? '#C83E2E' : '#084C2E', px: 1, py: '2px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 }}>
          {field}
        </Box>
        <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>is any of</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {values.map((v) => (
          <Chip key={v} label={v} size="small"
            sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
        ))}
      </Box>
    </Box>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', letterSpacing: '0.1px', lineHeight: 1.57, mb: 0.5 }}>
      {children}
    </Typography>
  )
}

function FieldValue({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontSize: '1rem', color: '#202938', lineHeight: 1.5 }}>
      {children}
    </Typography>
  )
}

export default function ClientAppDetail() {
  const { appId } = useParams<{ appId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('Overview')
  const [userSearch, setUserSearch] = useState('')
  const [siteFilter, setSiteFilter] = useState('All sites')
  const [jobTitleFilter, setJobTitleFilter] = useState('All job titles')
  const [userPage, setUserPage] = useState(0)
  const [userRowsPerPage, setUserRowsPerPage] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  const app = CLIENT_APPS[appId ?? ''] ?? Object.values(CLIENT_APPS)[0]

  // Rules edit state
  const [localRules, setLocalRules] = useState(() => app.rules)
  const [editingRules, setEditingRules] = useState(false)
  const [draftInclude, setDraftInclude] = useState<DetailRule[]>([])
  const [draftExclude, setDraftExclude] = useState<DetailRule[]>([])
  const [showDraftExclude, setShowDraftExclude] = useState(false)
  const [rulesPopover, setRulesPopover] = useState<{ anchor: HTMLElement; ruleId: string; section: 'include' | 'exclude' } | null>(null)
  const [rulesSearch, setRulesSearch] = useState('')

  // Overview section local data + edit states
  const [localProvisioning, setLocalProvisioning] = useState({ method: app.provisioning, desc: app.provisioningDesc })
  const [localSignOn, setLocalSignOn] = useState({ method: app.signOn, desc: app.signOnDesc })
  const [localScim, setLocalScim] = useState({ endpoint: app.scimEndpoint, token: app.apiToken })
  const [editingProvisioning, setEditingProvisioning] = useState(false)
  const [editingSignOn, setEditingSignOn] = useState(false)
  const [editingScim, setEditingScim] = useState(false)
  const [draftProv, setDraftProv] = useState({ method: app.provisioning, desc: app.provisioningDesc })
  const [draftSO, setDraftSO] = useState({ method: app.signOn, desc: app.signOnDesc })
  const [draftScim, setDraftScim] = useState({ endpoint: app.scimEndpoint, token: app.apiToken })

  const [localElection, setLocalElection] = useState<ChampionElectionData>(app.championElection)
  const [editingElection, setEditingElection] = useState(false)
  const [draftElection, setDraftElection] = useState<ChampionElectionData>(app.championElection)
  const [electionSearch, setElectionSearch] = useState('')

  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg) }

  const provChip = PROV_CHIP[localProvisioning.method] ?? PROV_CHIP['SCIM']
  const soChip = SO_CHIP[localSignOn.method] ?? SO_CHIP['SSO']

  function startEditing() {
    setDraftInclude(localRules.include.map((r, i) => ({ id: String(i), field: r.field, values: [...r.values] })))
    setDraftExclude(localRules.exclude.map((r, i) => ({ id: String(i), field: r.field, values: [...r.values] })))
    setShowDraftExclude(localRules.exclude.length > 0)
    setEditingRules(true)
  }

  // Reset all edit states when switching between apps
  useEffect(() => {
    const freshApp = CLIENT_APPS[appId ?? ''] ?? Object.values(CLIENT_APPS)[0]
    setLocalRules(freshApp.rules)
    setEditingRules(false)
    setRulesPopover(null)
    setLocalProvisioning({ method: freshApp.provisioning, desc: freshApp.provisioningDesc })
    setLocalSignOn({ method: freshApp.signOn, desc: freshApp.signOnDesc })
    setLocalScim({ endpoint: freshApp.scimEndpoint, token: freshApp.apiToken })
    setEditingProvisioning(false)
    setEditingSignOn(false)
    setEditingScim(false)
    setLocalElection(freshApp.championElection)
    setEditingElection(false)
  }, [appId])

  // Enter edit mode directly if navigated here with editing state (e.g. from DemoLauncher)
  useEffect(() => {
    const state = location.state as { tab?: string; editing?: boolean } | null
    if (state?.tab === 'Rules') {
      setActiveTab('Rules')
      if (state.editing) startEditing()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const draftMatchCount = useMemo(() => {
    const included = draftInclude.reduce((sum, rule) =>
      sum + rule.values.reduce((s, v) => s + (FAKE_USER_COUNTS_DETAIL[v] ?? 0), 0), 0)
    const excluded = draftExclude.reduce((sum, rule) =>
      sum + rule.values.reduce((s, v) => s + Math.floor((FAKE_USER_COUNTS_DETAIL[v] ?? 0) * 0.4), 0), 0)
    return Math.max(0, included - excluded)
  }, [draftInclude, draftExclude])

  const jobTitles = useMemo(() => ['All job titles', ...Array.from(new Set(APP_USERS.map((u) => u.jobTitle))).sort()], [])

  const filteredUsers = useMemo(() =>
    APP_USERS.filter((u) => {
      const matchesSite = siteFilter === 'All sites' || u.site === siteFilter
      const matchesJob = jobTitleFilter === 'All job titles' || u.jobTitle === jobTitleFilter
      const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.jobTitle.toLowerCase().includes(userSearch.toLowerCase())
      return matchesSite && matchesJob && matchesSearch
    }),
    [userSearch, siteFilter, jobTitleFilter],
  )
  const paginatedUsers = filteredUsers.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)

  return (
    <Box sx={{ p: 4, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#4A5466', fontWeight: 500, mb: 0.5 }}>
            Client Manager
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#202938' }}>
            Finity_Development
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<SettingsOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={{ borderColor: '#D0D3E8', color: '#244B72', bgcolor: '#F7F8FC', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, py: 0.75, '&:hover': { borderColor: '#244B72', bgcolor: '#EBF0F5' } }}>
          Client Settings
        </Button>
      </Box>

      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
        <Typography
          onClick={() => navigate('/clients')}
          sx={{ fontSize: '1rem', color: '#4A5466', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Apps
        </Typography>
        <ChevronRightIcon sx={{ fontSize: 20, color: '#4A5466' }} />
        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#202938', letterSpacing: '0.15px' }}>
          {app.name}
        </Typography>
      </Box>

      {/* App header card */}
      <Box sx={{ bgcolor: '#fff', borderRadius: 1, p: 3, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: app.logoColor, fontSize: '1.1rem', fontWeight: 700, borderRadius: '12px', border: '1px solid #EAECF0' }}>
              {app.logoInitial}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: '1.25rem', color: '#202938', letterSpacing: '0.15px' }}>
                {app.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                <Chip label={localProvisioning.method} size="small"
                  sx={{ bgcolor: provChip.bg, color: provChip.color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PersonOutlinedIcon sx={{ fontSize: 18, color: '#4A5466' }} />
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>{app.users} users</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <IconButton size="small" sx={{ border: '1px solid #D0D3E8', borderRadius: 1, bgcolor: '#F7F8FC' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Pill tabs */}
      <Box sx={{ display: 'flex', bgcolor: '#fff', borderRadius: 1, p: 0.75, gap: 0.5, border: '1px solid #EAECF0', mb: 2 }}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab
          return (
            <Box key={tab} onClick={() => setActiveTab(tab)}
              sx={{ px: 1.5, py: 1, borderRadius: '6px', cursor: 'pointer', bgcolor: isActive ? '#EBF0F5' : 'transparent', color: '#244B72', fontWeight: 500, fontSize: isActive ? '0.875rem' : '1rem', lineHeight: '24px', userSelect: 'none', '&:hover': { bgcolor: isActive ? '#EBF0F5' : '#F7F8FC' } }}>
              {tab}
            </Box>
          )
        })}
      </Box>

      {/* Section content */}
      {activeTab === 'Overview' && (
        <>
          {/* Provisioning */}
          <SectionCard title="Provisioning" onEdit={editingProvisioning ? undefined : () => { setDraftProv(localProvisioning); setEditingProvisioning(true) }}>
            {editingProvisioning ? (
              <>
                <Box sx={{ mb: 2 }}>
                  <FieldLabel>Method</FieldLabel>
                  <FormControl size="small" sx={{ width: 220, mt: 0.5 }}>
                    <Select value={draftProv.method} onChange={(e) => setDraftProv({ method: e.target.value, desc: PROV_DESCS[e.target.value] ?? '' })}>
                      <MenuItem value="SCIM">SCIM</MenuItem>
                      <MenuItem value="Champion Task">Champion Task</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {draftProv.desc && (
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mb: 2 }}>{draftProv.desc}</Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 2, borderTop: '1px solid #EAECF0' }}>
                  <Button variant="outlined" size="small" onClick={() => setEditingProvisioning(false)}
                    sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" onClick={() => { setLocalProvisioning(draftProv); setEditingProvisioning(false); showToast('Provisioning settings saved') }}
                    sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2 }}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Chip label={localProvisioning.method} size="small"
                  sx={{ bgcolor: provChip.bg, color: provChip.color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
                <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>{localProvisioning.desc}</Typography>
              </Box>
            )}
          </SectionCard>

          {/* Sign-on */}
          <SectionCard title="Sign-on" onEdit={editingSignOn ? undefined : () => { setDraftSO(localSignOn); setEditingSignOn(true) }}>
            {editingSignOn ? (
              <>
                <Box sx={{ mb: 2 }}>
                  <FieldLabel>Method</FieldLabel>
                  <FormControl size="small" sx={{ width: 220, mt: 0.5 }}>
                    <Select value={draftSO.method} onChange={(e) => setDraftSO({ method: e.target.value, desc: SO_DESCS[e.target.value] ?? '' })}>
                      <MenuItem value="SSO">SSO</MenuItem>
                      <MenuItem value="Manual">Manual</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {draftSO.desc && (
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mb: 2 }}>{draftSO.desc}</Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 2, borderTop: '1px solid #EAECF0' }}>
                  <Button variant="outlined" size="small" onClick={() => setEditingSignOn(false)}
                    sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" onClick={() => { setLocalSignOn(draftSO); setEditingSignOn(false); showToast('Sign-on settings saved') }}
                    sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2 }}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Chip label={localSignOn.method} size="small"
                  sx={{ bgcolor: soChip.bg, color: soChip.color, fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }} />
                <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>{localSignOn.desc}</Typography>
              </Box>
            )}
          </SectionCard>

          {/* SCIM Configuration */}
          <SectionCard title="SCIM Configuration" onEdit={editingScim ? undefined : () => { setDraftScim(localScim); setEditingScim(true) }}>
            {editingScim ? (
              <>
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>SCIM Endpoint URL</FieldLabel>
                    <TextField size="small" fullWidth value={draftScim.endpoint}
                      onChange={(e) => setDraftScim((prev) => ({ ...prev, endpoint: e.target.value }))}
                      sx={{ mt: 0.5 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>API Token</FieldLabel>
                    <TextField size="small" fullWidth value={draftScim.token}
                      onChange={(e) => setDraftScim((prev) => ({ ...prev, token: e.target.value }))}
                      sx={{ mt: 0.5 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>Connection Status</FieldLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon sx={{ fontSize: 20, color: '#16B364' }} />
                      <FieldValue>Connected</FieldValue>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>Last Sync</FieldLabel>
                    <FieldValue>{app.lastSync}</FieldValue>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button variant="outlined" size="small" startIcon={<PlayArrowOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderColor: '#D0D3E8', color: '#244B72', bgcolor: '#F7F8FC', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none' }}>
                    Test Connection
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<SyncIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderColor: '#D0D3E8', color: '#244B72', bgcolor: '#F7F8FC', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none' }}>
                    Sync Now
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 2, borderTop: '1px solid #EAECF0' }}>
                  <Button variant="outlined" size="small" onClick={() => setEditingScim(false)}
                    sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" onClick={() => { setLocalScim(draftScim); setEditingScim(false); showToast('SCIM configuration saved') }}
                    sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2 }}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>SCIM Endpoint URL</FieldLabel>
                    <Typography sx={{ fontFamily: '"Roboto Mono", monospace', fontSize: '1rem', color: '#202938', fontWeight: 500 }}>
                      {localScim.endpoint}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>API Token</FieldLabel>
                    <Typography sx={{ fontFamily: '"Roboto Mono", monospace', fontSize: '1rem', color: '#202938', fontWeight: 500 }}>
                      {localScim.token}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>Connection Status</FieldLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon sx={{ fontSize: 20, color: '#16B364' }} />
                      <FieldValue>Connected</FieldValue>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FieldLabel>Last Sync</FieldLabel>
                    <FieldValue>{app.lastSync}</FieldValue>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" size="small" startIcon={<PlayArrowOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderColor: '#D0D3E8', color: '#244B72', bgcolor: '#F7F8FC', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none' }}>
                    Test Connection
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<SyncIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderColor: '#D0D3E8', color: '#244B72', bgcolor: '#F7F8FC', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, boxShadow: 'none' }}>
                    Sync Now
                  </Button>
                </Box>
              </>
            )}
          </SectionCard>

          {/* Champion Election */}
          <SectionCard title="Champion Election" onEdit={editingElection ? undefined : () => { setDraftElection(localElection); setElectionSearch(''); setEditingElection(true) }}>
            {editingElection ? (
              <>
                {/* Mode cards */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                  {([
                    { value: 'dynamic' as const, label: 'Dynamic', subtitle: 'Org-chart based · scope + job title' },
                    { value: 'direct'  as const, label: 'Direct',  subtitle: 'Specific named users' },
                  ] as const).map((m) => {
                    const selected = draftElection.mode === m.value
                    return (
                      <Box key={m.value} onClick={() => setDraftElection((prev) => ({ ...prev, mode: m.value }))}
                        sx={{
                          flex: 1, border: selected ? '2px solid #85A4C2' : '1px solid #EAECF0',
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
                {draftElection.mode === 'dynamic' && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box>
                      <FieldLabel>Scope</FieldLabel>
                      <FormControl size="small" sx={{ width: 180, mt: 0.5 }}>
                        <Select value={draftElection.scope} onChange={(e) => setDraftElection((prev) => ({ ...prev, scope: e.target.value }))} sx={{ fontSize: '0.875rem' }}>
                          {['Client', 'Company', 'Site'].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FieldLabel>Job Title</FieldLabel>
                      <Autocomplete
                        size="small"
                        options={FIELD_VALUES_DETAIL['Job Title']}
                        value={draftElection.jobTitle || null}
                        onChange={(_, value) => setDraftElection((prev) => ({ ...prev, jobTitle: value ?? '' }))}
                        sx={{ width: 260, mt: 0.5 }}
                        renderInput={(params) => <TextField {...params} placeholder="Select job title" />}
                      />
                    </Box>
                  </Box>
                )}

                {/* Direct config */}
                {draftElection.mode === 'direct' && (
                  <Box sx={{ mb: 2 }}>
                    <TextField size="small" placeholder="Search users" value={electionSearch}
                      onChange={(e) => setElectionSearch(e.target.value)}
                      sx={{ width: 280, mb: 1.5 }}
                      slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} /></InputAdornment> } }}
                    />
                    {draftElection.directUsers.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                        {draftElection.directUsers.map((u) => (
                          <Chip key={u.id}
                            avatar={<Avatar sx={{ bgcolor: `${u.avatarColor} !important`, fontSize: '0.7rem !important', fontWeight: 600 }}>{u.initials}</Avatar>}
                            label={u.name} size="small"
                            onDelete={() => setDraftElection((prev) => ({ ...prev, directUsers: prev.directUsers.filter((x) => x.id !== u.id) }))}
                            deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
                            sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 500, fontSize: '0.8125rem', height: 28, borderRadius: 100 }}
                          />
                        ))}
                      </Box>
                    )}
                    <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, overflow: 'hidden', maxHeight: 280, overflowY: 'auto' }}>
                      {APP_USERS.filter((u) =>
                        u.name.toLowerCase().includes(electionSearch.toLowerCase()) ||
                        u.jobTitle.toLowerCase().includes(electionSearch.toLowerCase())
                      ).map((u, i, arr) => {
                        const checked = draftElection.directUsers.some((x) => x.id === u.id)
                        return (
                          <Box key={u.id}
                            onClick={() => setDraftElection((prev) => ({
                              ...prev,
                              directUsers: checked
                                ? prev.directUsers.filter((x) => x.id !== u.id)
                                : [...prev.directUsers, { id: u.id, initials: u.initials, name: u.name, email: u.email, avatarColor: u.avatarColor }],
                            }))}
                            sx={{
                              display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25,
                              borderBottom: i < arr.length - 1 ? '1px solid #EAECF0' : 'none',
                              cursor: 'pointer',
                              bgcolor: checked ? '#F0F5FA' : '#fff',
                              '&:hover': { bgcolor: checked ? '#EBF0F5' : '#F7F8FC' },
                            }}
                          >
                            <Checkbox size="small" checked={checked}
                              onChange={() => {}}
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
                      })}
                    </Box>
                  </Box>
                )}

                {/* FCFS callout */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#EBF0F5', borderRadius: 1, px: 2, py: 1.5, mb: 2 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: '#244B72', flexShrink: 0, mt: '1px' }} />
                  <Typography sx={{ fontSize: '0.875rem', color: '#244B72', lineHeight: 1.57 }}>
                    {draftElection.mode === 'direct'
                      ? 'When a task fires, it is sent to all selected champions. The first to accept becomes the responsible champion.'
                      : 'When a task fires, the first available champion matching this scope and job title will receive it. If they don\'t accept, it moves to the next match.'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 2, borderTop: '1px solid #EAECF0' }}>
                  <Button variant="outlined" size="small" onClick={() => setEditingElection(false)}
                    sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" onClick={() => { setLocalElection(draftElection); setEditingElection(false); showToast('Champion election updated') }}
                    sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2 }}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <FieldLabel>Mode</FieldLabel>
                  <Chip
                    label={localElection.mode === 'dynamic' ? 'Dynamic' : 'Direct'}
                    size="small"
                    sx={{ bgcolor: '#EBF0F5', color: '#244B72', fontWeight: 600, fontSize: '0.8125rem', height: 24, borderRadius: 100, '& .MuiChip-label': { px: '10px' } }}
                  />
                </Box>

                {localElection.mode === 'dynamic' && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FieldLabel>Scope</FieldLabel>
                      <FieldValue>{localElection.scope}</FieldValue>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FieldLabel>Job Title</FieldLabel>
                      <FieldValue>{localElection.jobTitle || '—'}</FieldValue>
                    </Box>
                  </Box>
                )}

                {localElection.mode === 'direct' && localElection.directUsers.length > 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                    {localElection.directUsers.map((u) => (
                      <Box key={u.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', fontWeight: 600, bgcolor: u.avatarColor }}>
                          {u.initials}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px', lineHeight: 1.75 }}>{u.name}</Typography>
                          <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', lineHeight: 1.43 }}>{u.email}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, bgcolor: '#EBF0F5', borderRadius: 1, px: 2, py: 1.25 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 16, color: '#244B72', flexShrink: 0, mt: '2px' }} />
                  <Typography sx={{ fontSize: '0.8125rem', color: '#244B72', lineHeight: 1.57 }}>
                    {localElection.mode === 'direct'
                      ? 'When a task fires, it is sent to all selected champions. The first to accept becomes the responsible champion.'
                      : 'When a task fires, the first available champion matching this scope and job title will receive it.'}
                  </Typography>
                </Box>
              </>
            )}
          </SectionCard>
        </>
      )}

      {activeTab === 'Rules' && (() => {
        if (editingRules) {
          return (
            <Box sx={{ bgcolor: '#fff', borderRadius: 1, p: 3, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#202938', letterSpacing: '0.15px', mb: 2 }}>
                Scoping Rules
              </Typography>

              {/* Result bar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: '#F7F8FC', borderRadius: '12px', px: '20px', py: '14px', mb: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#244B72' }}>{draftMatchCount.toLocaleString()}</Typography>
                <Typography sx={{ fontSize: '1rem', color: '#202938' }}>people match these rules</Typography>
              </Box>

              {/* Include rules */}
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', mb: 1 }}>
                People who match all of
              </Typography>
              {draftInclude.map((rule) => (
                <DetailRuleRow key={rule.id} rule={rule} variant="include"
                  onFieldChange={(id, field) => setDraftInclude((prev) => prev.map((r) => r.id === id ? { ...r, field, values: [] } : r))}
                  onRemoveValue={(id, value) => setDraftInclude((prev) => prev.map((r) => r.id === id ? { ...r, values: r.values.filter((v) => v !== value) } : r))}
                  onDeleteRule={(id) => setDraftInclude((prev) => prev.filter((r) => r.id !== id))}
                  onOpenPicker={(e, ruleId, section) => { setRulesPopover({ anchor: e.currentTarget, ruleId, section }); setRulesSearch('') }}
                />
              ))}
              <Button variant="text" size="small" startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                onClick={() => setDraftInclude((prev) => [...prev, { id: `${Date.now()}`, field: 'Site', values: [] }])}
                sx={{ color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', mb: 2, pl: 0 }}>
                Add Rule
              </Button>

              <Divider sx={{ mb: 2 }} />

              {/* Exclude rules */}
              {showDraftExclude ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                    <BlockOutlinedIcon sx={{ fontSize: 18, color: '#DE5243' }} />
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#DE5243' }}>Except</Typography>
                  </Box>
                  {draftExclude.map((rule) => (
                    <DetailRuleRow key={rule.id} rule={rule} variant="exclude"
                      onFieldChange={(id, field) => setDraftExclude((prev) => prev.map((r) => r.id === id ? { ...r, field, values: [] } : r))}
                      onRemoveValue={(id, value) => setDraftExclude((prev) => prev.map((r) => r.id === id ? { ...r, values: r.values.filter((v) => v !== value) } : r))}
                      onDeleteRule={(id) => setDraftExclude((prev) => prev.filter((r) => r.id !== id))}
                      onOpenPicker={(e, ruleId, section) => { setRulesPopover({ anchor: e.currentTarget, ruleId, section }); setRulesSearch('') }}
                    />
                  ))}
                  <Button variant="text" size="small" startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                    onClick={() => setDraftExclude((prev) => [...prev, { id: `${Date.now()}`, field: 'Site', values: [] }])}
                    sx={{ color: '#DE5243', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', mb: 2, pl: 0 }}>
                    Add Exclusion Rule
                  </Button>
                </>
              ) : (
                <Button variant="text" size="small" startIcon={<BlockOutlinedIcon sx={{ fontSize: 16 }} />}
                  onClick={() => { setShowDraftExclude(true); setDraftExclude([{ id: `${Date.now()}`, field: 'Site', values: [] }]) }}
                  sx={{ color: '#DE5243', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', mb: 2, pl: 0 }}>
                  Add Exclusion
                </Button>
              )}

              {/* Cancel / Save */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 1, borderTop: '1px solid #EAECF0' }}>
                <Button variant="outlined" size="small" onClick={() => setEditingRules(false)}
                  sx={{ borderColor: '#D0D5DD', color: '#244B72', fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: '0px 1px 2px rgba(16,24,40,0.05)' }}>
                  Cancel
                </Button>
                <Button variant="contained" size="small"
                  onClick={() => {
                    setLocalRules({
                      matchCount: draftMatchCount,
                      include: draftInclude.map(({ field, values }) => ({ field, values })),
                      exclude: draftExclude.map(({ field, values }) => ({ field, values })),
                    })
                    setEditingRules(false)
                    showToast('Scoping rules saved')
                  }}
                  sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none', borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
                  Save
                </Button>
              </Box>
            </Box>
          )
        }

        // Read-only mode
        const { matchCount, include, exclude } = localRules
        const summaryParts: string[] = []
        const siteCount = include.find((r) => r.field === 'Site')?.values.length ?? 0
        const jobCount = include.find((r) => r.field === 'Job Title')?.values.length ?? 0
        if (siteCount > 0) summaryParts.push(`${siteCount} site${siteCount !== 1 ? 's' : ''}`)
        if (jobCount > 0) summaryParts.push(`${jobCount} job title${jobCount !== 1 ? 's' : ''}`)
        if (exclude.length > 0) summaryParts.push(`${exclude.length} exclusion${exclude.length !== 1 ? 's' : ''}`)
        return (
          <SectionCard title="Scoping Rules" onEdit={startEditing}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.75, bgcolor: '#F7F8FC', borderRadius: '12px', px: '20px', py: '14px', mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#244B72' }}>{matchCount.toLocaleString()}</Typography>
              <Typography sx={{ fontSize: '1rem', color: '#202938' }}>people match these rules</Typography>
              {summaryParts.length > 0 && (
                <>
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466', mx: 0.25 }}>·</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>{summaryParts.join(' · ')}</Typography>
                </>
              )}
            </Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#202938', letterSpacing: '0.1px', mb: 1.5 }}>
              People who match all of
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: exclude.length > 0 ? 2 : 0 }}>
              {include.map((rule) => (
                <ReadOnlyRuleRow key={rule.field} field={rule.field} values={rule.values} variant="include" />
              ))}
            </Box>
            {exclude.length > 0 && (
              <>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                  <BlockOutlinedIcon sx={{ fontSize: 18, color: '#DE5243' }} />
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#DE5243' }}>Except</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {exclude.map((rule) => (
                    <ReadOnlyRuleRow key={rule.field} field={rule.field} values={rule.values} variant="exclude" />
                  ))}
                </Box>
              </>
            )}
          </SectionCard>
        )
      })()}

      {activeTab === 'Tasks' && (
        <Box sx={{ bgcolor: '#fff', borderRadius: 1, p: 3, boxShadow: '0px 1px 1px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TaskBlock type="onboarding" task={app.onboarding} />
          <TaskBlock type="offboarding" task={app.offboarding} />

          {/* Video thumbnail */}
          <Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#4A5466', letterSpacing: '0.1px', mb: 1 }}>
              Training Video
            </Typography>
            <Box sx={{ width: 190, height: 131, borderRadius: 1, border: '2px solid #EAECF0', bgcolor: '#2D1B69', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 8px rgba(16,24,40,0.1), 0px 2px 4px rgba(16,24,40,0.06)', cursor: 'pointer' }}>
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.6)', borderRadius: '99px', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayCircleOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {activeTab === 'Users' && (
        <Box sx={{ border: '1px solid #EAECF0', borderRadius: 1, bgcolor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Filter bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.5, borderBottom: '1px solid #EAECF0' }}>
            <TextField size="small" placeholder="Search" value={userSearch}
              onChange={(e) => { setUserSearch(e.target.value); setUserPage(0) }}
              sx={{ width: 260 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} /></InputAdornment> } }}
            />
            <FormControl size="small" sx={{ width: 160 }}>
              <Select value={siteFilter} onChange={(e) => { setSiteFilter(e.target.value); setUserPage(0) }}
                sx={{ fontSize: '0.875rem' }}>
                {SITES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ width: 180 }}>
              <Select value={jobTitleFilter} onChange={(e) => { setJobTitleFilter(e.target.value); setUserPage(0) }}
                sx={{ fontSize: '0.875rem' }}>
                {jobTitles.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" size="small" onClick={() => setAddUserOpen(true)}
              sx={{ height: 36, minWidth: 120, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>
              Add User
            </Button>
          </Box>

          {/* Row count */}
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" color="text.secondary">{filteredUsers.length} users</Typography>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Name', 'Job Title', 'Site', 'Departments', 'Date Added', 'Status'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 500, color: '#64748B', fontSize: '0.8125rem', bgcolor: '#FCFBFD', borderBottom: '1px solid #EAECF0' }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell sx={{ py: 1.5, width: 230 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: user.avatarColor, fontSize: '0.875rem', fontWeight: 600, flexShrink: 0 }}>
                          {user.initials}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{user.name}</Typography>
                          <Typography sx={{ fontSize: '0.875rem', color: '#4A5466' }}>{user.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{user.jobTitle}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{user.site}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{user.departments}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>{user.dateAdded}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <FiberManualRecordIcon sx={{ fontSize: 10, color: '#16B364' }} />
                        <Typography sx={{ fontSize: '0.875rem' }}>{user.status}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination component="div" count={filteredUsers.length} page={userPage} rowsPerPage={userRowsPerPage}
            onPageChange={(_, p) => setUserPage(p)}
            onRowsPerPageChange={(e) => { setUserRowsPerPage(parseInt(e.target.value, 10)); setUserPage(0) }}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ borderTop: '1px solid #EAECF0', mt: 'auto' }}
          />
        </Box>
      )}

      {/* Value picker Popover for rule editing */}
      {rulesPopover && (() => {
        const rules = rulesPopover.section === 'include' ? draftInclude : draftExclude
        const currentRule = rules.find((r) => r.id === rulesPopover.ruleId)
        if (!currentRule) return null
        const allValues = FIELD_VALUES_DETAIL[currentRule.field] ?? []
        const filtered = allValues.filter((v) => v.toLowerCase().includes(rulesSearch.toLowerCase()))
        function toggleValue(value: string) {
          const setter = rulesPopover!.section === 'include' ? setDraftInclude : setDraftExclude
          setter((prev) => prev.map((r) => r.id === rulesPopover!.ruleId
            ? { ...r, values: r.values.includes(value) ? r.values.filter((v) => v !== value) : [...r.values, value] }
            : r))
        }
        return (
          <Popover open anchorEl={rulesPopover.anchor}
            onClose={() => { setRulesPopover(null); setRulesSearch('') }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { width: 280, borderRadius: 1, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)', mt: 0.5 } } }}>
            <Box sx={{ px: 2, pt: 2, pb: 1 }}>
              <TextField fullWidth size="small" placeholder="Search..." value={rulesSearch}
                onChange={(e) => setRulesSearch(e.target.value)} sx={{ mb: 1 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} /></InputAdornment> } }}
              />
              <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
                {filtered.map((v) => (
                  <FormControlLabel key={v}
                    control={<Checkbox size="small" checked={currentRule.values.includes(v)} onChange={() => toggleValue(v)}
                      sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#244B72' } }} />}
                    label={<Typography sx={{ fontSize: '0.875rem', color: '#202938' }}>{v}</Typography>}
                    sx={{ display: 'flex', width: '100%', mx: 0, py: 0.25 }}
                  />
                ))}
                {filtered.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>No options found.</Typography>
                )}
              </Box>
            </Box>
          </Popover>
        )
      })()}

      <AddUserModal open={addUserOpen} appName={app.name} onClose={() => setAddUserOpen(false)} />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast(null)} sx={{ width: '100%' }}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
