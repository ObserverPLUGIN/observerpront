import { useEffect, useState } from 'react'
import './App.css'

const layerLabels = {
  FEET: '발밑',
  BODY: '몸높이',
  HEAD: '머리위',
}

const initialHealth = {
  state: 'loading',
  message: 'Spring Boot API 연결 상태를 확인하는 중입니다.',
}

function App() {
  const [health, setHealth] = useState(initialHealth)
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [surroundings, setSurroundings] = useState(null)
  const [logs, setLogs] = useState([])
  const [activeLayer, setActiveLayer] = useState('BODY')
  const [playersError, setPlayersError] = useState('')
  const [detailError, setDetailError] = useState('')

  useEffect(() => {
    let active = true

    const loadHealth = async () => {
      try {
        const payload = await fetchJson('/api/health')
        if (!active) {
          return
        }

        setHealth({
          state: 'connected',
          message: `${payload.service} 정상 연결`,
        })
      } catch (error) {
        if (!active) {
          return
        }

        setHealth({
          state: 'error',
          message: error.message,
        })
      }
    }

    loadHealth()
    const intervalId = window.setInterval(loadHealth, 5000)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    let active = true

    const loadPlayers = async () => {
      try {
        const payload = await fetchJson('/api/players')
        if (!active) {
          return
        }

        setPlayers(payload)
        setPlayersError('')
        setSelectedPlayer((current) => {
          if (current && payload.some((player) => player.playerName === current)) {
            return current
          }
          return payload[0]?.playerName ?? ''
        })
      } catch (error) {
        if (!active) {
          return
        }

        setPlayersError(error.message)
      }
    }

    loadPlayers()
    const intervalId = window.setInterval(loadPlayers, 2500)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (!selectedPlayer) {
      setSurroundings(null)
      setLogs([])
      return
    }

    let active = true

    const loadDetails = async () => {
      try {
        const [snapshotPayload, logsPayload] = await Promise.all([
          fetchJson(`/api/players/${encodeURIComponent(selectedPlayer)}/surroundings`),
          fetchJson(`/api/logs?player=${encodeURIComponent(selectedPlayer)}&limit=20`),
        ])
        if (!active) {
          return
        }

        setSurroundings(snapshotPayload)
        setLogs(logsPayload)
        setDetailError('')
      } catch (error) {
        if (!active) {
          return
        }

        setDetailError(error.message)
      }
    }

    loadDetails()
    const intervalId = window.setInterval(loadDetails, 2500)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [selectedPlayer])

  useEffect(() => {
    if (!surroundings?.layers?.length) {
      return
    }

    if (!surroundings.layers.some((layer) => layer.type === activeLayer)) {
      setActiveLayer(surroundings.layers[0].type)
    }
  }, [surroundings, activeLayer])

  const currentLayer =
    surroundings?.layers?.find((layer) => layer.type === activeLayer) ??
    surroundings?.layers?.[0] ??
    null

  return (
    <main className="dashboard-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Observer Dashboard</p>
          <h1>웹에서 플레이어 주변 3개 레이어를 바로 확인합니다.</h1>
          <p className="hero-copy">
            좌측에서 플레이어를 고르고, 중앙에서 단면 레이어를 전환하고, 우측에서
            위치와 강조 블록을 확인할 수 있습니다.
          </p>
        </div>
        <div className={`health-pill ${health.state}`}>
          <span className="health-dot" />
          <strong>{health.message}</strong>
        </div>
      </section>

      <section className="workspace">
        <aside className="panel player-panel">
          <div className="panel-header">
            <h2>온라인 플레이어</h2>
            <span>{players.length}명</span>
          </div>
          {playersError ? <p className="inline-error">{playersError}</p> : null}
          {!players.length && !playersError ? (
            <p className="empty-copy">아직 수신된 플레이어 스냅샷이 없습니다.</p>
          ) : null}
          <div className="player-list">
            {players.map((player) => (
              <button
                key={player.playerUuid}
                type="button"
                className={`player-card ${
                  selectedPlayer === player.playerName ? 'selected' : ''
                }`}
                onClick={() => setSelectedPlayer(player.playerName)}
              >
                <div className="player-card-top">
                  <strong>{player.playerName}</strong>
                  <span className="badge">{player.highlightCount}</span>
                </div>
                <p>{player.worldName}</p>
                <p>
                  {player.centerX}, {player.centerY}, {player.centerZ}
                </p>
                <small>{formatTime(player.capturedAt)}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel map-panel">
          <div className="panel-header">
            <h2>주변 레이어 미니맵</h2>
            <span>{surroundings ? surroundings.playerName : '선택 없음'}</span>
          </div>

          {detailError ? <p className="inline-error">{detailError}</p> : null}

          {!currentLayer ? (
            <div className="empty-state">
              <p>플레이어를 선택하면 단면 지도가 여기에 표시됩니다.</p>
            </div>
          ) : (
            <>
              <div className="layer-tabs">
                {surroundings.layers.map((layer) => (
                  <button
                    key={layer.type}
                    type="button"
                    className={layer.type === currentLayer.type ? 'active' : ''}
                    onClick={() => setActiveLayer(layer.type)}
                  >
                    {layer.label ?? layerLabels[layer.type]}
                  </button>
                ))}
              </div>

              <div
                className="layer-grid"
                style={{
                  gridTemplateColumns: `repeat(${currentLayer.rows[0]?.length ?? 0}, minmax(0, 1fr))`,
                }}
              >
                {currentLayer.rows.flat().map((cell) => {
                  const isCenter =
                    cell.blockX === surroundings.centerX && cell.blockZ === surroundings.centerZ

                  return (
                    <div
                      key={`${cell.blockX}-${cell.blockY}-${cell.blockZ}`}
                      className={`grid-cell ${cell.highlighted ? 'highlighted' : ''} ${
                        isCenter ? 'center-cell' : ''
                      }`}
                      title={`${cell.material} @ ${cell.blockX}, ${cell.blockY}, ${cell.blockZ}`}
                      style={{
                        background: getMaterialColor(cell.material, cell.loaded, cell.highlighted),
                      }}
                    >
                      <span>{compactMaterial(cell.material)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="map-legend">
                <span>
                  <i className="legend-swatch highlight" />
                  타겟 블록
                </span>
                <span>
                  <i className="legend-swatch center" />
                  플레이어 중심
                </span>
                <span>
                  <i className="legend-swatch unloaded" />
                  미로드 청크
                </span>
              </div>
            </>
          )}
        </section>

        <aside className="side-column">
          <section className="panel info-panel">
            <div className="panel-header">
              <h2>위치 카드</h2>
              <span>{surroundings ? formatTime(surroundings.capturedAt) : '-'}</span>
            </div>
            {!surroundings ? (
              <p className="empty-copy">표시할 플레이어 정보가 없습니다.</p>
            ) : (
              <dl className="stats-grid">
                <div>
                  <dt>서버</dt>
                  <dd>{surroundings.serverName}</dd>
                </div>
                <div>
                  <dt>월드</dt>
                  <dd>{surroundings.worldName}</dd>
                </div>
                <div>
                  <dt>차원</dt>
                  <dd>{surroundings.dimensionType}</dd>
                </div>
                <div>
                  <dt>좌표</dt>
                  <dd>
                    {surroundings.centerX}, {surroundings.centerY}, {surroundings.centerZ}
                  </dd>
                </div>
                <div>
                  <dt>Yaw</dt>
                  <dd>{surroundings.yaw.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>Pitch</dt>
                  <dd>{surroundings.pitch.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>반경</dt>
                  <dd>{surroundings.radius}</dd>
                </div>
                <div>
                  <dt>강조 블록</dt>
                  <dd>{surroundings.highlights.length}개</dd>
                </div>
              </dl>
            )}
          </section>

          <section className="panel highlight-panel">
            <div className="panel-header">
              <h2>타겟 블록 강조</h2>
              <span>{surroundings?.highlights.length ?? 0}개</span>
            </div>
            {!surroundings?.highlights.length ? (
              <p className="empty-copy">현재 감지된 강조 블록이 없습니다.</p>
            ) : (
              <ul className="highlight-list">
                {surroundings.highlights.map((highlight) => (
                  <li
                    key={`${highlight.blockX}-${highlight.blockY}-${highlight.blockZ}-${highlight.layerType}`}
                  >
                    <strong>{highlight.material}</strong>
                    <span>
                      {layerLabels[highlight.layerType]} · {highlight.blockX}, {highlight.blockY},{' '}
                      {highlight.blockZ}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </section>

      <section className="panel timeline-panel">
        <div className="panel-header">
          <h2>최근 감지 로그 타임라인</h2>
          <span>{selectedPlayer || '전체'}</span>
        </div>
        {!logs.length ? (
          <p className="empty-copy">표시할 최근 로그가 없습니다.</p>
        ) : (
          <ul className="timeline-list">
            {logs.map((log, index) => (
              <li key={`${log.timestamp}-${index}`} className={`timeline-item ${log.type.toLowerCase()}`}>
                <div className="timeline-meta">
                  <span className="timeline-badge">{log.type}</span>
                  <strong>{log.playerName}</strong>
                  <small>{formatTime(log.timestamp)}</small>
                </div>
                <p>{log.message}</p>
                <small>{log.worldName}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`API ${response.status}`)
  }

  return response.json()
}

function formatTime(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

function compactMaterial(material) {
  if (!material || material === 'UNLOADED') {
    return '--'
  }

  const segments = material.split('_')
  if (segments.length === 1) {
    return segments[0].slice(0, 2)
  }

  return `${segments[0][0]}${segments[segments.length - 1][0]}`
}

function getMaterialColor(material, loaded, highlighted) {
  if (!loaded || material === 'UNLOADED' || material === 'OUT_OF_WORLD') {
    return 'linear-gradient(135deg, #626c7a, #3b4250)'
  }

  if (highlighted) {
    return 'linear-gradient(135deg, #ffcf6e, #f28b32)'
  }

  if (material.includes('AIR')) {
    return 'linear-gradient(135deg, rgba(223, 236, 245, 0.48), rgba(198, 214, 226, 0.82))'
  }

  if (material.includes('WATER')) {
    return 'linear-gradient(135deg, #4d93d4, #2b5f9b)'
  }

  if (material.includes('LAVA')) {
    return 'linear-gradient(135deg, #ff9f43, #c84d18)'
  }

  if (
    material.includes('GRASS') ||
    material.includes('LEAF') ||
    material.includes('LEAVES') ||
    material.includes('MOSS') ||
    material.includes('VINE')
  ) {
    return 'linear-gradient(135deg, #60a862, #2f6d3d)'
  }

  if (
    material.includes('LOG') ||
    material.includes('WOOD') ||
    material.includes('PLANK') ||
    material.includes('CHEST')
  ) {
    return 'linear-gradient(135deg, #b18252, #6d4a2f)'
  }

  if (material.includes('SAND') || material.includes('DIRT')) {
    return 'linear-gradient(135deg, #bca17c, #8b6d48)'
  }

  if (
    material.includes('DIAMOND') ||
    material.includes('EMERALD') ||
    material.includes('REDSTONE') ||
    material.includes('GOLD') ||
    material.includes('AMETHYST')
  ) {
    return 'linear-gradient(135deg, #6dd8d1, #0e8b95)'
  }

  return 'linear-gradient(135deg, #8d95a4, #5a6170)'
}

export default App
