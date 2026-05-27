import type { AppRow } from '../AppsLibrary/data'
import { APPS } from '../AppsLibrary/data'

export interface AppDetail extends AppRow {
  description: string
  publisher: string
  websiteUrl: string
  screenshots: string[]
  contactName: string
  contactEmail: string
  contactPhone: string
  supportUrl: string
  appType: 'microsoft' | 'manual'
  onboardingTask: TaskDetail
  offboardingTask: TaskDetail
}

export interface CheckItem { id: string; text: string }
export interface InstructionStep { id: string; text: string }
export interface InstructionSection { id: string; title: string; steps: InstructionStep[] }
export interface TaskDetail {
  title: string
  dueAfterDays: number
  checklist: CheckItem[]
  sections: InstructionSection[]
}

export interface RegisteredClient {
  id: string
  name: string
  initials: string
  avatarColor: string
  provisioning: ('SCIM' | 'ChampionTask')[]
  signOn: ('SSO' | 'Manual')[]
  users: number
  dateAdded: string
  status: 'Active' | 'Inactive'
}

const APP_DETAILS: Record<string, Partial<AppDetail>> = {
  '7': {
    description: 'Messaging and collaboration platform for teams. Integrates with hundreds of tools to keep your work flowing in one place.',
    publisher: 'Slack Technologies Inc.',
    websiteUrl: 'slack.com',
    screenshots: [],
    contactName: 'Slack Enterprise Support',
    contactEmail: 'enterprise@slack.com',
    contactPhone: '',
    supportUrl: 'slack.com/help/enterprise',
    appType: 'microsoft',
    onboardingTask: {
      title: 'Set up Slack workspace access',
      dueAfterDays: 3,
      checklist: [
        { id: '1', text: 'Create user account in Slack admin panel' },
        { id: '2', text: 'Assign user to correct channels and workspace' },
        { id: '3', text: 'Set license type based on user role' },
        { id: '4', text: 'Confirm user received activation email and can log in' },
      ],
      sections: [
        {
          id: '1',
          title: 'Access Slack Admin',
          steps: [
            { id: '1', text: 'Go to slack.com/admin and sign in' },
            { id: '2', text: 'Navigate to Members → Invite People' },
          ],
        },
        {
          id: '2',
          title: 'Invite new user',
          steps: [
            { id: '1', text: 'Enter their work email. Assign the correct permission level based on their role.' },
          ],
        },
      ],
    },
    offboardingTask: {
      title: 'Remove Slack workspace access',
      dueAfterDays: 3,
      checklist: [
        { id: '1', text: 'Deactivate user in Slack admin panel' },
        { id: '2', text: 'Remove from all channels' },
      ],
      sections: [
        {
          id: '1',
          title: 'Deactivate the user account',
          steps: [
            { id: '1', text: 'Go to admin panel, find the user and click Deactivate. This revokes access immediately.' },
          ],
        },
      ],
    },
  },
}

export const REGISTERED_CLIENTS: RegisteredClient[] = [
  { id: '1', name: 'ASG Equities', initials: 'AE', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 45, dateAdded: 'Jan 15, 2026', status: 'Active' },
  { id: '2', name: 'Green Solutions', initials: 'PM', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 32, dateAdded: 'Mar 10, 2024', status: 'Active' },
  { id: '3', name: 'Tech Innovations', initials: 'AM', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 58, dateAdded: 'Feb 20, 2025', status: 'Active' },
  { id: '4', name: 'Digital Marketing', initials: 'BT', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 21, dateAdded: 'May 30, 2023', status: 'Active' },
  { id: '5', name: 'NextGen Robotics', initials: 'DF', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 67, dateAdded: 'Apr 25, 2025', status: 'Active' },
  { id: '6', name: 'Healthcare Analytics', initials: 'HR', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 39, dateAdded: 'Jun 15, 2024', status: 'Active' },
  { id: '7', name: 'ASG Equities', initials: 'AE', avatarColor: '#78909C', provisioning: ['SCIM', 'ChampionTask'], signOn: ['SSO'], users: 84, dateAdded: 'Jan 15, 2026', status: 'Active' },
]

export function getAppDetail(id: string): AppDetail | undefined {
  const base = APPS.find((a) => a.id === id)
  if (!base) return undefined
  const extra = APP_DETAILS[id] ?? APP_DETAILS['7']
  return {
    ...base,
    description: extra.description ?? '',
    publisher: extra.publisher ?? '',
    websiteUrl: extra.websiteUrl ?? '',
    screenshots: extra.screenshots ?? [],
    contactName: extra.contactName ?? '',
    contactEmail: extra.contactEmail ?? '',
    contactPhone: extra.contactPhone ?? '',
    supportUrl: extra.supportUrl ?? '',
    appType: extra.appType ?? 'microsoft',
    onboardingTask: extra.onboardingTask!,
    offboardingTask: extra.offboardingTask!,
  }
}
