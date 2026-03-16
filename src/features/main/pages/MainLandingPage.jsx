import { Link, useLocation } from 'react-router-dom'

const featureCards = [
  {
    label: '실시간 관측',
    title: '플레이어 위치, 근처 블록, 최근 활동을 한 화면에서 확인',
    copy: '서버에서 올라온 데이터를 관리자용 콘솔로 정리해, 어디를 먼저 봐야 하는지 빠르게 판단할 수 있게 구성합니다.',
  },
  {
    label: '권한 흐름',
    title: '가입, 인증, 로그인까지 한 톤으로 이어지는 접근 제어',
    copy: '운영 도구는 기능보다 신뢰감이 먼저 보여야 합니다. 접근 흐름 전체를 같은 시각 언어로 묶어 일관성을 유지합니다.',
  },
  {
    label: '백엔드 연동',
    title: 'Spring Boot API와 로그 수집 구조를 자연스럽게 연결',
    copy: '플러그인, 백엔드, 프론트를 별개로 보지 않고 하나의 운영 시스템처럼 읽히도록 구성합니다.',
  },
]

const metrics = [
  { label: '활성 운영자', value: '12', meta: '현재 세션 기준' },
  { label: '감지 이벤트', value: '2.4k', meta: '오늘 누적' },
  { label: '응답 시간', value: '182ms', meta: 'API 평균' },
]

const workflow = [
  '회원가입 요청',
  '이메일 인증',
  '로그인',
  '메인 대시보드 진입',
]

export function MainLandingPage() {
  const location = useLocation()
  const previewMode = location.pathname === '/main-preview'

  return (
    <main className="dashboard-shell landing-shell">
      <nav className="auth-flow-nav">
        <Link to={previewMode ? '/main-preview' : '/'} className="auth-flow-link active">
          메인
        </Link>
        <Link to={previewMode ? '/login-preview' : '/login'} className="auth-flow-link">
          로그인
        </Link>
        <Link to={previewMode ? '/register-preview' : '/register'} className="auth-flow-link">
          회원가입
        </Link>
        <Link
          to={previewMode ? '/reset-password-preview' : '/reset-password'}
          className="auth-flow-link"
        >
          비밀번호 재설정
        </Link>
        <Link to={previewMode ? '/verify-email-preview' : '/verify-email'} className="auth-flow-link">
          이메일 인증
        </Link>
      </nav>

      <section className="hero-banner landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">Observer Platform</p>
          <h1>서버 운영자가 바로 이해할 수 있는 인증 흐름과 관측 대시보드를 한 화면에서 설계합니다.</h1>
          <p className="hero-copy">
            단순한 로그인 페이지가 아니라, 운영 도구의 첫인상부터 대시보드 진입까지
            신뢰감 있게 이어지는 경험을 만드는 것을 목표로 한 메인 랜딩입니다.
          </p>
          <div className="landing-cta-row">
            <Link to={previewMode ? '/login-preview' : '/login'} className="primary-link-button">
              로그인 보기
            </Link>
            <Link
              to={previewMode ? '/register-preview' : '/register'}
              className="secondary-link-button"
            >
              회원가입 보기
            </Link>
          </div>
        </div>

        <div className="landing-hero-panel">
          <div className="landing-panel-head">
            <strong>운영 콘솔 요약</strong>
            <span>{previewMode ? 'Live Preview Concept' : 'Observer Entry'}</span>
          </div>
          <div className="landing-metric-grid">
            {metrics.map((item) => (
              <article key={item.label} className="landing-metric-card">
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.meta}</span>
              </article>
            ))}
          </div>
          <div className="landing-status-strip">
            <span className="status-dot" />
            <strong>Spring Boot API 정상 연결</strong>
            <span>플러그인 로그 스트림 수신 중</span>
          </div>
        </div>
      </section>

      <section className="landing-section-grid">
        {featureCards.map((card) => (
          <article key={card.label} className="panel landing-feature-card">
            <p className="landing-section-eyebrow">{card.label}</p>
            <h2>{card.title}</h2>
            <p className="empty-copy">{card.copy}</p>
          </article>
        ))}
      </section>

      <section className="landing-detail-grid">
        <article className="panel landing-workflow-card">
          <div className="panel-header">
            <h2>인증 플로우</h2>
            <span>UX Sequence</span>
          </div>
          <ol className="landing-workflow-list">
            {workflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="panel landing-story-card">
          <div className="panel-header">
            <h2>메인페이지 역할</h2>
            <span>Entry Narrative</span>
          </div>
          <p className="empty-copy">
            메인페이지는 단순 소개 화면보다, 이 시스템이 무엇을 감시하고 어떤 방식으로
            안전하게 접근하는지 보여주는 입구 역할을 해야 합니다.
          </p>
          <div className="landing-story-note">
            <strong>권장 흐름</strong>
            <p>
              메인에서 로그인 또는 회원가입으로 진입하고, 이후 이메일 인증과 로그인 단계를
              거쳐 플레이어 대시보드로 이동시키는 방식이 가장 자연스럽습니다.
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
