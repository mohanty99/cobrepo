import { TasksIcon } from '../icons/NavIcons'
import PageTemplate from './PageTemplate'

export default function Tasks() {
  return (
    <PageTemplate
      Icon={TasksIcon}
      title="Tasks"
      desc="Track and manage your team's tasks and assignments."
    />
  )
}
