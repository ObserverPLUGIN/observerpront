import { formatTimestamp } from '../../../shared/utils/date'

export function PlayerList({ players, selectedPlayer, errorMessage, onSelect }) {
  return (
    <aside className="panel player-panel">
      <div className="panel-header">
        <h2>온라인 플레이어</h2>
        <span>{players.length}명</span>
      </div>
      {errorMessage ? <p className="inline-error">{errorMessage}</p> : null}
      {!players.length && !errorMessage ? (
        <p className="empty-copy">아직 수신된 플레이어 스냅샷이 없습니다.</p>
      ) : null}
      <div className="player-list">
        {players.map((player) => (
          <button
            key={player.playerUuid}
            type="button"
            className={`player-card ${selectedPlayer === player.playerName ? 'selected' : ''}`}
            onClick={() => onSelect(player.playerName)}
          >
            <div className="player-card-top">
              <strong>{player.playerName}</strong>
              <span className="badge">{player.highlightCount}</span>
            </div>
            <p>{player.worldName}</p>
            <p>
              {player.centerX}, {player.centerY}, {player.centerZ}
            </p>
            <small>{formatTimestamp(player.capturedAt)}</small>
          </button>
        ))}
      </div>
    </aside>
  )
}
