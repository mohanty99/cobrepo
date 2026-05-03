import { GuideIcon } from '../icons/NavIcons'
import PageTemplate from './PageTemplate'

export default function UserGuide() {
  return (
    <PageTemplate
      Icon={GuideIcon}
      title="User Guide"
      desc="Browse guides, tutorials, and documentation."
    />
  )
}
