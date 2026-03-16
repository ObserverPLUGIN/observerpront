import { Link, useLocation } from 'react-router-dom'

const defaultSummaryItems = [
  {
    label: '세션 접근',
    value: 'JWT 관리자 인증',
    copy: '로그인 성공 시 플레이어 대시보드와 로그 화면이 즉시 열립니다.',
  },
  {
    label: '관측 기능',
    value: '실시간 위치 + 근처 블록',
    copy: '감시 대상 이동, 스냅샷, 활동 타임라인을 한 화면에서 확인합니다.',
  },
  {
    label: '운영 흐름',
    value: '백엔드 연동 중심',
    copy: 'Spring Boot API, 권한 정책, 대시보드 화면까지 한 흐름으로 연결됩니다.',
  },
]

const flowLinks = [
  { primaryTo: '/', previewTo: '/main-preview', label: '메인', paths: ['/', '/main-preview'] },
  { primaryTo: '/login', previewTo: '/login-preview', label: '로그인', paths: ['/login', '/login-preview'] },
  { primaryTo: '/register', previewTo: '/register-preview', label: '회원가입', paths: ['/register', '/register-preview'] },
  {
    primaryTo: '/reset-password',
    previewTo: '/reset-password-preview',
    label: '비밀번호 재설정',
    paths: ['/reset-password', '/reset-password-preview'],
  },
  {
    primaryTo: '/verify-email',
    previewTo: '/verify-email-preview',
    label: '이메일 인증',
    paths: ['/verify-email', '/verify-email-preview'],
  },
]

export function AuthLayout({
  children,
  eyebrow = 'Observer Access Console',
  title = '깔끔한 관리자 로그인으로 관측 화면 진입 흐름을 단순하게 정리합니다.',
  description = '서버 관측 기능은 많지만 로그인 화면은 짧고 명확해야 합니다. 이 화면은 관리자 인증, 연결 목적, 로그인 이후 얻는 기능을 한 번에 보여주도록 구성했습니다.',
  summaryItems = defaultSummaryItems,
}) {
  const location = useLocation()
  const previewMode = location.pathname.endsWith('-preview')

  return (
    <main className="dashboard-shell auth-shell">
      <nav className="auth-flow-nav">
        {flowLinks.map((item) => (
          <Link
            key={item.label}
            to={previewMode ? item.previewTo : item.primaryTo}
            className={`auth-flow-link ${item.paths.includes(location.pathname) ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <section className="hero-banner auth-hero">
        <div className="auth-hero-copy-block">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-copy">{description}</p>
        </div>
        <div className="auth-hero-grid">
          {summaryItems.map((item) => (
            <article key={item.label} className="auth-summary-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.copy}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="login-shell">{children}</section>
    </main>
  )
}
