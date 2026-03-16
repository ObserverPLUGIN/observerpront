import { Link } from 'react-router-dom'

export function PasswordResetForm({
  formState,
  stage,
  errorMessage,
  successMessage,
  debugCode,
  isSubmitting,
  onChange,
  onSubmit,
  onResend,
  onBackToRequest,
}) {
  const recoverySteps = [
    '등록된 이메일 주소로 6자리 재설정 코드를 발송',
    '코드 인증 후 새 비밀번호를 바로 설정',
    '재설정 완료 후 기존 세션은 다시 로그인하도록 유도',
  ]

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card-shell">
        <section className="login-main-column">
          <div className="login-heading">
            <div className="login-kicker-row">
              <span className="login-kicker">Recovery Flow</span>
              <span className="login-stage-pill">
                {stage === 'request' ? 'Secure Reset' : 'Code Confirm'}
              </span>
            </div>
            <div className="panel-header login-panel-header">
              <h2>비밀번호 재설정</h2>
              <span>{stage === 'request' ? '이메일 요청' : '코드 확인'}</span>
            </div>
            <p className="empty-copy login-copy">
              운영 계정은 메일로 받은 6자리 재설정 코드를 확인한 뒤 새 비밀번호를 설정하는
              흐름으로 구현했습니다.
            </p>
          </div>

          <div className="login-meta-row">
            <div className="login-meta-card">
              <strong>인증 채널</strong>
              <span>등록된 이메일 주소</span>
            </div>
            <div className="login-meta-card">
              <strong>현재 단계</strong>
              <span>{stage === 'request' ? '코드 발송' : '비밀번호 변경'}</span>
            </div>
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

          {stage === 'confirm' ? (
            <>
              <label className="field">
                <span>6자리 인증 코드</span>
                <input
                  name="code"
                  value={formState.code}
                  onChange={onChange}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                />
              </label>
              <label className="field">
                <span>새 비밀번호</span>
                <input
                  name="newPassword"
                  type="password"
                  value={formState.newPassword}
                  onChange={onChange}
                  placeholder="8자 이상 입력"
                />
              </label>
              <label className="field">
                <span>새 비밀번호 확인</span>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formState.confirmPassword}
                  onChange={onChange}
                  placeholder="새 비밀번호 다시 입력"
                />
              </label>
            </>
          ) : null}

          {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
          {successMessage ? <p className="inline-success">{successMessage}</p> : null}
          {debugCode ? (
            <p className="inline-success">로컬 개발용 코드: {debugCode}</p>
          ) : null}

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {stage === 'request'
              ? isSubmitting
                ? '재설정 코드 발송 중...'
                : '재설정 코드 보내기'
              : isSubmitting
                ? '비밀번호 변경 중...'
                : '새 비밀번호 저장'}
          </button>

          {stage === 'confirm' ? (
            <div className="auth-button-row">
              <button type="button" className="secondary-button" onClick={onResend}>
                코드 다시 보내기
              </button>
              <button type="button" className="secondary-button" onClick={onBackToRequest}>
                이메일 다시 입력
              </button>
            </div>
          ) : null}

          <div className="auth-link-row">
            <Link to="/login" className="text-link">
              로그인으로 돌아가기
            </Link>
            <Link to="/verify-email" className="text-link">
              이메일 인증 화면 보기
            </Link>
          </div>
          <p className="login-footnote">
            실제 운영에서는 요청 횟수 제한과 재설정 코드 만료 정책을 함께 두는 편이
            좋습니다.
          </p>
        </section>

        <aside className="login-side-column">
          <p className="login-side-kicker">재설정 UX 포인트</p>
          <ul className="login-feature-list">
            {recoverySteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="login-side-note">
            <strong>추천 설계</strong>
            <p>
              재설정 화면은 요청 단계와 변경 단계를 한 화면 안에서 이어가되, 사용자가 지금
              어떤 단계에 있는지 명확히 보이도록 레이블을 바꾸는 편이 좋습니다.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}
