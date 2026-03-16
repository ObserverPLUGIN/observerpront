import { useEffect, useState } from 'react'
import './App.css'

const initialStatus = {
  state: 'loading',
  message: 'Spring Boot API에 연결 중입니다.',
  payload: null,
}

function App() {
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => {
    let active = true

    const loadStatus = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const payload = await response.json()
        if (!active) {
          return
        }

        setStatus({
          state: 'connected',
          message: '프론트와 스프링부트가 정상 연결되었습니다.',
          payload,
        })
      } catch (error) {
        if (!active) {
          return
        }

        setStatus({
          state: 'error',
          message: '백엔드 연결에 실패했습니다. Spring Boot 서버를 먼저 실행해 주세요.',
          payload: { error: error.message },
        })
      }
    }

    loadStatus()
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Observer Project</p>
        <h1>React 프론트와 Spring Boot 백엔드 기본 세팅 완료</h1>
        <p className="hero-copy">
          지금 이 화면은 <code>observerpront</code>에서 렌더링되고 있고,
          상태 카드는 <code>observerspring</code>의 API 응답을 보여줍니다.
        </p>
      </section>

      <section className={`status-card ${status.state}`}>
        <div className="status-header">
          <span className="status-dot" />
          <strong>{status.message}</strong>
        </div>
        <pre>{JSON.stringify(status.payload, null, 2)}</pre>
      </section>

      <section className="grid">
        <article className="info-card">
          <h2>Frontend</h2>
          <p>React + Vite</p>
          <code>npm run dev</code>
        </article>
        <article className="info-card">
          <h2>Backend</h2>
          <p>Spring Boot + Gradle Wrapper</p>
          <code>./gradlew bootRun</code>
        </article>
        <article className="info-card">
          <h2>API</h2>
          <p>개발 중에는 Vite proxy로 연결됩니다.</p>
          <code>/api/health</code>
        </article>
      </section>
    </main>
  )
}

export default App
