import { ManagementIcon } from '../../icons/NavIcons'
import PageTemplate from '../PageTemplate'

export default function ManagementHome() {
  return (
    <PageTemplate
      Icon={ManagementIcon}
      title="Management"
      desc="Configure system settings, roles, integrations, and permissions."
    />
  )
}
