export function LoginForm({
  credentials,
  errorMessage,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="panel-header">
        <h2>관리자 로그인</h2>
        <span>JWT</span>
      </div>
      <p className="empty-copy">
        스프링 백엔드에 설정된 관리자 계정으로 로그인하면 대시보드 조회가 열립니다.
      </p>
      <label className="field">
        <span>아이디</span>
        <input
          name="username"
          value={credentials.username}
          onChange={onChange}
          autoComplete="username"
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
        />
      </label>
      {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
      <button type="submit" className="primary-button" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
