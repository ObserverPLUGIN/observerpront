export function DashboardLayout({ heroActions, children }) {
  return (
    <main className="dashboard-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Observer Dashboard</p>
          <h1>실시간 관측 대시보드에서 플레이어 주변 3개 레이어를 확인합니다.</h1>
          <p className="hero-copy">
            서버 상태, 플레이어 위치, 레이어 단면, 타겟 블록, 최근 로그를 한 화면에서
            확인할 수 있습니다.
          </p>
        </div>
        <div className="hero-actions">{heroActions}</div>
      </section>
      {children}
    </main>
  )
}
