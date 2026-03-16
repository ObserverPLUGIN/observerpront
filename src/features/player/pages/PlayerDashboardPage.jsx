import { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../shared/layouts/DashboardLayout'
import { useAuth } from '../../auth/hooks/useAuth'
import { ServerStatusPill } from '../../server/components/ServerStatusPill'
import { useServerHealth } from '../../server/hooks/useServerHealth'
import { usePlayerLogs } from '../../log/hooks/usePlayerLogs'
import { ActivityTimeline } from '../../log/components/ActivityTimeline'
import { HighlightList } from '../components/HighlightList'
import { LayerMap } from '../components/LayerMap'
import { PlayerList } from '../components/PlayerList'
import { PlayerLocationCard } from '../components/PlayerLocationCard'
import { usePlayers } from '../hooks/usePlayers'
import { usePlayerSurroundings } from '../hooks/usePlayerSurroundings'

const sessionExpiredMessage = '로그인이 만료되었습니다. 다시 로그인해 주세요.'

export function PlayerDashboardPage() {
  const auth = useAuth()
  const health = useServerHealth()
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [activeLayer, setActiveLayer] = useState('BODY')
  const { players, errorMessage: playersError } = usePlayers(auth.token, () =>
    auth.logout(sessionExpiredMessage),
  )
  const { surroundings, errorMessage: surroundingsError } = usePlayerSurroundings(
    selectedPlayer,
    auth.token,
    () => auth.logout(sessionExpiredMessage),
  )
  const { logs, errorMessage: logsError } = usePlayerLogs(selectedPlayer, auth.token, 20, () =>
    auth.logout(sessionExpiredMessage),
  )

  useEffect(() => {
    if (!players.length) {
      setSelectedPlayer('')
      return
    }

    setSelectedPlayer((current) => {
      if (current && players.some((player) => player.playerName === current)) {
        return current
      }
      return players[0].playerName
    })
  }, [players])

  useEffect(() => {
    if (!surroundings?.layers?.length) {
      return
    }

    if (!surroundings.layers.some((layer) => layer.type === activeLayer)) {
      setActiveLayer(surroundings.layers[0].type)
    }
  }, [activeLayer, surroundings])

  return (
    <DashboardLayout
      heroActions={
        <>
          <ServerStatusPill health={health} />
          <button type="button" className="logout-button" onClick={() => auth.logout()}>
            로그아웃
          </button>
        </>
      }
    >
      <section className="workspace">
        <PlayerList
          players={players}
          selectedPlayer={selectedPlayer}
          errorMessage={playersError}
          onSelect={setSelectedPlayer}
        />
        <LayerMap
          surroundings={surroundings}
          activeLayer={activeLayer}
          errorMessage={surroundingsError}
          onLayerChange={setActiveLayer}
        />
        <aside className="side-column">
          <PlayerLocationCard surroundings={surroundings} />
          <HighlightList highlights={surroundings?.highlights ?? []} />
        </aside>
      </section>

      <ActivityTimeline
        logs={logs}
        errorMessage={logsError}
        selectedPlayer={selectedPlayer}
      />
    </DashboardLayout>
  )
}
