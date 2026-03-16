import { Link } from 'react-router-dom'

export function LoginForm({
  credentials,
  errorMessage,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  const highlights = [
    '플레이어 좌표와 관측 상태를 즉시 확인',
    '근처 블록 감지 이벤트와 최근 활동 로그 조회',
    '백엔드 권한 정책에 맞는 관리자 전용 진입점 유지',
  ]

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card-shell">
        <section className="login-main-column">
          <div className="login-heading">
            <div className="login-kicker-row">
              <span className="login-kicker">Admin Sign In</span>
              <span className="login-stage-pill">JWT Session</span>
            </div>
            <div className="panel-header login-panel-header">
              <h2>관제 대시보드 로그인</h2>
              <span>보안 접근</span>
            </div>
            <p className="empty-copy login-copy">
              관리자 계정으로 로그인하면 플레이어 현황, 근처 블록 감지, 최근 활동 로그를
              하나의 콘솔에서 확인할 수 있습니다.
            </p>
          </div>

          <div className="login-meta-row">
            <div className="login-meta-card">
              <strong>로그인 식별자</strong>
              <span>{credentials.username || 'admin@observer.local'}</span>
            </div>
            <div className="login-meta-card">
              <strong>접속 방식</strong>
              <span>Spring Boot + JWT</span>
            </div>
          </div>

          <label className="field">
            <span>이메일 또는 아이디</span>
            <input
              name="username"
              value={credentials.username}
              onChange={onChange}
              autoComplete="username"
              placeholder="admin@observer.local 또는 admin"
            />
          </label>
          <label className="field">
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={onChange}
              autoComplete="current-password"
              placeholder="비밀번호 입력"
            />
          </label>
          {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
          <div className="auth-link-row">
            <Link to="/register" className="text-link">
              회원가입
            </Link>
            <Link to="/reset-password" className="text-link">
              비밀번호 재설정
            </Link>
            <Link to="/verify-email" className="text-link">
              이메일 인증
            </Link>
          </div>
          <p className="login-footnote">
            초기 계정과 비밀번호 정책은 백엔드 인증 설정에서 관리합니다.
          </p>
        </section>

        <aside className="login-side-column">
          <p className="login-side-kicker">로그인 후 가능한 작업</p>
          <ul className="login-feature-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="login-side-note">
            <strong>추천 UX 포인트</strong>
            <p>
              로그인 화면에서는 입력 요소를 최소화하고, 들어간 뒤 어떤 화면이 열리는지
              바로 이해되도록 설명 카드를 함께 보여주는 편이 좋습니다.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}
