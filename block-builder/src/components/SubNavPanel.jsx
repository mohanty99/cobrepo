import { NavLink } from 'react-router-dom'

export default function SubNavPanel({ data }) {
  return (
    <div className={`subnav-wrapper${data ? ' subnav-wrapper--open' : ''}`}>
      <div className="subnav-panel">
        {data && (
          <>
            <div className="subnav-panel__header">
              <h2 className="subnav-panel__title">{data.title}</h2>
            </div>
            <div className="subnav-panel__body">
              {data.sections.map((section, idx) => (
                <div key={section.id} className="subnav-section">
                  <div className="subnav-section__head">
                    <div className="subnav-section__icon-box">
                      <section.Icon />
                    </div>
                    <span className="subnav-section__name">{section.label}</span>
                  </div>
                  <div className="subnav-section__links">
                    {section.links.map(link => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                          `subnav-link${isActive ? ' subnav-link--active' : ''}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                  {idx < data.sections.length - 1 && (
                    <div className="subnav-section__divider" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
