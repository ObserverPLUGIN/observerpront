export function AuthLayout({ heroActions, children }) {
  return (
    <main className="dashboard-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Observer Dashboard</p>
          <h1>JWT 로그인 후 플레이어 주변 3개 레이어를 확인합니다.</h1>
          <p className="hero-copy">
            로그인한 관리자만 플레이어 목록, 단면 미니맵, 강조 블록, 최근 로그에 접근할
            수 있습니다.
          </p>
        </div>
        <div className="hero-actions">{heroActions}</div>
      </section>
      <section className="login-shell">{children}</section>
    </main>
  )
}
