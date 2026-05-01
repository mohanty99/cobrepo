import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/NavIcons'
import { NAV_MAIN, NAV_BOTTOM } from '../data/navItems'

function NavButton({ label, Icon, active, subNavOpen, onClick }) {
  return (
    <button
      className={[
        'nav-btn',
        active     ? 'nav-btn--active'      : '',
        subNavOpen ? 'nav-btn--subnav-open' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      title={label}
    >
      <span className="nav-btn__icon"><Icon /></span>
      <span className="nav-btn__label">{label}</span>
    </button>
  )
}

export default function Sidebar({ open, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()

  const segment  = '/' + location.pathname.split('/')[1]
  const inMgmt   = location.pathname.startsWith('/management')

  return (
    <aside className={`sidebar${open ? '' : ' sidebar--collapsed'}`}>
      <div className="sidebar__toggle-row">
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          title={open ? 'Collapse' : 'Expand'}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>

      <nav className="sidebar__nav">
        {NAV_MAIN.map(({ id, label, Icon, path }) => (
          <NavButton
            key={id}
            label={label}
            Icon={Icon}
            active={!inMgmt && segment === path}
            onClick={() => navigate(path)}
          />
        ))}
      </nav>

      <div className="sidebar__bottom">
        <div className="sidebar__divider" />
        {NAV_BOTTOM.map(({ id, label, Icon, path, hasSubNav }) => (
          <NavButton
            key={id}
            label={label}
            Icon={Icon}
            active={hasSubNav ? inMgmt : segment === path}
            subNavOpen={hasSubNav && inMgmt}
            onClick={() => navigate(path)}
          />
        ))}
      </div>
    </aside>
  )
}
