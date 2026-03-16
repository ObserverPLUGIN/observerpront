import { formatTimestamp } from '../../../shared/utils/date'

export function ActivityTimeline({ logs, errorMessage, selectedPlayer }) {
  return (
    <section className="panel timeline-panel">
      <div className="panel-header">
        <h2>최근 감지 로그 타임라인</h2>
        <span>{selectedPlayer || '전체'}</span>
      </div>
      {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
      {!logs.length && !errorMessage ? (
        <p className="empty-copy">표시할 최근 로그가 없습니다.</p>
      ) : (
        <ul className="timeline-list">
          {logs.map((log, index) => (
            <li key={`${log.timestamp}-${index}`} className={`timeline-item ${log.type.toLowerCase()}`}>
              <div className="timeline-meta">
                <span className="timeline-badge">{log.type}</span>
                <strong>{log.playerName}</strong>
                <small>{formatTimestamp(log.timestamp)}</small>
              </div>
              <p>{log.message}</p>
              <small>{log.worldName}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
