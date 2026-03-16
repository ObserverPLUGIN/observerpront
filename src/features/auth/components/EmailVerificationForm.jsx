import { Link } from 'react-router-dom'

export function EmailVerificationForm({
  formState,
  errorMessage,
  successMessage,
  debugCode,
  isSubmitting,
  isResending,
  onChange,
  onSubmit,
  onResend,
}) {
  const verificationNotes = [
    '가입 직후 바로 이메일 인증 단계로 연결',
    '6자리 코드 입력과 재전송을 같은 카드에서 처리',
    '인증 완료 후 바로 로그인 화면으로 복귀',
  ]

  const codeDigits = `${formState.code || ''}`.padEnd(6, ' ').slice(0, 6).split('')

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card-shell">
        <section className="login-main-column">
          <div className="login-heading">
            <div className="login-kicker-row">
              <span className="login-kicker">Verification Flow</span>
              <span className="login-stage-pill">6-Digit Code</span>
            </div>
            <div className="panel-header login-panel-header">
              <h2>이메일 인증</h2>
              <span>코드 입력</span>
            </div>
            <p className="empty-copy login-copy">
              메일로 받은 6자리 코드를 입력하면 계정이 활성화되고, 이후 로그인할 수
              있습니다.
            </p>
          </div>

          <div className="login-meta-row">
            <div className="login-meta-card">
              <strong>인증 대상</strong>
              <span>{formState.email || 'admin@observer.local'}</span>
            </div>
            <div className="login-meta-card">
              <strong>코드 길이</strong>
              <span>6자리 숫자</span>
            </div>
          </div>

          <div className="verification-code-grid" aria-label="verification code preview">
            {codeDigits.map((digit, index) => (
              <div key={`${digit}-${index}`} className="verification-code-cell">
                {digit.trim() || '-'}
              </div>
            ))}
          </div>

          <label className="field">
            <span>이메일 주소</span>
            <input
              name="email"
              type="email"
              value={formState.email}
              onChange={onChange}
              placeholder="admin@observer.local"
            />
          </label>
          <label className="field">
            <span>인증 코드</span>
            <input
              name="code"
              value={formState.code}
              onChange={onChange}
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
            />
          </label>

          {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
          {successMessage ? <p className="inline-success">{successMessage}</p> : null}
          {debugCode ? (
            <p className="inline-success">로컬 개발용 코드: {debugCode}</p>
          ) : null}

          <div className="auth-button-row">
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? '인증 확인 중...' : '인증 완료'}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={onResend}
              disabled={isResending}
            >
              {isResending ? '재전송 중...' : '인증 메일 다시 보내기'}
            </button>
          </div>
          <div className="auth-link-row">
            <Link to="/register" className="text-link">
              회원가입으로 돌아가기
            </Link>
            <Link to="/login" className="text-link">
              로그인 보기
            </Link>
          </div>
        </section>

        <aside className="login-side-column">
          <p className="login-side-kicker">인증 UX 포인트</p>
          <ul className="login-feature-list">
            {verificationNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="login-side-note">
            <strong>추천 설계</strong>
            <p>
              이메일 인증은 현재 입력한 코드가 화면에 즉시 반영되면 사용자 실수를 줄일 수
              있습니다. 재전송 버튼은 같은 위치에 유지하는 편이 좋습니다.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}
