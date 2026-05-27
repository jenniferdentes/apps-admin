export type ProvisioningMethod = 'SCIM' | 'ChampionTask'
export type SignOnMethod = 'SSO' | 'Manual'

export interface AppRow {
  id: string
  name: string
  logoColor: string
  logoInitial: string
  isCubxApp?: boolean
  categories: string[]
  provisioning: ProvisioningMethod[]
  signOn: SignOnMethod[]
  companies: number | 'All'
}

export const APPS: AppRow[] = [
  {
    id: '1',
    name: 'Docusign',
    logoColor: '#E24329',
    logoInitial: 'D',
    categories: ['Communication', 'Collaboration'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 23,
  },
  {
    id: '2',
    name: 'Asana',
    logoColor: '#F06A6A',
    logoInitial: 'A',
    categories: ['Project Planning', 'Team Management'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 27,
  },
  {
    id: '3',
    name: 'Zoom',
    logoColor: '#2D8CFF',
    logoInitial: 'Z',
    categories: ['Video Conferencing', 'Webinars'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 50,
  },
  {
    id: '4',
    name: 'Salesforce',
    logoColor: '#00A1E0',
    logoInitial: 'S',
    categories: ['Customer Relationship Management'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 60,
  },
  {
    id: '5',
    name: 'Gusto',
    logoColor: '#F45D48',
    logoInitial: 'G',
    categories: ['Communication', 'Collaboration'],
    provisioning: ['ChampionTask'],
    signOn: ['Manual'],
    companies: 23,
  },
  {
    id: '6',
    name: 'Microsoft Teams',
    logoColor: '#6264A7',
    logoInitial: 'M',
    categories: ['Collaboration', 'Meetings'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 40,
  },
  {
    id: '7',
    name: 'Slack',
    logoColor: '#4A154B',
    logoInitial: 'S',
    categories: ['Messaging', 'Integrations'],
    provisioning: ['ChampionTask'],
    signOn: ['Manual'],
    companies: 45,
  },
  {
    id: '8',
    name: 'Notion',
    logoColor: '#000000',
    logoInitial: 'N',
    categories: ['Documentation', 'Collaboration'],
    provisioning: ['SCIM', 'ChampionTask'],
    signOn: ['SSO', 'Manual'],
    companies: 35,
  },
  {
    id: '9',
    name: 'Quarantine',
    logoColor: '#00BFA5',
    logoInitial: 'Q',
    isCubxApp: true,
    categories: ['Email Security'],
    provisioning: [],
    signOn: [],
    companies: 'All',
  },
  {
    id: '10',
    name: 'Trello',
    logoColor: '#0079BF',
    logoInitial: 'T',
    categories: ['Project Management', 'Task Tracking'],
    provisioning: ['ChampionTask'],
    signOn: ['Manual'],
    companies: 30,
  },
]
