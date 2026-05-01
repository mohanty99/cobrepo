import { ProfileIcon } from '../icons/NavIcons'
import PageTemplate from './PageTemplate'

export default function Profile() {
  return (
    <PageTemplate
      Icon={ProfileIcon}
      title="My Profile"
      desc="Manage your account settings and preferences."
    />
  )
}
