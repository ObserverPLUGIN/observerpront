export function ServerStatusPill({ health }) {
  return (
    <div className={`health-pill ${health.state}`}>
      <span className="health-dot" />
      <strong>{health.message}</strong>
    </div>
  )
}
