import { Link } from 'react-router-dom'

export function RegisterForm({
  formState,
  errorMessage,
  successMessage,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  const checklist = [
    '이메일 인증 전에는 대시보드 접근을 제한',
    '가입 직후 바로 이메일 인증 단계로 이동',
    '인증 완료 후 로그인 화면으로 자연스럽게 연결',
  ]

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card-shell">
        <section className="login-main-column">
          <div className="login-heading">
            <div className="login-kicker-row">
              <span className="login-kicker">Register Flow</span>
              <span className="login-stage-pill">Email Verification</span>
            </div>
            <div className="panel-header login-panel-header">
              <h2>관리자 계정 등록</h2>
              <span>인증 기반</span>
            </div>
            <p className="empty-copy login-copy">
              이메일 인증을 먼저 완료한 뒤 로그인할 수 있게 구성한 가입 화면입니다.
            </p>
          </div>

          <div className="login-meta-row">
            <div className="login-meta-card">
              <strong>가입 방식</strong>
              <span>이메일 + 비밀번호</span>
            </div>
            <div className="login-meta-card">
              <strong>후속 단계</strong>
              <span>이메일 인증 후 로그인</span>
            </div>
          </div>

          <label className="field">
            <span>관리자 이름</span>
            <input
              name="displayName"
              value={formState.displayName}
              onChange={onChange}
              placeholder="예: Yang Theory"
            />
          </label>
          <label className="field">
            <span>이메일</span>
            <input
              name="email"
              type="email"
              value={formState.email}
              onChange={onChange}
              placeholder="admin@observer.local"
            />
          </label>
          <label className="field">
            <span>비밀번호</span>
            <input
              name="password"
              type="password"
              value={formState.password}
              onChange={onChange}
              placeholder="8자 이상 입력"
            />
          </label>
          <label className="field">
            <span>비밀번호 확인</span>
            <input
              name="confirmPassword"
              type="password"
              value={formState.confirmPassword}
              onChange={onChange}
              placeholder="비밀번호 다시 입력"
            />
          </label>

          <label className="checkbox-field">
            <input type="checkbox" defaultChecked />
            <span>운영 도구 접근 정책과 이메일 인증 절차에 동의합니다.</span>
          </label>

          {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
          {successMessage ? <p className="inline-success">{successMessage}</p> : null}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? '가입 요청 중...' : '가입 요청'}
          </button>
          <div className="auth-link-row">
            <Link to="/login" className="text-link">
              로그인으로 돌아가기
            </Link>
            <Link to="/verify-email" className="text-link">
              이메일 인증 화면 보기
            </Link>
          </div>
        </section>

        <aside className="login-side-column">
          <p className="login-side-kicker">가입 UX 포인트</p>
          <ul className="login-feature-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="login-side-note">
            <strong>추천 설계</strong>
            <p>
              가입 화면은 필드를 많이 늘리기보다, 왜 승인 절차가 필요한지와 다음 단계가
              무엇인지 먼저 설명하는 편이 이탈률을 줄입니다.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}
