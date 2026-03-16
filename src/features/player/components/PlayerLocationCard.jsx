import { formatTimestamp } from '../../../shared/utils/date'

export function PlayerLocationCard({ surroundings }) {
  return (
    <section className="panel info-panel">
      <div className="panel-header">
        <h2>위치 카드</h2>
        <span>{surroundings ? formatTimestamp(surroundings.capturedAt) : '-'}</span>
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
            <dd>{surroundings.highlights?.length ?? 0}개</dd>
          </div>
        </dl>
      )}
    </section>
  )
}
