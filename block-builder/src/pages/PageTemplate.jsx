export default function PageTemplate({ Icon, title, desc }) {
  return (
    <div className="content-placeholder">
      {Icon && (
        <div className="content-placeholder__icon"><Icon /></div>
      )}
      <h1 className="content-placeholder__title">{title}</h1>
      <p className="content-placeholder__desc">{desc}</p>
    </div>
  )
}
