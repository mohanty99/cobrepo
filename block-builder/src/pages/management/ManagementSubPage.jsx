import { useParams } from 'react-router-dom'
import { SUBNAV_DATA } from '../../data/navItems'
import PageTemplate from '../PageTemplate'

export default function ManagementSubPage() {
  const { sectionId, pageSlug } = useParams()
  const sections = SUBNAV_DATA.management.sections
  const section  = sections.find(s => s.id === sectionId)
  const link     = section?.links.find(l => l.path.endsWith('/' + pageSlug))

  if (!section) {
    return <PageTemplate title="Not Found" desc="This section does not exist." />
  }

  return (
    <PageTemplate
      Icon={section.Icon}
      title={link?.label ?? section.label}
      desc={`Manage ${section.label} settings and configuration.`}
    />
  )
}
