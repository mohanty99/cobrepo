import {
  DashboardsIcon, TasksIcon, JourneysIcon, ReviewsIcon,
  EntitiesIcon, ReportsIcon, ProfileIcon, GuideIcon, ManagementIcon,
} from '../icons/NavIcons'
import {
  SubRiskIcon, SubPolicyIcon, SubProductsIcon, SubRefDataIcon,
  SubSecurityIcon, SubScreeningIcon, SubDigitalIdIcon, SubJourneyIcon,
  SubConfigExchangeIcon, SubTenantIcon, SubIntegrationsIcon,
} from '../icons/SubNavIcons'

export const NAV_MAIN = [
  { id: 'dashboards', label: 'Dashboards', Icon: DashboardsIcon, path: '/dashboards' },
  { id: 'tasks',      label: 'Tasks',      Icon: TasksIcon,       path: '/tasks' },
  { id: 'journeys',   label: 'Journeys',   Icon: JourneysIcon,    path: '/journeys' },
  { id: 'reviews',    label: 'Reviews',    Icon: ReviewsIcon,     path: '/reviews' },
  { id: 'entities',   label: 'Entities',   Icon: EntitiesIcon,    path: '/entities' },
  { id: 'reports',    label: 'Reports',    Icon: ReportsIcon,     path: '/reports' },
]

export const NAV_BOTTOM = [
  { id: 'profile',    label: 'My Profile', Icon: ProfileIcon,    path: '/profile' },
  { id: 'guide',      label: 'User Guide', Icon: GuideIcon,      path: '/guide' },
  { id: 'management', label: 'Management', Icon: ManagementIcon, path: '/management', hasSubNav: true },
]

export const SUBNAV_DATA = {
  management: {
    title: 'Management',
    sections: [
      {
        id: 'risk', label: 'Risk', Icon: SubRiskIcon,
        links: [
          { label: 'Calculator',             path: '/management/risk/calculator' },
          { label: 'Risk Impact Assessment', path: '/management/risk/risk-impact-assessment' },
          { label: 'Configuration',          path: '/management/risk/configuration' },
          { label: 'Risk Scoping Rules',     path: '/management/risk/risk-scoping-rules' },
        ],
      },
      {
        id: 'policy', label: 'Policy', Icon: SubPolicyIcon,
        links: [
          { label: 'Search',               path: '/management/policy/search' },
          { label: 'Configuration',        path: '/management/policy/configuration' },
          { label: 'Data Groups',          path: '/management/policy/data-groups' },
          { label: 'Shared Data Template', path: '/management/policy/shared-data-template' },
          { label: 'API Providers',        path: '/management/policy/api-providers' },
        ],
      },
      {
        id: 'products', label: 'Products', Icon: SubProductsIcon,
        links: [
          { label: 'Requirement Sets', path: '/management/products/requirement-sets' },
        ],
      },
      {
        id: 'ref-data', label: 'Reference Data', Icon: SubRefDataIcon,
        links: [
          { label: 'Editor',                        path: '/management/ref-data/editor' },
          { label: 'Document Types',                path: '/management/ref-data/document-types' },
          { label: 'Document Requirement Metadata', path: '/management/ref-data/document-requirement-metadata' },
        ],
      },
      {
        id: 'security', label: 'Security', Icon: SubSecurityIcon,
        links: [
          { label: 'Security Configuration',                 path: '/management/security/security-configuration' },
          { label: 'Dynamic Assignment Configuration',       path: '/management/security/dynamic-assignment-configuration' },
          { label: 'Related Party Access Layer Inheritance', path: '/management/security/related-party-access' },
        ],
      },
      {
        id: 'screening', label: 'Screening', Icon: SubScreeningIcon,
        links: [
          { label: 'Provider Configuration',  path: '/management/screening/provider-configuration' },
          { label: 'Screening Scoping Rules', path: '/management/screening/screening-scoping-rules' },
        ],
      },
      {
        id: 'digital-idv', label: 'Digital ID&V', Icon: SubDigitalIdIcon,
        links: [
          { label: 'Digital ID&V', path: '/management/digital-idv/digital-idv' },
        ],
      },
      {
        id: 'journey', label: 'Journey', Icon: SubJourneyIcon,
        links: [
          { label: 'Builder',                          path: '/management/journey/builder' },
          { label: 'Review Journey Scheduling',        path: '/management/journey/review-journey-scheduling' },
          { label: 'Related Party Scoping Rules',      path: '/management/journey/related-party-scoping-rules' },
          { label: 'Review & Approvals Configuration', path: '/management/journey/review-approvals-configuration' },
        ],
      },
      {
        id: 'config-exchange', label: 'Configuration Exchange', Icon: SubConfigExchangeIcon,
        links: [
          { label: 'Imports', path: '/management/config-exchange/imports' },
        ],
      },
      {
        id: 'tenant', label: 'Tenant', Icon: SubTenantIcon,
        links: [
          { label: 'View Configuration', path: '/management/tenant/view-configuration' },
        ],
      },
      {
        id: 'integrations', label: 'Integrations', Icon: SubIntegrationsIcon,
        links: [
          { label: 'Integration Hub',   path: '/management/integrations/integration-hub' },
          { label: 'External Data',     path: '/management/integrations/external-data' },
          { label: 'SuperGraph Editor', path: '/management/integrations/supergraph-editor' },
        ],
      },
    ],
  },
}
