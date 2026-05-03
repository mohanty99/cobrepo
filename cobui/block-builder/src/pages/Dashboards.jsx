import { DashboardsIcon } from '../icons/NavIcons'
import PageTemplate from './PageTemplate'

export default function Dashboards() {
  return (
    <PageTemplate
      Icon={DashboardsIcon}
      title="Dashboards"
      desc="Monitor your key metrics and performance at a glance."
    />
  )
}
